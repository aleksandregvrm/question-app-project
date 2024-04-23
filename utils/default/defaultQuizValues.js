const defaultQuizValues = (userId) => {
  return {
    user: userId,
    quizDoneAmount: 1,
    totalQuizPoints: 0,
    averageQuizValue: 0,
    lastQuizResult: {
      lastQuizCorrectAnswers: 0,
      lastQuizDoneDate: new Date(),
      questionsUsed: [],
    },
    dailyQuizAmount:1
  };
};
module.exports = defaultQuizValues;
