import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import LandingScreen from './components/LandingScreen';
import QuizScreen from './components/QuizScreen';
import FeedbackScreen from './components/FeedbackScreen';
import ResultsScreen from './components/ResultsScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import Aurora from './components/Aurora';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const API_BASE = `${BACKEND_URL}/api`;
// Initialize socket outside component to prevent multiple connections, connect when needed
const socket = io(BACKEND_URL, { autoConnect: false });

function App() {
  // Screens: 'landing', 'quiz', 'feedback', 'results', 'leaderboard'
  const [screen, setScreen] = useState('landing');
  const [studentName, setStudentName] = useState('');
  
  // Data state
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // { isCorrect, correctAnswer, explanation }
  
  // Accumulated data
  const [answers, setAnswers] = useState([]); // [{ questionId, studentAnswer, timeSpent }]
  const [scoreDetails, setScoreDetails] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  
  // Timer State
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimeout, setIsTimeout] = useState(false);
  const timerRef = useRef(null);

  // App initialization: connect socket and fetch leaderboard
  useEffect(() => {
    socket.connect();
    socket.on('leaderboardUpdate', (data) => {
      setLeaderboardData(data);
    });

    return () => {
      socket.off('leaderboardUpdate');
    };
  }, []);

  // Timer logic for QuizScreen
  useEffect(() => {
    if (screen === 'quiz' && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (screen === 'quiz' && timeRemaining === 0) {
      // Time is up
      handleTimeout();
    }
    
    return () => clearTimeout(timerRef.current);
  }, [timeRemaining, screen]);


  // --- Actions ---

  const startQuiz = async () => {
    try {
      // Added cache: 'no-store' to prevent browsers from caching old questions!
      const res = await fetch(`${API_BASE}/questions`, { cache: 'no-store' });
      const data = await res.json();
      if (data && data.length > 0) {
        setQuestions(data);
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setScreen('quiz');
        setTimeRemaining(data[0].timeLimit);
      }
    } catch (err) {
      console.error("Failed to load questions:", err);
      alert("Could not load questions. Is the backend running?");
    }
  };

  const handleTimeout = () => {
    setIsTimeout(true);
    submitSingleAnswer('', questions[currentQuestionIndex].timeLimit);
  };

  const submitSingleAnswer = async (answerValue, forceTimeSpent = null) => {
    clearTimeout(timerRef.current);
    const q = questions[currentQuestionIndex];
    const timeSpent = forceTimeSpent !== null ? forceTimeSpent : (q.timeLimit - timeRemaining);

    // Save answer locally
    setAnswers(prev => [...prev, {
      questionId: q.id,
      studentAnswer: answerValue,
      timeSpent: timeSpent
    }]);

    // Check with backend for instant feedback
    try {
      const res = await fetch(`${API_BASE}/check-answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: q.id,
          studentAnswer: answerValue
        })
      });
      const data = await res.json();
      setFeedback(data);
      setScreen('feedback');
    } catch (err) {
      console.error("Failed to check answer:", err);
    }
  };

  const handleNextQuestion = () => {
    setIsTimeout(false);
    setCurrentAnswer('');
    setFeedback(null);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setTimeRemaining(questions[nextIndex].timeLimit);
      setScreen('quiz');
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    try {
      const res = await fetch(`${API_BASE}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: studentName,
          answers: answers
        })
      });
      const data = await res.json();
      if (data.success) {
        setScoreDetails({
          score: data.score,
          total: questions.length,
          timeTaken: data.timeTaken,
          breakdown: data.breakdown
        });
        setScreen('results');
      }
    } catch (err) {
      console.error("Failed to submit final quiz:", err);
    }
  };

  const resetApp = () => {
    setScreen('landing');
    setStudentName('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScoreDetails(null);
  };

  // --- Render logic ---

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Aurora Effect */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#5227FF", "#FF94B4", "#7cff67"]}
          blend={0.5}
          amplitude={1.2}
          speed={0.8}
        />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {screen === 'landing' && (
        <LandingScreen
          studentName={studentName}
          setStudentName={setStudentName}
          onStart={startQuiz}
        />
      )}

      {screen === 'quiz' && questions.length > 0 && (
        <QuizScreen
          question={questions[currentQuestionIndex]}
          index={currentQuestionIndex}
          total={questions.length}
          timeRemaining={timeRemaining}
          currentAnswer={currentAnswer}
          setCurrentAnswer={setCurrentAnswer}
          onSubmitAnswer={() => submitSingleAnswer(currentAnswer)}
        />
      )}

      {screen === 'feedback' && feedback && (
        <FeedbackScreen
          feedback={feedback}
          question={questions[currentQuestionIndex]}
          onNext={handleNextQuestion}
          isTimeout={isTimeout}
          index={currentQuestionIndex}
          total={questions.length}
        />
      )}

      {screen === 'results' && scoreDetails && (
        <ResultsScreen
          scoreDetails={scoreDetails}
          onShowLeaderboard={() => setScreen('leaderboard')}
        />
      )}

      {screen === 'leaderboard' && (
        <LeaderboardScreen
          leaderboardData={leaderboardData}
          studentName={studentName}
          onRetry={resetApp}
        />
      )}
      </div>
    </div>
  );
}

export default App;
