import { MouseEvent, useRef, useEffect } from "react";
import { reduxDispatch } from "../store";
import { formatDateDays } from '../utils/helperFunctions';
import { ProfileDetailsType } from "../types/adminTypes";

const ProfileDetails = ({detailsOpen,lastQuizResult,detailsToggle}:ProfileDetailsType) => {
    const { lastQuizCorrectAnswers, lastQuizDoneDate, questionsUsed } = lastQuizResult;
    const dispatch = reduxDispatch();
    const questionsRef = useRef<HTMLDivElement>(null);
    const questionsContainerRef = useRef<HTMLDivElement>(null);
    const questionsUsedLength = questionsUsed.length;
    useEffect(() => {
        const divHeight = questionsRef.current?.getBoundingClientRect().height;
        if (divHeight && questionsContainerRef.current) {
            if (detailsOpen) {
                questionsContainerRef.current.style.height = `auto`;
            } else {
                questionsContainerRef.current.style.height = "0px";
            }
        }
    }, [detailsOpen])
    const detailsHandler = (e: MouseEvent<HTMLParagraphElement>) => {
        e.preventDefault();
        dispatch(detailsToggle())
    }
    return (
        <section className="details-section">
            <p onClick={(e) => detailsHandler(e)}><strong className='details'>{!detailsOpen ? "more details..." : "less details..."}</strong></p>
            <div className={`${detailsOpen ? "last-quiz-details details-active" : "last-quiz-details"}`} ref={questionsContainerRef}>
                <p>last quiz result is : <strong>{lastQuizCorrectAnswers}/{questionsUsedLength}</strong></p>
                <p>last quiz was done : <strong>{!lastQuizDoneDate ? "TBD" : formatDateDays(lastQuizDoneDate)}</strong></p>
                <h2>Last questions used</h2>
                {
                    questionsUsed.length < 1 ? "" :
                        questionsUsed.map((one, index) => {
                            const { question, answerSubmitted, answerIsTrue } = one;
                            return (
                                <div style={{
                                    background: !answerIsTrue ? "#ee2849" : "#3cb371", padding: "2rem",
                                    marginTop: "1rem"
                                }} key={index} className="single-question" ref={questionsRef}>
                                    <h3> question : <strong>{question}</strong></h3>
                                    <h3> answer : <strong>{answerSubmitted}</strong></h3>
                                    <h3> result : <strong>{answerIsTrue.toString()}</strong></h3>
                                    <h3 className="question-number">{index + 1}</h3>
                                </div>
                            )
                        })
                }
            </div>
        </section>
    )
}
export default ProfileDetails