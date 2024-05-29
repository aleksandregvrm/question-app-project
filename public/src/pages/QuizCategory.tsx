import Wrapper from "../wrappers/QuizCategoryWrapper";
import { categoryImagesArr } from "../utils/otherStats";
import { NavLink, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { reduxDispatch, useReduxSelector } from "../store";
import { checkPermission, sendEvaluatedStats, saveCategory } from "../features/quizGame/quizGameSlice";

const QuizCategories = () => {
  const { quizState,quizDone} = useReduxSelector((store) => store.quizGame);
  const dispatch = reduxDispatch();
  useEffect(() => {
    dispatch(checkPermission());
  }, [])
  if(quizDone){
    return <Navigate to="game-on"/>
  }
  const categoryClickHandler = (category: string) => {
    if(quizState){
      dispatch(saveCategory(category))
      dispatch(sendEvaluatedStats())
    }
  }
  return (
    <Wrapper>
      <section className="category-header">
        <h2>Quizing Categories</h2>
        <p>Out of the given categories you can choose one and play that category or alternatively you can choose all to include every category (1000+) questions</p>
        {!quizState && <h4>You cannot play the game right now, You are either unauthenticated or have reached the limit</h4>}
      </section>
      <section className="categories">
        {categoryImagesArr.map((imageObj:Record<string,string>) => {
          const {category,img:image} = imageObj
          return <article onClick={() => categoryClickHandler(category)} className="category">
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