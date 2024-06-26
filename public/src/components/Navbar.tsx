import { NavLink } from "react-router-dom";
import Wrapper from '../wrappers/NavbarWrapper';
import CompanyLogo from '../assets/company-logo.png';
import NavLinks from "./NavLinks";
import { useReduxSelector,reduxDispatch } from "../store";
import { evaluateLastQuizPoints } from "../utils/helperFunctions";
import { detailsToggle } from "../features/quizStats/quizStatsSlice";

const Navbar = () => {
    const { role } = useReduxSelector((store) => store.user);
    const { quizDoneAmount,averageQuizValue,lastQuizResult:{lastQuizCorrectAnswers} } = useReduxSelector((store)=>store.quizStats);
    const dispatch = reduxDispatch();
    return (
        <Wrapper>
            <div className="links">
                <NavLinks />
            </div>
            <div className="logo">
                <img src={CompanyLogo} alt="" />
            </div>
            {role ? 
            <div className="user-information">
                <div className="info">
                    <h3>Quiz Done : {quizDoneAmount === 0? "TBD" : quizDoneAmount}</h3>
                </div>
                <div className="info">
                    <h3>Average Point : {averageQuizValue === 0? "TBD" : averageQuizValue}</h3>
                </div>
                <div className="info">
                    <h3 className="last-quiz" onClick={()=>dispatch(detailsToggle())}>
                        <NavLink to='/profile'>
                            Last Quiz
                        </NavLink>
                    </h3>
                    <p className="performance-text">{evaluateLastQuizPoints(lastQuizCorrectAnswers)}</p>
                </div>
            </div> : <div className="user-information">
                <h3>Authorize first</h3>
            </div>
            }
        </Wrapper>
    )
}
export default Navbar