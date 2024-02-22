import { MouseEvent,ChangeEvent } from "react"
import { AnswerType,QuestionSubmitInitialStateType } from "../utils/helperFunctions"

// Questions 
export interface AllQuestionInputsInter {
    questionEditingId: string,
    editButtonHandler: (e: MouseEvent<HTMLButtonElement>, question: string, answers: AnswerType[], id: string) => void,
    handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    handleAnswerChange: (e: ChangeEvent<HTMLInputElement>, answerIndex: number, setValues: React.Dispatch<React.SetStateAction<QuestionSubmitInitialStateType>>) => void,
    values: QuestionSubmitInitialStateType,
    setValues: React.Dispatch<React.SetStateAction<QuestionSubmitInitialStateType>>
}
// Questions end