import { MouseEvent, useRef, useEffect } from "react";
import { reduxDispatch, useReduxSelector } from "../store";
import { detailsToggle } from "../features/quizStats/quizStatsSlice";

const ProfileDetails = () => {
  const { detailsOpen, lastQuizResult } = useReduxSelector((store) => store.quizStats);
  const { lastQuizCorrectAnswers, lastQuizDoneDate, questionsUsed } = lastQuizResult;
  const dispatch = reduxDispatch();
  const questionsRef = useRef<HTMLDivElement>(null);
  const questionsContainerRef = useRef<HTMLDivElement>(null);
  const questionsUsedLength = questionsUsed.length;
  useEffect(() => {
    const divHeight = questionsRef.current?.getBoundingClientRect().height;
    const gapLength = 16;
    if (divHeight && questionsContainerRef.current) {
      if (detailsOpen) {
        questionsContainerRef.current.style.height = `${(divHeight * questionsUsedLength) + 105 + 
          (questionsUsedLength * gapLength)}px`;
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
      <p onClick={(e)=>detailsHandler(e)}><strong className='details'>{!detailsOpen ? "more details..." : "less details..."}</strong></p>
      <div className={`${detailsOpen ? "last-quiz-details details-active" : "last-quiz-details"}`} ref={questionsContainerRef}>
        <p>Your last quiz result is : <strong>{lastQuizCorrectAnswers}/{questionsUsedLength}</strong></p>
        <p>Your last quiz was done on : <strong>{!lastQuizDoneDate ? "TBD" : lastQuizDoneDate.toString()}</strong></p>
        <h2>Last questions used</h2>
        {
         questionsUsed.length < 1 ? "" : 
          questionsUsed.map((one, index) => {
            const { question, answerSubmitted, answerIsTrue } = one;
            
            return (
              <div style={{ background: !answerIsTrue ? "red" : "green", padding: "2rem", 
              marginTop: "1rem" }} key={index} className="single-question" ref={questionsRef}>
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