// Initial state type for QuizStatsSlice as well as types for other purposes including in QuizGameSlice,quizGameTypes, Leaderboard page
export type QuestionType = {
    question?: string,
    answerSubmitted: string,
    answerIsTrue: boolean,
    id?: string,
}
export type lastQuizResultType = {
    lastQuizCorrectAnswers: number,
    lastQuizDoneDate: Date | null,
    questionsUsed: QuestionType[],
}
export type LeaderboardType = {
    name: string,
    role: string,
    quizDoneAmount: number,
    averageQuizValue: number,
    place: number,
    id: string,
}
export type InitialQuizStatsType = {
    quizDone: number,
    quizDoneAmount: number,
    totalQuizPoints: number,
    averageQuizValue: number,
    lastQuizResult: lastQuizResultType,
    detailsOpen: boolean,
    isLoading: boolean,
    leaderboard: LeaderboardType[],
    leaderboardIsLoading: boolean,
    leaderboardListPart: number,
    disableLoadMoreButton: boolean,
}
// End for this type annotation