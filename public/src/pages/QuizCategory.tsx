import Wrapper from "../wrappers/QuizCategoryWrapper";
import  {categoryImages}  from "../utils/otherStats";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { reduxDispatch,useReduxSelector } from "../store";
import { checkPermission,sendEvaluatedStats } from "../features/quizGame/quizGameSlice";

const QuizCategories = () => {
  const {quizState} = useReduxSelector((store)=>store.quizGame);
  const dispatch = reduxDispatch();
  useEffect(()=>{
   dispatch(checkPermission());
  },[])
  return (
    <Wrapper>
      <section className="category-header">
        <h2>Quizing Categories</h2>
        <p>Out of the given categories you can choose one and play that category or alternatively you can choose all to include every category (1000+) questions</p>
        {!quizState && <h4>You cannot play the game right now, You are either unauthenticated or have reached the limit</h4>}
      </section>
      <section className="categories">
        {categoryImages.map((image)=>{
          return <article onClick={()=>dispatch(sendEvaluatedStats())}className="category">
            <NavLink to="game-on">
            <img alt="category image" srcSet={image} />
            </NavLink>
          </article>
        })}
      </section>
    </Wrapper>
  )
}

export default QuizCategories