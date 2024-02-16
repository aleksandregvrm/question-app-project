const defaultQuizValues = (userId) => {
  return {
    user: userId,
    quizDoneAmount: 0,
    totalQuizPoints: 0,
    averageQuizValue: 0,
    lastQuizResult: {
      lastQuizCorrectAnswers: 0,
      lastQuizDoneDate: new Date(),
      questionsUsed: [],
    },
  };
};
module.exports = defaultQuizValues;
