import Wrapper from "../wrappers/SingleQuizStatWrapper";
import { Loading, ProfileDetails } from "../components";
import { reduxDispatch,useReduxSelector } from "../store";
import { useEffect } from "react";
import { getSingleQuizStat } from "../features/admin/adminSlice";
import { formatDateDays, generateIMG, calculateQuizerIndex } from "../utils/helperFunctions";
import { toggleDetails } from "../features/admin/adminSlice";

const SingleQuizStat = () => {
  const {singleUserStats,isLoading,detailsOpen} = useReduxSelector((store)=>store.admin)
  const dispatch = reduxDispatch();
  const id = new URLSearchParams(location.search).get("id");
  useEffect(()=>{
      dispatch(getSingleQuizStat(id as string));
  },[id,dispatch])
  if(isLoading){
    return <section className="user">
      <Loading/>
    </section>
  }
  if(!singleUserStats || singleUserStats.length === 0){
    return <section className="user">
      <h2>No data found</h2>
    </section>
  }
  const {name,role,quizDoneAmount,averageQuizValue,dailyQuizAmount,lastQuizResult,totalQuizPoints,createdAt} = singleUserStats[0];
    return (
      <Wrapper>
        <section className="user">
          <div className="user-img">
            <img srcSet={generateIMG(role)} />
          </div>
          <div className="user-info">
            <h2>Name : <strong>{name}</strong></h2>
            <h2>Role : <strong>{role}</strong></h2>
            <h2>Quiz Done : <strong>{quizDoneAmount}</strong></h2>
            <h2>Daily Quiz Amount : <strong>{dailyQuizAmount}</strong></h2>
            <h2>Total Quiz Points : <strong>{totalQuizPoints}</strong></h2>
            <h2>Average Quiz Point : <strong>{averageQuizValue}</strong></h2>
            <h2>User Created : <strong>{formatDateDays(createdAt)}</strong></h2>
            <h2>Eligible For Question Guru : <strong>False</strong></h2>
            <h2>Quizer Index(0-100) : <strong>{calculateQuizerIndex(createdAt,averageQuizValue,quizDoneAmount)}</strong></h2>
          </div>
        </section>
        <ProfileDetails detailsToggle={toggleDetails} detailsOpen={detailsOpen} lastQuizResult={lastQuizResult}/>
      </Wrapper>
    )
}
export default SingleQuizStat