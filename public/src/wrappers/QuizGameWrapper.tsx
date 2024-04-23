import styled from "styled-components";

const Wrapper = styled.main`
padding: 1rem;
    min-height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h2{
        text-align:center;
    }
    .quiz-container{
        margin-top: 2rem;
        padding: 1rem;
        min-height: 650px;
        width: 90%;
        max-width: 600px;
        border: 1px solid var(--primary-black);
        border-radius: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .answers{
        display: flex;
        justify-content: center;
        list-style: none;
        flex-wrap: wrap;
        gap: 1rem;
    }
    button{
        width: 240px;
        height: 60px;
        font-size: 1.3rem;
    }
    h3{
        font-size: 1.5rem;
    }
    h4{
        font-size: 1.2rem;
    }
`;
export default Wrapper;