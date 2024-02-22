import { useEffect, useState } from "react";
import { reduxDispatch,useReduxSelector } from "../store";
import { optionValues } from "../utils/otherStats";
import { FilterStateType } from "../utils/helperFunctions";
import { handleChange } from "../utils/helperFunctions";
import { changeFilters } from "../features/questions/questionsSlice";

const initialFilterState:FilterStateType = {
  search:"",
  questionType:""
}
const AllQuestionFilters = () => {
  const {search,questionType} = useReduxSelector((store)=>store.questions)
  const [values,setValues] = useState<FilterStateType>(initialFilterState);
  useEffect(()=>{
    setValues((prevValues)=>{
      return {...prevValues,search,questionType}
    })
  },[])
  const dispatch = reduxDispatch();
  const filterSearchHandler = () => {
    dispatch(changeFilters({search:values.search,questionType:values.questionType}))
  }
  return (
    <div className="question-filters">
      <form className="question-filter-form">
        <label htmlFor="search">Question</label>
        <input id="search" name="search" type="text" value={values.search} onChange={(e)=>handleChange(e,setValues)}/>
        <label htmlFor="question-genre">Question Type</label>
        <select id="questionType" name="questionType" className="selection-question" value={values.questionType} onChange={(e)=>handleChange(e,setValues)}>{optionValues.map((option)=>{
          return <option value={option}>{option}</option>
        })}
        </select>
        ---
        <button className="btn" type="button" onClick={filterSearchHandler}>Search</button>
      </form>
    </div>
  )
}
export default AllQuestionFilters