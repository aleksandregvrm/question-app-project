import { FaPencilAlt, FaTimes } from "react-icons/fa"
import { useReduxSelector, reduxDispatch } from "../store";
import { ReactNode, MouseEvent } from "react";
import { AllQuestionInputsInter } from "../types/quetionTypes";
import { cancelEditing, setEditingId } from "../features/questions/questionsSlice";
import { AnswerType } from "../utils/helperFunctions";

const AllQuestionInputs = ({ questionEditingId, editButtonHandler, handleChange, handleAnswerChange, values, setValues, editQuestionHandler }: AllQuestionInputsInter) => {
    const { allQuestions } = useReduxSelector((store) => store.questions);
    const dispatch = reduxDispatch();
    const handleEditButtonClick = (e: MouseEvent<HTMLButtonElement>, question: string, answers: AnswerType[], id: string) => {
        editButtonHandler(e, question, answers, id);
        dispatch(setEditingId(id))
    }
    return (
        allQuestions.map((questionOne): ReactNode => {
            const { question, answers, _id: id } = questionOne;
            return (
                <article className="question" key={id}>
                    <button className='edit-button' onClick={(e) => handleEditButtonClick(e, question as string, answers, id as string)}>
                        <FaPencilAlt />
                    </button>
                    <button className='delete-button'>
                        <FaTimes />
                    </button>
                    {questionEditingId === id ? (
                        <textarea
                            onChange={(e) => handleChange(e)}
                            className='question-text'
                            name='question'
                            value={values.question}
                            disabled={id !== questionEditingId}
                        ></textarea>
                    ) : (
                        <textarea
                            className='question-text'
                            value={question}
                            disabled={id !== questionEditingId}
                        ></textarea>
                    )}
                    <div className="answers">
                        {questionEditingId === id ? (
                            values.answers.map((answer, answerIndex) => {
                                const { isCorrect, option } = answer;
                                return (
                                    <input
                                        onChange={(e) => handleAnswerChange(e, answerIndex, setValues)}
                                        className='answer'
                                        key={answerIndex}
                                        type='text'
                                        value={option}
                                        style={{ background: `${isCorrect && "green"}` }}
                                    />
                                );
                            })
                        ) : (
                            answers.map((answerOne, answerIndex) => {
                                const { option, isCorrect, _id: answerId } = answerOne;
                                return (
                                    <input
                                        onChange={(e) => handleAnswerChange(e, answerIndex, setValues)}
                                        className='answer'
                                        key={answerId}
                                        disabled={questionEditingId !== id}
                                        type='text'
                                        value={option}
                                        style={{ background: `${isCorrect && "green"}` }}
                                    />
                                );
                            })
                        )}
                    </div>
                    {questionEditingId === id &&
                        <>
                            <button className='btn additional-btn' onClick={editQuestionHandler}>Edit</button>
                            <button className='btn additional-btn' onClick={()=>dispatch(cancelEditing())}>Cancel Editing</button>
                        </>
                    }
                </article>
            );
        })
    )
}
export default AllQuestionInputs