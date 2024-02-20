import { LeaderboardType } from "../features/quizStats/quizStatsSlice";
import adminIMG from "../assets/admin.png";
import userIMG from "../assets/user.png";
import questionGuruIMG from "../assets/guru.png";

let usedPhoto:string
const LeaderboardStats = ({ name, role, quizDoneAmount, averageQuizValue, place } : LeaderboardType) => {
  console.log(role);
  if(role === 'admin'){
    usedPhoto = adminIMG;
  }
  if(role === "question-guru"){
    usedPhoto = questionGuruIMG;
  }
  if(role === "user"){
    usedPhoto = userIMG;
  }
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