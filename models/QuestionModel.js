const mongoose = require("mongoose");

const AnswerSchema = mongoose.Schema({
  option: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});
const validateAnswersArray = function (answers) {
  return answers.length >= 3;
};
const QuestionSchema = new mongoose.Schema(
  {
    questionType: {
      type: String,
      required: [true, "Please provide a question type"],
      enum: [
        "Math",
        "Geography",
        "History",
        "Literature",
        "Art",
        "Sports",
        "Chemistry",
        "Physics",
        "Other",
      ],
    },
    question: {
      type: String,
      minlength: [6, "Please provide a valid question"],
      maxlength: [600, "Name can not be more than 600 characters"],
      required: [true, "Please provide a Question"],
    },
    answers: {
      type: [AnswerSchema],
      validate: [validateAnswersArray, "Please provide more than two answers"],
      required: [true, "Please Provide at least one answer"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Question", QuestionSchema);
