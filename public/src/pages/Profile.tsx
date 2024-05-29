import Wrapper from '../wrappers/ProfileWrapper';
import { useReduxSelector } from '../store';
import { ProfileDetails, ProfileForm } from '../components';
import { eligibilityCheck, generateIMG } from '../utils/helperFunctions';
import { NavLink } from 'react-router-dom';
import { detailsToggle } from '../features/quizStats/quizStatsSlice';

const Profile = () => {
    const { role, name } = useReduxSelector((store) => store.user);
    const { averageQuizValue, totalQuizPoints, quizDoneAmount,lastQuizResult, detailsOpen } = useReduxSelector((store) => store.quizStats);
    const userPhoto = generateIMG(role)
    if (!role) {
        return <Wrapper>
            Log in first please :)
        </Wrapper>
    }
    return (
        <Wrapper>
            <section className="name-profile">
                <h2>Welcome Back {name}</h2>
            </section>
            <section className="profile-info">
                <div className='user-role'>
                    <img alt="user-img" className='user-img' srcSet={userPhoto} />
                    <h3>Role : <strong>{role}</strong></h3>
                </div>
                <ProfileForm />
                <section className="user-stats">
                    <h2>{name}'s Stats</h2>
                    <p>Average score : <strong>{averageQuizValue}</strong></p>
                    <p>Quiz Done : <strong>{quizDoneAmount}</strong></p>
                    <p>Total quiz points : <strong>{totalQuizPoints}</strong></p>
                    {/* <ProfileDetails /> */}
                    <ProfileDetails detailsToggle={detailsToggle} detailsOpen={detailsOpen} lastQuizResult={lastQuizResult}/>
                </section>
                {/* Eligibility Check checks for the users status and amount of quizes that they have done if the user is Admin,User or a question guru a certain text is provided */}
                <section className="user-summary">
                    <h2>{name}'s Summary</h2>
                    {eligibilityCheck(role,quizDoneAmount)}
                </section>
                {/* User Ability section provides buttons if the user is authorized to send a request to become a Question guru. also this is the only place from where the admin Could navigate to the Admin page. */}
                <section className="user-ability">
                    {role === "user" && quizDoneAmount >= 50 && <button className='btn'>Become a Question-guru</button>}
                    {role === "admin" && <NavLink to='/admin'><button className='btn admin-button'>Admin Page</button></NavLink>}
                </section>
            </section>
        </Wrapper>
    )
}
export default Profile