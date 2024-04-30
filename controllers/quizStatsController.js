const { StatusCodes } = require("http-status-codes");
const QuizStats = require("../models/QuizStatsModel");
const User = require("../models/UserModel");
const defaultQuizValues = require("../utils/default/defaultQuizValues");
const CustomError = require("../errors");

// Check for quiz permission
const checkQuizPermission = async (req, res) => {
  const {userId:id,name} = req.user;
  // const temporaryId = "65c7a042f0b9c4c22bf29ca2";
  // Temporary solution
  const dayNow = new Date().getDate();
  const personalQuizStats = await QuizStats.findOne({ user: id });
  if (!personalQuizStats) {
    res.status(StatusCodes.OK).json({ msg: "Proceed!" });
  }
  const {
    dailyQuizAmount,
    lastQuizResult: { lastQuizDoneDate },
  } = personalQuizStats;
  const lastQuizDay = lastQuizDoneDate.getDate();
  if (dailyQuizAmount !== 2) {
    res.status(StatusCodes.OK).json({ msg: "Proceed!" });
  }
  if (dayNow === lastQuizDay) {
    throw new CustomError.BadRequestError(
      "You have reached the daily limit, try again tomorrow!"
    );
  }
  personalQuizStats.dailyQuizAmount = 0;
  personalQuizStats.lastQuizResult.lastQuizDoneDate = new Date();
  await personalQuizStats.save();
  res.status(StatusCodes.OK).json({ msg: "Proceed!" });
};

// Evaluate Quiz Stats
const evaluateQuizStats = async (req, res) => {
  const { quizCorrectAnswers, usedQuestions, quizDone } = req.body;
  // temporary solution !!!!!!!
  // let name = "aleksandregvrm";
  // let role = "admin";
  // let id = "65c7a042f0b9c4c22bf29ca2";
  // temporary solution !!!!!!!!
  const { userId: id, name, role } = req.user;
  // real solution
  let personalQuizStats = await QuizStats.findOne({ user: id });
  if (!personalQuizStats) {
    const quizData = defaultQuizValues(id);
    personalQuizStats = await QuizStats.create({
      ...quizData,
      user: id,
      name,
      role,
    });
    return res.status(StatusCodes.CREATED).json({ msg: "Quiz Stats Created" });
  }
  if (personalQuizStats.dailyQuizAmount === 2) {
    throw new CustomError.BadRequestError(
      "You have reached the daily limit please try again tomorrow!"
    );
  }
  if (quizDone) {
    personalQuizStats.name = name;
    personalQuizStats.totalQuizPoints += quizCorrectAnswers;
    personalQuizStats.averageQuizValue = (
      personalQuizStats.totalQuizPoints / personalQuizStats.quizDoneAmount
    ).toFixed(1);
    personalQuizStats.lastQuizResult.lastQuizCorrectAnswers =
      quizCorrectAnswers;
    personalQuizStats.lastQuizResult.lastQuizDoneDate = new Date();
    personalQuizStats.lastQuizResult.questionsUsed = usedQuestions;
    return res.status(StatusCodes.OK).json({ msg: "Values Calculated" });
  }
  personalQuizStats.quizDoneAmount += 1;
  personalQuizStats.dailyQuizAmount += 1;
  await personalQuizStats.save();
  res.status(StatusCodes.OK).json({ msg: "Values Calculated" });
};
// Get personal Quiz Stats
const getQuizStats = async (req, res) => {
  const { userId: id } = req.user;
  // console.log(req.user);
  // real solution
  // const id = "65c7a042f0b9c4c22bf29ca2";
  // TEMPORARY SOLUTION !!!!!!
  // change this on production !!!!!
  const personalQuizStats = await QuizStats.findOne({ user: id });
  if (!personalQuizStats) {
    throw new CustomError.BadRequestError(
      `Cannot find stats with and id of ${id}`
    );
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
    return {
      name,
      role,
      quizDoneAmount,
      averageQuizValue,
      place: index + (skip + 1),
    };
  });
  res.status(StatusCodes.OK).json({ leaderboard });
};
module.exports = {
  evaluateQuizStats,
  getQuizStats,
  getLeaderBoardStats,
  checkQuizPermission,
};
