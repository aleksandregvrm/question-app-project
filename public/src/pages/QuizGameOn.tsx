// import { useState, useEffect, MouseEvent } from "react";
import { useState, useEffect, MouseEvent } from "react";
import { useReduxSelector, reduxDispatch } from "../store";
import Wrapper from "../wrappers/QuizGameWrapper";
import { Navigate } from "react-router-dom";
import { Loading } from "../components";
import { getQuestion, evaluateQuestion, sendEvaluatedStats } from "../features/quizGame/quizGameSlice";
import { AnswerType } from "../utils/helperFunctions";
import { NavLink } from "react-router-dom";
import { QuestionType } from "../features/quizStats/quizStatsSlice";

const initialValue: number = 10;
const QuizPage = () => {
  const [quizLoading, setQuizLoading] = useState<boolean>(true);
  const [timerValue, setTimerValue] = useState<number>(initialValue);
  const { quizMode,quizState, activeQuestion, correctAnswers, isLoading, quizDone } = useReduxSelector((store) => store.quizGame);
  const dispatch = reduxDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuizLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [])
  useEffect(() => {
    if(quizMode){
      dispatch(getQuestion())
    }
  }, [])
  useEffect(() => {
    let countdownTimer: ReturnType<typeof setTimeout>;
    if (!quizDone) { 
      if (quizState && timerValue > 0) {
        countdownTimer = setTimeout(() => {
          setTimerValue((prevValue) => prevValue - 1);
        }, 1000);
      } else if(quizMode){
        dispatch(evaluateQuestion({ question: '', answerIsTrue: false, answerSubmitted: '' }))
        dispatch(getQuestion());
        setTimerValue(initialValue)
      }
      return () => clearTimeout(countdownTimer);
    }
  }, [quizState, timerValue]);
  const submitQuestion = (e: MouseEvent<HTMLButtonElement>, { answerSubmitted, answerIsTrue, question }: QuestionType) => {
    const answerText = e.currentTarget.textContent as string;
    console.log(answerText);
    dispatch(evaluateQuestion({ question, answerIsTrue, answerSubmitted }))
    setTimerValue(initialValue)
    dispatch(getQuestion());
  }
  if (!quizState) {
    return <Navigate to="/" />
  }
  if (quizDone) {
    return <Wrapper>
      <h2>Quiz is done returning to the home page... well done</h2>
      <NavLink onClick={() => dispatch(sendEvaluatedStats())} to='/'><button className="btn">Submit Result</button></NavLink>
    </Wrapper>
  }
  if (quizLoading) {
    return <Wrapper>
      <h2>Quiz will begin briefly</h2>
      <Loading />
    </Wrapper>
  }
  if (isLoading) {
    return <Wrapper>
      <Loading />
    </Wrapper>
  }
  const { question, answers } = activeQuestion[0];
  return (
    <Wrapper>
      <div className="quiz-container">
        <h2>{question}</h2>
        <ul className="answers">
          {answers.map((answer: AnswerType) => {
            const { option: answerSubmitted, isCorrect: answerIsTrue, _id: answerId } = answer;
            return <li key={answerId}>
              <button className="btn" onClick={(e) => submitQuestion(e, { question, answerIsTrue, answerSubmitted })}>{answerSubmitted}</button>
            </li>
          })}
          <h4>Correct Answers : {correctAnswers}</h4>
        </ul>
        <h3 className="timer"><strong>Timer : {timerValue}</strong></h3>
      </div>
    </Wrapper>
  );
};
export default QuizPage;
// import { useReduxSelector, reduxDispatch } from "../store";
// import Wrapper from "../wrappers/QuizGameWrapper";
// import { Navigate } from "react-router-dom";
// import { Loading } from "../components";
// import { getQuestion, skipQuestion, evaluateQuestion, sendEvaluatedStats } from "../features/quizGame/quizGameSlice";
// import { AnswerType } from "../utils/helperFunctions";
// import { NavLink } from "react-router-dom";
// import { QuestionType } from "../features/quizStats/quizStatsSlice";

// const initialValue: number = 10;
// const QuizPage = () => {
//   const [quizLoading, setQuizLoading] = useState<boolean>(true);
//   const [timerValue, setTimerValue] = useState<number>(initialValue);
//   const { quizState, activeQuestion, correctAnswers, isLoading, quizDone, quizMode } = useReduxSelector((store) => store.quizGame);
//   const dispatch = reduxDispatch();
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setQuizLoading(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, [])
//   useEffect(() => {
//     dispatch(getQuestion())
//   }, [])
//   useEffect(() => {
//     let countdownTimer: ReturnType<typeof setTimeout>;
//     if (!quizDone) {
//       if (quizState && timerValue > 0 && quizMode) {
//         countdownTimer = setTimeout(() => {
//           setTimerValue((prevValue) => prevValue - 1);
//         }, 1000);
//       }
//       if (quizMode) {
//         dispatch(skipQuestion());
//         dispatch(evaluateQuestion({ question: '', answerIsTrue: false, answerSubmitted: '' }))
//         dispatch(getQuestion());
//         setTimerValue(initialValue)
//       }
//       return () => clearTimeout(countdownTimer);
//     }
//   }, [quizState, timerValue]);
//   const submitQuestion = (e: MouseEvent<HTMLButtonElement>, { answerSubmitted, answerIsTrue, question }: QuestionType) => {
//     const answerText = e.currentTarget.textContent as string;
//     console.log(answerText);
//     dispatch(evaluateQuestion({ question, answerIsTrue, answerSubmitted }))
//     setTimerValue(initialValue)
//     dispatch(getQuestion());
//   }
//   if (!quizState) {
//     return <Navigate to="/" />
//   }
//   if (quizDone) {
//     return <Wrapper>
//       <h2>Quiz is done returning to the home page... well done</h2>
//       <NavLink onClick={() => dispatch(sendEvaluatedStats())} to='/'><button className="btn">Submit Result</button></NavLink>
//     </Wrapper>
//   }
//   if (quizLoading) {
//     return <Wrapper>
//       <h2>Quiz will begin briefly</h2>
//       <Loading />
//     </Wrapper>
//   }
//   if (isLoading) {
//     return <Wrapper>
//       <Loading />
//     </Wrapper>
//   }
//   const { question, answers } = activeQuestion[0];
//   return (
//     <Wrapper>
//       <div className="quiz-container">
//         <h2>{question}</h2>
//         <ul className="answers">
//           {answers.map((answer: AnswerType) => {
//             const { option: answerSubmitted, isCorrect: answerIsTrue, _id: answerId } = answer;
//             return <li key={answerId}>
//               <button className="btn" onClick={(e) => submitQuestion(e, { question, answerIsTrue, answerSubmitted })}>{answerSubmitted}</button>
//             </li>
//           })}
//           <h4>Correct Answers : {correctAnswers}</h4>
//         </ul>
//         <h3 className="timer"><strong>Timer : {timerValue}</strong></h3>
//       </div>
//     </Wrapper>
//   );
// };
// export default QuizPage;