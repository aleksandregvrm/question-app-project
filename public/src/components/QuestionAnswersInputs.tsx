import { ChangeEvent, ReactNode } from "react"
import { QuestionSubmitInitialStateType } from "../utils/helperFunctions"

interface AnswerRadioInputInter {
    values:QuestionSubmitInitialStateType,
    handleAnswerChange: (e: ChangeEvent<HTMLInputElement>, index: number)=>void,
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => void
}

const QuestionAnswersInputs = ({values,handleAnswerChange,handleChange}:AnswerRadioInputInter) => {
  return (
     values.answers.map((answer,index):ReactNode=>{
        return (
      <div key={index} className="answers-container">
          <label htmlFor={`answer${index + 1}`}>Potential answer {index + 1}</label>
          <input className="answer" id={`answer${index + 1}`} name={`answer`} type="text" value={answer.option} onChange={(e) => handleAnswerChange(e, index)} />
          <label htmlFor={`isCorrect${index + 1}`}>Is Correct</label>
          <input id={`isCorrect${index + 1}`} className="radio" name={`isCorrect`} type="radio" checked={answer.isCorrect} required onChange={(e) => handleChange(e, index)} />
      </div>
        )
     })
  )
}
export default QuestionAnswersInputs