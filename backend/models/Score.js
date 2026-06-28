import mongoose from 'mongoose';

const ScoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  score: {
    type: Number,
    required: true
  },
  timeTaken: {
    type: Number,
    required: true // in seconds
  },
  breakdown: {
    http: { type: Number, default: 0 },
    node: { type: Number, default: 0 },
    express: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Score = mongoose.model('Score', ScoreSchema);
export default Score;
