const mongoose = require("mongoose");

const QuestionsUsed = mongoose.Schema({
  question: {
    type: String,
  },
  answerSubmitted: {
    type: String,
  },
  answerIsTrue: {
    type: Boolean,
  },
});
const LastQuizSchema = new mongoose.Schema({
  lastQuizCorrectAnswers: {
    type: Number,
    default: 0,
  },
  lastQuizDoneDate: {
    type: Date,
  },
  questionsUsed: {
    type: Array,
    type: [QuestionsUsed],
  },
});
const QuizStatsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true
    },
    quizDoneAmount: {
      type: Number,
      required: [true, "Please provide how many quizes have you done"],
      default: 0,
    },
    totalQuizPoints: {
      type: Number,
      default: 0,
    },
    averageQuizValue: {
      type: Number,
    },
    lastQuizResult: {
      type: LastQuizSchema,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("QuizStats", QuizStatsSchema);
