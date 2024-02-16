import { useState } from "react";
import { Navigate } from "react-router-dom";
import Wrapper from "../wrappers/ResetPasswordWrapper";
import { useLocation } from "react-router-dom";
import { customFetch } from "../utils/helperFunctions";
import { handleChange } from "../utils/helperFunctions";
import { ResetPasswordStateType } from "../utils/helperFunctions";
import { Loading } from "../components";

const ResetPassword = () => {
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [values, setValues] = useState<ResetPasswordStateType>({ password: "" });
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
    const resetPassword = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await customFetch.post("/auth/reset-password", { token: query.get("token"), email: query.get("email"), password: values.password })
            console.log('success');
            setMessage(response.data.msg);
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    };
    
    if(!query.get("email") && !query.get("token")){        
       return <Navigate to="/"/>
    }
    if (loading) {
        return <Wrapper>
            <Loading />
        </Wrapper>
    }
    if (error) {
        return <Wrapper>
            <h2>Error with resetting password</h2>
        </Wrapper>
    }
    return (
        <Wrapper>
            <section className="password-reset">
                <form>
                    <label htmlFor="password" className="label-password">Provide your new password</label>
                    <input type="password" id='password' name='password' onChange={(e) => handleChange(e, setValues)} />
                    <button className='btn' onClick={resetPassword}>Submit</button>
                    <p>{message}</p>
                </form>
            </section>
        </Wrapper>
    )
}
export default ResetPassword