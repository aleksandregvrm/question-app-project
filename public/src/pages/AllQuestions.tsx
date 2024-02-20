import Wrapper from "../wrappers/AllQuestionsWrapper";
import { reduxDispatch } from "../store";
import { AllQuestionsLoaded,AllQuestionFilters } from "../components";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { getAllQuestions } from "../features/questions/questionsSlice";
import { useEffect } from "react";

const AllQuestions = () => {
    const dispatch = reduxDispatch();
    useEffect(()=>{
      dispatch(getAllQuestions())
    },[])
    return (
        <Wrapper>
            <section className="all-questions-header">
                <h2>Here we have all questons provided...</h2>
                <p>As an admin you have a responsibility to keep all the questions clean, make sure all the provided answers are valid and each question contains a correct answer. do not try to use your ability of knowing all the questions to kill of the competition and cheat on the leaderboard</p>
            </section>
            <section className="all-questions-section">
                <h2 className="section-header">All questions...</h2>
                <AllQuestionFilters/>
                <AllQuestionsLoaded/>
                <div className="questions-next-prev">
                    <button className="question-btn">
                    <FaArrowLeft/>
                    </button>
                    <button className="question-btn">
                    <FaArrowRight/>
                    </button>
                </div>
            </section>
        </Wrapper>
    )
}
export default AllQuestions