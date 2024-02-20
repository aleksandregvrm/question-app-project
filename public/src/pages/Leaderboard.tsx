import { useEffect } from "react"
import { reduxDispatch, useReduxSelector } from "../store"
import { LeaderboardType, getLeaderboard, loadMoreList } from "../features/quizStats/quizStatsSlice"
import Wrapper from "../wrappers/LeaderboardWrapper";
import leaderboardIMG from "../assets/leaderboardpage.png";
import { LeaderboardStats,Loading } from "../components";

const Leaderboard = () => {
  const { leaderboard,disableLoadMoreButton,leaderboardIsLoading } = useReduxSelector((store) => store.quizStats);
  const dispatch = reduxDispatch();
  const loadMoreHandler = () => {
    dispatch(loadMoreList());
    dispatch(getLeaderboard());
  }
  useEffect(() => {
    if (leaderboard.length === 0) {
      dispatch(getLeaderboard());
    }
  }, []);
  return (
    <Wrapper>
      <section className="leaderboard-text">
        <div>
        <h2>Leaderboard...</h2>
        <p>In your leaderboard setting, the priority for determining the leader is based on two main factors: averageQuizValue and quizDoneAmount.
          <p>
            <strong>1.</strong> Average point: This metric represents the average points obtained by a participant across all quizzes taken. It serves as the primary criterion for ranking. Participants with higher averageQuizValue scores will rank higher on the leaderboard.
          </p>
          <p>
            <strong>2.</strong> Quizes done: In cases where participants have the same averageQuizValue, the number of quizzes completed becomes the tiebreaker. Participants who have completed more quizzes will be ranked higher.
          </p>
          <p>
            <strong>3.</strong> Together, these statistics ensure that participants with consistently high performance across quizzes are prioritized, while also considering the volume of participation. This setup encourages both excellence and engagement, creating a balanced and competitive environment within the leaderboard.</p>
        </p>
        </div>
        <img className="leaderboard-img" alt="Leaderboard image" srcSet={leaderboardIMG} />
      </section>
      <section className="leaderboard-list">
        {leaderboardIsLoading && <Loading/>}
        <h2>Best Quizers...</h2>
        {leaderboard.map((one:LeaderboardType)=>{
          const {name,role,quizDoneAmount,averageQuizValue,place,id} = one
          return <LeaderboardStats key={id} name={name} role={role} quizDoneAmount={quizDoneAmount} averageQuizValue={averageQuizValue} place={place} id={id}/>
        })}
        {!disableLoadMoreButton ? <button disabled={disableLoadMoreButton} onClick={loadMoreHandler} className="btn">Load more...</button> : null}
      </section>
    </Wrapper>
  )
}
export default Leaderboard