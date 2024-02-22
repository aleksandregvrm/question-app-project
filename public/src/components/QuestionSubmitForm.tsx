import { useState, ChangeEvent, FormEvent } from "react";
import QuestionAddSelection from "./QuestionAddSelection";
import QuestionAnswersInputs from "./QuestionAnswersInputs";
import { QuestionSubmitInitialStateType } from "../utils/helperFunctions";
import { reduxDispatch, useReduxSelector } from "../store";
import { submitQuestion } from "../features/questions/questionsSlice";
import { handleAnswerChange } from "../utils/helperFunctions";

const initialState: QuestionSubmitInitialStateType = {
    question: "",
    questionType: "History",
    answers: [
        { option: "", isCorrect: false },
        { option: "", isCorrect: false },
        { option: "", isCorrect: false },
        { option: "", isCorrect: false }
    ]
};
const QuestionSubmitForm = () => {
    const [values, setValues] = useState<QuestionSubmitInitialStateType>(initialState);
    const { role } = useReduxSelector((store) => store.user);
    const dispatch = reduxDispatch();
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
        const { name, value, type } = e.target;
        if (type === "radio") {
            return setValues(prevState => ({
                ...prevState,
                answers: prevState.answers.map((answer, i) => ({
                    ...answer,
                    isCorrect: index === i
                }))
            }));
        }
        return setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const submitQuestionHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(submitQuestion({ ...values }))

    }
    if (!role || role === "user") {
        return <section className="question-submit">
            <h2>Only Question-guru and Admin can submit questions</h2>
        </section>
    }
    return (
        <section className="question-submit">
            <h2>Read the description up above carefully and submit the form...</h2>
            <form className="question-submit-form" onSubmit={submitQuestionHandler}>
                <h3>Question Form</h3>
                <QuestionAddSelection handleChange={handleChange} values={values} />
                <label htmlFor="question">Question</label>
                <input id="question" name="question" type="text" value={values.question} onChange={handleChange} />
                <QuestionAnswersInputs values={values} setValues={setValues} handleChange={handleChange} handleAnswerChange={handleAnswerChange} />
                <button className="btn" type="submit">Submit Question</button>
            </form>
        </section>
    );
};
export default QuestionSubmitForm;