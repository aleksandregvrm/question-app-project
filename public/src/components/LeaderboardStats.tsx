import { LeaderboardType } from "../types/quizStatTypes";
import { generateIMG } from "../utils/helperFunctions";

const LeaderboardStats = ({ name, role, quizDoneAmount, averageQuizValue, place } : LeaderboardType) => {
  const usedPhoto = generateIMG(role)
  return (
    <div className={`leaderboard-list-container place${place}`}>
       <div className="name-img">
        <img className="leaderboard-stat-img" alt="user image" srcSet={usedPhoto} />
        <h3>Name : <strong>{name}</strong></h3>
        <h3>Role : <strong>{role}</strong></h3>
       </div>
       <div className="leaderboard-stat">
          <h2>Quizes done : <strong>{quizDoneAmount}</strong></h2>
          <h2>Average point : <strong>{averageQuizValue}</strong></h2>
       </div>
       <h2 className="place">#  <strong>{place}</strong></h2>
    </div>
  )
}
export default LeaderboardStats