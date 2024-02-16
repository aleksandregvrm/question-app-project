import { ReactNode } from "react";
import { optionValues } from "../utils/otherStats";
import { AddSelectionInter } from "../utils/helperFunctions";

const QuestionAddSelection = ({ handleChange, values }: AddSelectionInter) => {
    return (
        <>
            <label htmlFor="questionType">Question Type</label>
            <select id="questionType" name="questionType" className="selection" onChange={handleChange} value={values.questionType}>
                {optionValues.map((option,index): ReactNode => {
                    return <option key={index} value={option}>{option}</option>
                })}
            </select>
        </>
    )
}
export default QuestionAddSelection