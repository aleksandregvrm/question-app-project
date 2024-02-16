import Wrapper from '../wrappers/ProfileWrapper';
import userImg from "../assets/user.png";
import guruImg from "../assets/guru.png";
import adminImg from "../assets/admin.png";
import { useReduxSelector } from '../store';
import { ProfileDetails, ProfileForm } from '../components';

let userStatus: string = 'user';
let userPhoto: string = userImg;
const Profile = () => {
    const { role, name } = useReduxSelector((store) => store.user);
    const { averageQuizValue, totalQuizPoints, quizDoneAmount } = useReduxSelector((store) => store.quizStats);
    console.log(role);
    userStatus = role;
    if (!userStatus) {
        return <Wrapper>
            Log in first please :)
        </Wrapper>
    }
    if (userStatus === 'admin') {
        userPhoto = adminImg;
    }
    if (userStatus === 'question-guru') {
        userPhoto = guruImg;
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
                    <ProfileDetails />
                </section>
                <section className="user-summary">
                    <h2>{name}'s Summary</h2>
                    <p>You are doing quite well, you have already completed {quizDoneAmount} quizes and soon after {100 - quizDoneAmount} more quizes you will be eligable to become a question-guru</p>
                </section>
            </section>
        </Wrapper>
    )
}
export default Profile