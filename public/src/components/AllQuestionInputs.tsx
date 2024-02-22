import {FaPencilAlt,FaTimes} from "react-icons/fa"
import { useReduxSelector } from "../store";
import { ReactNode } from "react";
import { AllQuestionInputsInter } from "../types/quetionTypes";

const AllQuestionInputs = ({questionEditingId, editButtonHandler,handleChange,handleAnswerChange,values,setValues }:AllQuestionInputsInter) => {
    const {allQuestions} = useReduxSelector((store)=>store.questions);
    return (
            allQuestions.map((questionOne): ReactNode => {
                const { question, answers, _id: id } = questionOne;
                return (
                    <article className="question" key={id}>
                        <button className='edit-button' onClick={(e) => editButtonHandler(e, question, answers, id as string)}>
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
                                            onChange={(e) => handleAnswerChange(e, answerIndex,setValues)}
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
                                            onChange={(e) => handleAnswerChange(e, answerIndex,setValues)}
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
                        <button className='btn additional-btn'>Edit</button>
                        <button className='btn additional-btn'>Cancel Editing</button>
                    </article>
                );
            })
    )
}
export default AllQuestionInputs