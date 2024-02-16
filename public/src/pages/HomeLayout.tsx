import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainWrapper from '../wrappers/Wrapper';
import { Navbar,Footer } from "../components";
import { useReduxSelector, reduxDispatch } from "../store";
import { getQuizStats } from "../features/quizStats/quizStatsSlice";

const HomeLayout = () => {
  const {userId,role} = useReduxSelector((store)=>store.user);
  const dispatch = reduxDispatch();
  useEffect(() => {
    if(role){
      dispatch(getQuizStats(userId));
    }
  }, [role])
  return (
    <MainWrapper>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </MainWrapper>
  )
}

export default HomeLayout