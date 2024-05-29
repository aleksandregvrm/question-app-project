import { QuestionSubmitInitialStateType } from "../utils/helperFunctions"
import { QuestionType } from "./quizStatTypes"
// Initial State used in QuizGameSlice 
export type InitialQuizGameType = {
    isLoading: boolean,
    quizType: string,
    quizMode: boolean,
    quizDone: boolean,
    quizState: boolean
    activeQuestion: QuestionSubmitInitialStateType[],
    answeredQuestions: QuestionType[],
    activeCorrectAnswer: string,
    correctAnswers: number,
    maxQuestions: number,
    answersSubmitted: number,
    questionIsLoading: boolean,
}
// Initial State used in QuizGameSlice End
