import Wrapper from '../wrappers/AdminPageWrapper';
import { reduxDispatch } from '../store';
import { useEffect } from 'react';
import { getAllQuizStats } from '../features/admin/adminSlice';
import { AllQuizStats } from '../components';


const AdminPage = () => {
    const dispatch = reduxDispatch();
    useEffect(()=>{
      dispatch(getAllQuizStats())
    },[])
    return (
        <Wrapper>
            <section className="header">
                <h2>Admin Page</h2>
                <p>Admins are the keystone of Georgian Quiz app along with the Question-gurus they provide new valid and tested questions, they edit or delete invalid or irrelevant questions. What makes admins more powerful is the ability to change the users status it's role. It is a rather important task because the Admin has to evaluate not just the how many quizes has the user done but -- <br />*  The average score of the user <br />
                    *  When was the user created <br />
                    *  His/Her last performance <br />
                    *  How active is the user
                </p>
                <p>In some given cases the admin can even deduct the role from the Question-guru if they have been taking advantage of their abilities of submitting reviewing the questions and using it as a cheat code. In this case Admin can do three things-- <br />
                    *  Firstly He/She can just ignore the fact (which is not recommended) <br />
                    *  Secondly admin can demote the Question-guru to a role of user and wait until another cycle of 50 quizes are complete <br />
                    *  Finally admin can just delete the user which is the worst scenario but sometimes quite useful</p>
                Just like above mentioned Question-guru admins should not take advantage of being in charge of question flow on this platform and cheat non-stop. Supervising admin would be paying a close attention to the admins behaviour and in case of a violation he/she will act accordingly
            </section>
            <section className="user-section">
                <div className="user-header">
                    <h2>Users control</h2>
                    <p>In users control you have the ability to view every user that is available on the platform, besides viewing you can also change their status based on your ability. You cannot change the admins status. In order to get a better understanding of how the user is performing and if he/she can be given the role of Question-guru. <strong>Note that you can also delete the user from here so be CAUTIOUS!!!</strong> </p>
                </div>
              <AllQuizStats/>
            </section>
        </Wrapper>
    )
}
export default AdminPage