import styled from "styled-components";

const Wrapper = styled.main`
    height: 800px;
    padding: 1rem;
    display: flex;
    justify-content: center;
    .auth-form{
        border: 1px solid var(--primary-black);
        border-radius: 1.5rem;
        padding: 1rem;
        margin-top: 2rem;
        width: 350px;
    }
    .auth-form h2{
        text-align: center;
    }
    .auth-form form{
        width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.5rem;
    }
    input{
        height: 2rem;
    }
    button{
        margin-top: 1rem;
    }
    .different-auth{
        margin-top: 2rem;
    }
    .other-auth{
        cursor: pointer;
    }
    p{
      margin-top: 1rem;
    }
`
export default Wrapper;