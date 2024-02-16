import { NavLink } from "react-router-dom";
import { reduxDispatch, useReduxSelector } from "../store";
import { logoutUser } from "../features/user/userSlice";

const NavLinks = () => {
    const { role } = useReduxSelector((store) => store.user);
    const dispatch = reduxDispatch();
    return (
        <ul>
            <li className='link'>
                <NavLink to="/">Home
                </NavLink>
            </li>
            <li className='link'><NavLink to="/profile">Profile
            </NavLink></li>
            <li className='link'><NavLink to="/leaderboard">Leaderboard
            </NavLink></li>
            <li className='link'><NavLink to="/">All Questions
            </NavLink></li>
            <li className='link'><NavLink to="/add-question">Add Question
            </NavLink></li>
            <li className='link'><NavLink to="/">About
            </NavLink></li>
            {!role ? <li className='link'><NavLink to="/authorization">Log in
            </NavLink></li> : <li className='link'><NavLink to="/" onClick={() => dispatch(logoutUser())}>Log out
            </NavLink></li>}
            <li><NavLink to="quiz-game">Quiz Up</NavLink></li>
        </ul>
    )
}
export default NavLinks