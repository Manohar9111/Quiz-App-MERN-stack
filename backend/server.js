import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import fs from 'fs/promises';
import path from 'path';

import { questions, getClientQuestions } from './questions.js';
import Score from './models/Score.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Database connectivity and fallbacks
let isMongoConnected = false;
const localDbPath = path.join(process.cwd(), 'data', 'scores.json');

async function initializeDatabase() {
  if (process.env.MONGODB_URI) {
    try {
      mongoose.set('strictQuery', false);
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB successfully");
      isMongoConnected = true;
    } catch (err) {
      console.error("MongoDB connection error, falling back to local JSON database:", err.message);
    }
  } else {
    console.log("No MONGODB_URI provided. Running with local JSON database fallback.");
  }

  // Ensure local DB file exists and contains valid JSON if MongoDB is not connected
  if (!isMongoConnected) {
    try {
      await fs.mkdir(path.dirname(localDbPath), { recursive: true });
      try {
        await fs.access(localDbPath);
      } catch {
        await fs.writeFile(localDbPath, JSON.stringify([], null, 2));
      }
    } catch (err) {
      console.error("Failed to setup local scores JSON database:", err.message);
    }
  }
}

// Database helper functions
async function saveScore(scoreData) {
  if (isMongoConnected) {
    const newScore = new Score(scoreData);
    return await newScore.save();
  } else {
    try {
      const data = await fs.readFile(localDbPath, 'utf8');
      const scores = JSON.parse(data || '[]');
      const newScore = {
        _id: Date.now().toString(),
        ...scoreData,
        createdAt: new Date().toISOString()
      };
      scores.push(newScore);
      await fs.writeFile(localDbPath, JSON.stringify(scores, null, 2));
      return newScore;
    } catch (err) {
      console.error("Error saving score locally:", err.message);
      return scoreData;
    }
  }
}

async function getTopScores() {
  if (isMongoConnected) {
    try {
      return await Score.find()
        .sort({ score: -1, timeTaken: 1, createdAt: 1 })
        .limit(10);
    } catch (err) {
      console.error("Error querying MongoDB, falling back to local list:", err.message);
    }
  }

  // Local JSON fallback
  try {
    const data = await fs.readFile(localDbPath, 'utf8');
    const scores = JSON.parse(data || '[]');
    scores.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.timeTaken !== b.timeTaken) return a.timeTaken - b.timeTaken;
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
    return scores.slice(0, 10);
  } catch (err) {
    console.error("Error reading local scores database:", err.message);
    return [];
  }
}

// REST Endpoints
app.get('/api/questions', (req, res) => {
  res.json(getClientQuestions());
});

app.post('/api/check-answer', (req, res) => {
  const { questionId, studentAnswer } = req.body;
  const q = questions.find(item => item.id === questionId);

  if (!q) {
    return res.status(404).json({ error: "Question not found" });
  }

  const cleanedStudent = (studentAnswer || "").toString().trim().toLowerCase();

  let isCorrect = false;
  let correctDisplayAnswer = "";

  if (q.type === "MCQ") {
    isCorrect = q.answer.trim().toLowerCase() === cleanedStudent;
    correctDisplayAnswer = q.answer;
  } else {
    // Fill-in-the-blank matches any of the valid alternatives in the array
    isCorrect = q.answer.some(ans => ans.trim().toLowerCase() === cleanedStudent);
    correctDisplayAnswer = q.answer[0]; // Primary answer for display
  }

  res.json({
    isCorrect,
    correctAnswer: correctDisplayAnswer,
    explanation: q.explanation
  });
});

app.post('/api/submit', async (req, res) => {
  try {
    const { name, answers } = req.body; // answers: [{ questionId, studentAnswer, timeSpent }]
    if (!name || !Array.isArray(answers)) {
      return res.status(400).json({ error: "Invalid payload. Name and answers are required." });
    }

    let calculatedScore = 0;
    let totalTimeTaken = 0;
    const breakdown = {
      http: 0,
      node: 0,
      express: 0
    };

    // Calculate score & breakdown based on full backend questions array
    for (const q of questions) {
      const studentAnsObj = answers.find(a => a.questionId === q.id);
      const studentAnswer = studentAnsObj ? studentAnsObj.studentAnswer : "";
      const timeSpent = studentAnsObj ? studentAnsObj.timeSpent : q.timeLimit; // default to max time if missing

      totalTimeTaken += timeSpent;

      const cleanedStudent = (studentAnswer || "").toString().trim().toLowerCase();
      let isCorrect = false;

      if (q.type === "MCQ") {
        isCorrect = q.answer.trim().toLowerCase() === cleanedStudent;
      } else {
        isCorrect = q.answer.some(ans => ans.trim().toLowerCase() === cleanedStudent);
      }

      if (isCorrect) {
        calculatedScore++;
        const topicKey = q.topic.toLowerCase().replace('.', ''); // Node.js -> node
        if (topicKey in breakdown) {
          breakdown[topicKey]++;
        }
      }
    }

    const saved = await saveScore({
      name,
      score: calculatedScore,
      timeTaken: totalTimeTaken,
      breakdown
    });

    // Broadcast updated leaderboard to all connected sockets
    const topScores = await getTopScores();
    io.emit('leaderboardUpdate', topScores);

    res.json({
      success: true,
      score: calculatedScore,
      timeTaken: totalTimeTaken,
      breakdown,
      record: saved
    });
  } catch (err) {
    console.error("Submission error:", err);
    res.status(500).json({ error: "Failed to submit quiz score." });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  const topScores = await getTopScores();
  res.json(topScores);
});

// Socket.io connection handling
io.on('connection', async (socket) => {
  console.log(`Client connected: ${socket.id}`);
  
  // Send current leaderboard to new client
  const topScores = await getTopScores();
  socket.emit('leaderboardUpdate', topScores);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
await initializeDatabase();
httpServer.listen(PORT, () => {
  console.log(`Quiz server listening on port ${PORT}`);
});
