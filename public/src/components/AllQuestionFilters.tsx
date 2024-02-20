import { optionValues } from "../utils/otherStats"

const AllQuestionFilters = () => {
  return (
    <div className="question-filters">
      <form className="question-filter-form">
        <label htmlFor="search">Search</label>
        <input id="search" name="search" type="text" />
        <label htmlFor="question-genre">Question Type</label>
        <select id="questionType" name="questionType" className="selection-question">{optionValues.map((option)=>{
          return <option value={option}>{option}</option>
        })}
        </select>
      </form>
    </div>
  )
}
export default AllQuestionFilters