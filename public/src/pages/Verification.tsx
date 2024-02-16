import { useEffect,useState } from "react";
import { NavLink,useLocation,Navigate } from "react-router-dom";
import { Loading } from "../components";
import Wrapper from "../wrappers/VerifyWrapper";
import { customFetch } from "../utils/helperFunctions";

const Verification = () => {
    const [error,setError] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false);

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
    if (!query.get("email") && !query.get("token")) {
        return <Navigate to="/" />
    }
    useEffect(()=>{
        const verifyToken = async () : Promise<void> => {
            setLoading(true);
            try {
                await customFetch.get(`/auth/verify-email?token=${query.get("token")}&email=${query.get("email")}`)
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };
        verifyToken();
    },[])
    if (loading) {
        return (
            <Wrapper>
                <Loading />
            </Wrapper>
        );
    }
    if (error) {
        return <Wrapper>
            <h2>There has been an error with verifying</h2>
        </Wrapper>
    }
  return (
    <Wrapper>
        <h2>User Verified</h2>
        <NavLink to="/authorization"><button className="btn">Log in</button></NavLink>
    </Wrapper>
  )
}
export default Verification