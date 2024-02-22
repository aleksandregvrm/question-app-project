import { useReduxSelector, reduxDispatch } from '../store';
import { Loading } from "../components"
import { ChangeEvent, useState, MouseEvent } from 'react';
import { QuestionSubmitInitialStateType, AnswerType } from '../utils/helperFunctions';
import { setEditingId } from '../features/questions/questionsSlice';
import AllQuestionInputs from './AllQuestionInputs';
import { handleAnswerChange } from '../utils/helperFunctions';

const initialQuestionState: QuestionSubmitInitialStateType = {
  question: "",
  answers: [
    { option: "", isCorrect: false },
    { option: "", isCorrect: false },
    { option: "", isCorrect: false },
    { option: "", isCorrect: false }
  ]
}
const AllQuestionsLoaded = () => {
  const [values, setValues] = useState<QuestionSubmitInitialStateType>(initialQuestionState)
  const { isLoading, questionEditingId } = useReduxSelector((store) => store.questions);
  const { role } = useReduxSelector((store) => store.user);
  const dispatch = reduxDispatch();
  if (isLoading) {
    return <Loading />
  }
  if (!role || role === "user") {
    return <div className='exemption-questions'>
      <h2>Only Admin and Question-guru can access all the questions...</h2>
    </div>
  }
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    return setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const editButtonHandler = (e: MouseEvent<HTMLButtonElement>, question: string, answers: AnswerType[], id: string): void => {
    e.preventDefault()
    dispatch(setEditingId(id))
    setValues({
      question: question,
      answers: answers.map(answer => ({ ...answer }))
    });
  }
  return (
    <div className='questions'>
      <AllQuestionInputs questionEditingId={questionEditingId}  editButtonHandler={editButtonHandler} handleChange={handleChange} handleAnswerChange={handleAnswerChange} values={values} setValues={setValues}/>
    </div>
  )
}
export default AllQuestionsLoaded