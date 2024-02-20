import { useReduxSelector } from '../store';
import { Loading } from "../components"
import { FaPencilAlt,FaTimes } from 'react-icons/fa';
// import { useState } from 'react';
// import { QuestionSubmitInitialStateType } from '../utils/helperFunctions';


// const initialState = {

// }
const AllQuestionsLoaded = () => {
  // const [values,setValues] = useState()
  const {isLoading,allQuestions} = useReduxSelector((store)=>store.questions);
  const {role} = useReduxSelector((store)=>store.user);
  if(isLoading){
    return <Loading/>
  }
  if(!role || role === "user"){
    return <div className='exemption-questions'>
      <h2>Only Admin can access all the questions...</h2>
      </div>
  }
  return (
    <div className='questions'>
      {allQuestions.map((questionOne)=>{
        const {question,answers,_id:id} = questionOne;
        return <article className="question" key={id}>
          <button className='edit-button'><FaPencilAlt /></button>
          <button className='delete-button'><FaTimes /></button>
          <textarea className='question-text' disabled>{question}</textarea>
          <div className="answers">
            {answers.map((answerOne)=>{
              const {option,isCorrect,_id:answerId} = answerOne;
              return <input className='answer' key={answerId} type='text' value={option} style={{background:`${isCorrect && "green"}`}}/>
      })}
          </div>
        </article>
      })}
    </div>
  )
}

export default AllQuestionsLoaded