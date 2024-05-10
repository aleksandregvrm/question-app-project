import Wrapper from "../wrappers/AllQuestionsWrapper";
import { reduxDispatch, useReduxSelector } from "../store";
import { AllQuestionsLoaded, AllQuestionFilters } from "../components";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { getAllQuestions, nextPage, prevPage } from "../features/questions/questionsSlice";
import { useEffect } from "react";

const AllQuestions = () => {
    const { search, questionType, page } = useReduxSelector((store) => store.questions)
    const { role } = useReduxSelector((store) => store.user)
    const dispatch = reduxDispatch();
    useEffect(() => {
        if (!role || role === "user") {
            return
        }
        dispatch(getAllQuestions())
    }, [search, questionType, page])
    if (!role || role === "user") {
        return <Wrapper>
            <div className='exemption-questions'>
                <h2>Only Admin and Question-guru can access all the questions...</h2>
            </div>
        </Wrapper>
    }
    return (
        <Wrapper>
            <section className="all-questions-header">
                <h2>Here we have all questons provided...</h2>
                <p>As an admin you have a responsibility to keep all the questions clean, make sure all the provided answers are valid and each question contains a correct answer. do not try to use your ability of knowing all the questions to kill of the competition and cheat on the leaderboard</p>
            </section>
            <section className="all-questions-section">
                <h2 className="section-header">All questions...</h2>
                <AllQuestionFilters />
                <AllQuestionsLoaded />
                <div className="questions-next-prev">
                    <button className="question-btn" onClick={() => dispatch(prevPage())}>
                        <FaArrowLeft />
                    </button>
                    <h2>{page}</h2>
                    <button className="question-btn" onClick={() => dispatch(nextPage())}>
                        <FaArrowRight />
                    </button>
                </div>
            </section>
        </Wrapper>
    )
}
export default AllQuestions