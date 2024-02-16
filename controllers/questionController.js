const CustomError = require("../errors");
const Question = require("../models/QuestionModel");
const { StatusCodes } = require("http-status-codes");

// Get All Questions Including Quiz-mode
const getAllQuestions = async (req, res) => {
  const { questionType, search, quizMode } = req.query;
  let queryObject = {};
  if (questionType) {
    queryObject.questionType = questionType;
  }
  if (search) {
    queryObject.question = search;
  }
  let allQuestions = await Question.find(queryObject);
  if (quizMode.toLowerCase() === "true") {
    const questionsLength = allQuestions.length;
    const randomIndex = Math.floor(Math.random() * questionsLength);
    allQuestions = [allQuestions[randomIndex]];
  }
  res.status(StatusCodes.OK).json({ questions: allQuestions });
};
// Upload Question
const uploadQuestion = async (req, res) => {
  const { question, answers, questionType } = req.body;
  if (!question || answers.length < 1 || !questionType) {
    throw new CustomError.BadRequestError("Please provide valid values");
  }
  const submitQuestion = await Question.create({
    question,
    answers,
    questionType,
  });
  if (!submitQuestion) {
    throw new CustomError.BadRequestError("Error with creating a question");
  }
  res.status(StatusCodes.OK).json({ msg: "Question Submitted" });
};
// Get Single Question
const getSingleQuestion = async (req, res) => {
  const { id: questionId } = req.params;
  if (!questionId) {
    throw new CustomError.BadRequestError("Please provide id");
  }
  const singleQuestion = await Question.findOne({ _id: questionId });
  if (!singleQuestion) {
    throw new CustomError.ServerError(
      "There has been error with finding a question, try again later..."
    );
  }
  res.status(StatusCodes.OK).json({ question: singleQuestion });
};
// Evaluate Question
const evaluateQuestion = async (req, res) => {
  const { submittedAnswer, correctAnswer } = req.body;
  if (!submittedAnswer || !correctAnswer) {
    throw new CustomError.BadRequestError("Error with evaluating your answers");
  }
};

module.exports = {
  getSingleQuestion,
  getAllQuestions,
  uploadQuestion,
  evaluateQuestion,
};
