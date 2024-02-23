const { StatusCodes } = require("http-status-codes");
const QuizStats = require("../models/QuizStatsModel");
const User = require("../models/UserModel");
const defaultQuizValues = require("../utils/default/defaultQuizValues");
const CustomError = require("../errors");

// Evaluate Quiz Stats
const evaluateQuizStats = async (req, res) => {
  const { quizCorrectAnswers, usedQuestions, quizDone } = req.body;
  // temporary solution !!!!!!!
  // let name = "chukula";
  // let role = "user";
  // let id = "65cb48cd46297490a305f828";
  // temporary solution !!!!!!!!
  const { userId: id, name, role } = req.user;
  // real solution
  let personalQuizStats = await QuizStats.findOne({ user:id })
  if (!personalQuizStats) {
    const quizData = defaultQuizValues(id);
    personalQuizStats = await QuizStats.create({ ...quizData, user: id, name, role });
    return res.status(StatusCodes.CREATED).json({ msg: "Quiz Stats Created" });
  }
  if (quizDone) {
    personalQuizStats.quizDoneAmount += 1;
    personalQuizStats.name = name;
    personalQuizStats.totalQuizPoints += quizCorrectAnswers;
    personalQuizStats.averageQuizValue = (
      personalQuizStats.totalQuizPoints / personalQuizStats.quizDoneAmount
    ).toFixed(1);
    personalQuizStats.lastQuizResult.lastQuizCorrectAnswers =
      quizCorrectAnswers;
    personalQuizStats.lastQuizResult.lastQuizDoneDate = new Date();
    personalQuizStats.lastQuizResult.questionsUsed = usedQuestions;
  }
  await personalQuizStats.save();
  res.status(StatusCodes.OK).json({ msg: "Values Calculated" });
};
// Get personal Quiz Stats
const getQuizStats = async (req, res) => {
  const { userId: id } = req.user; 
  // real solution
  // const id = "65cb441920d58ded265b8ef9";
  // TEMPORARY SOLUTION !!!!!!
  // change this on production !!!!!
  const personalQuizStats = await QuizStats.findOne({ user: id });
  if (!personalQuizStats) {
    throw new CustomError.BadRequestError(`Cannot find stats with and if of ${id}`)
  }
  res.status(StatusCodes.OK).json(personalQuizStats);
};
// Get Leaderboard Stats
const getLeaderBoardStats = async (req, res) => {
  const listPart = Number(req.query.listPart) || 1;
  const limit = Number(req.query.limit) || 3;
  const skip = (listPart - 1) * limit;
  const personalQuizStats = await QuizStats.aggregate([
    {
      $match: {
        quizDoneAmount: { $gte: 2 },
      },
    },
    {
      $sort: {
        quizDoneAmount: -1,
        averageQuizValue: -1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ]);
  const leaderboard = personalQuizStats.map((stat, index) => {
    const { name, quizDoneAmount, averageQuizValue, role } = stat;
    return { name, role, quizDoneAmount, averageQuizValue, place: index + (skip + 1) };
  });
  res.status(StatusCodes.OK).json({ leaderboard });
};
module.exports = { evaluateQuizStats, getQuizStats, getLeaderBoardStats };
