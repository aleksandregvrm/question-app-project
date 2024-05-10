const CustomError = require("../errors");
const Question = require("../models/QuestionModel");
const { StatusCodes } = require("http-status-codes");
const arraysEqual = require("../utils/compareArrs");

// Get All Questions Including Quiz-mode
const getAllQuestions = async (req, res) => {
  const { questionType, search, quizMode } = req.query;
  let queryObject = {};
  if (questionType) {
    queryObject.questionType = questionType;
  }
  if (search) {
    queryObject.question = { $regex: search, $options: "i" };
  }
  // This part is dedicated to Pagination and logic surrounding it
  if(req.query.page){
    const allQuestions = Question.find(queryObject);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 15;
    const skip = (page - 1) * limit;
    
    const questions = await allQuestions.skip(skip).limit(limit);
    const filteredQuestions = await questions;
    return res.status(StatusCodes.OK).json({questions: filteredQuestions})
  }
  let allQuestions = await Question.find(queryObject);
  // This Section is Entirely Quiz Section nothing with Normal Question Fetching
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
const editQuestion = async (req, res) => {
  const { id } = req.params;
  const { fullQuestion } = req.body;
  const questions = await Question.findOne({ _id: id });
  // Check if such question exists
  if (!questions) {
    throw new CustomError.NotFoundError(
      "No such question Found in the database"
    );
  }
  // Check if provided changes are real changes.
  const { question:newQuestion, answers:newAnswers } = fullQuestion;
  if (
    questions.question === newQuestion &&
    arraysEqual(questions.answers, newAnswers)
  ) {
    throw new CustomError.BadRequestError("Please provide updated values");
  }
  questions.question = newQuestion;
  questions.answers = newAnswers;
  await questions.save();
  res.status(StatusCodes.OK).json({ msg: "Question Modified" });
};

module.exports = {
  getSingleQuestion,
  getAllQuestions,
  uploadQuestion,
  evaluateQuestion,
  editQuestion,
};
