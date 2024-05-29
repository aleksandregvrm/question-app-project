import { MouseEvent, ChangeEvent } from "react"
import { AnswerType, QuestionSubmitInitialStateType } from "../utils/helperFunctions"

// Initial State for the QuestionSlice
export type InitialQuizType = {
    allQuestions: QuestionSubmitInitialStateType[],
    search: string,
    page: number,
    questionType: string,
    questionEditingId: string,
    isLoading: boolean,
}
// Initial State for the QuestionSlice End

// Questions 
export interface AllQuestionInputsInter {
    questionEditingId: string,
    editButtonHandler: (e: MouseEvent<HTMLButtonElement>, question: string, answers: AnswerType[], id: string) => void,
    handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    handleAnswerChange: (e: ChangeEvent<HTMLInputElement>, answerIndex: number, setValues: React.Dispatch<React.SetStateAction<QuestionSubmitInitialStateType>>) => void,
    values: QuestionSubmitInitialStateType,
    setValues: React.Dispatch<React.SetStateAction<QuestionSubmitInitialStateType>>,
    editQuestionHandler: () => void;
}
// Questions end