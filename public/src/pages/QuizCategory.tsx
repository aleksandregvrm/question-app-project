import Wrapper from "../wrappers/QuizCategoryWrapper";
import  {categoryImages}  from "../utils/otherStats";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { reduxDispatch } from "../store";
import { checkPermission,sendEvaluatedStats } from "../features/quizGame/quizGameSlice";

const QuizCategories = () => {
  const dispatch = reduxDispatch();
  useEffect(()=>{
   dispatch(checkPermission());
  },[])
  return (
    <Wrapper>
      <section className="category-header">
        <h2>Quizing Categories</h2>
        <p>Out of the given categories you can choose one and play that category or alternatively you can choose all to include every category (1000+) questions</p>
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