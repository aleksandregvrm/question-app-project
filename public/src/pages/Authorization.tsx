import { useState,MouseEvent } from 'react';
import Wrapper from '../wrappers/AuthorizationWrapper';
import { handleChange } from '../utils/helperFunctions';
import { InitialStateType } from '../utils/helperFunctions';
import { setAuth, AuthStateType } from '../utils/helperFunctions';
import { loginUser,registerUser } from '../features/user/userSlice';
import { reduxDispatch,useReduxSelector } from '../store';
import { Navigate } from 'react-router-dom';
import { LoginStatus } from '../components';

const initialState: InitialStateType = {
    email: "",
    name: "",
    password: "",
}
const initialAuthState: AuthStateType = {
    login: true,
    register: false,
    forgotPassword: false,
}
const Authorization = () => {
    const [values, setValues] = useState<InitialStateType>
        (initialState);
    const [authType, setAuthType] = useState<AuthStateType>(initialAuthState);
    const dispatch = reduxDispatch();
    const { role } = useReduxSelector((store)=>store.user);
    if(role){
       return <Navigate to="/"/>
    }
    const submitAuth = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { login, register } = authType;
        const { email, password, name } = values
        if (login) {
            return dispatch(loginUser({email,password}));
        }
        if (register) {
            return dispatch(registerUser({name,email,password}))
        }
        return 
    }
    return (
        <Wrapper>
            <section className="authorization">
                <div className="auth-form">
                    {authType.login ?
                        <h2>Authorize</h2> : authType.forgotPassword ? <h2>Forgot Password</h2> : authType.register ? <h2>Register</h2> : null
                    }
                    <form>
                        {authType.register &&
                            <>
                                <label htmlFor="name">Name</label>
                                <input type="text" name='name' id='name' onChange={(e) => handleChange(e, setValues)} />
                            </>
                        }
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' id='email' onChange={(e) => handleChange(e, setValues)} />
                        {!authType.forgotPassword &&
                            <>
                                <label htmlFor="password">Password</label>
                                <input type="password" id='password' name='password' onChange={(e) => handleChange(e, setValues)} />
                            </>
                        }
                        <button className='btn' onClick={submitAuth}>Submit</button>
                        <LoginStatus/>
                    </form>
                </div>
                <div className="different-auth">
                    {!authType.register && <h3>Don't have an account? click <strong className='other-auth' data-id="register" onClick={(e) => setAuth(e, setAuthType)}>Register</strong></h3>}
                    {!authType.forgotPassword && <h3>Forgot password? click <strong className='other-auth' data-id="forgotPassword" onClick={(e) => setAuth(e, setAuthType)}>Forgot Password</strong></h3>}
                    {!authType.login && <h3>Already Have an Account? <strong className='other-auth' data-id="login" onClick={(e) => setAuth(e, setAuthType)}>Log in</strong></h3>}
                </div>
            </section>
        </Wrapper>
    )
}
export default Authorization