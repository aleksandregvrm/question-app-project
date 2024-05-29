import styled from "styled-components";

const Wrapper = styled.main`
    padding: 1rem;
    min-height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    .user{
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
    }
    .user-img{
        width: 90%;
        max-width: 350px;
    }
     .user-summary{
        margin: 0 auto;
        margin-top: 2rem;
    }
    .user-summary h2{
        text-align: center;
    }
    .details-section{
        text-align: center;
    }
    .last-quiz-details{
        border: 1px solid var(--primary-black);
        border-radius: 1rem;
        padding: 0.5rem;
        height: 0;
        visibility: hidden;
    }
    .details{
        cursor: pointer;
    }
    .details-active{
        visibility: visible;
        height: 102px;
    }
    .single-question{
        position: relative;
        border-radius: 1rem;
    }
    .question-number{
        position: absolute;
        right: 1rem;
    }
`
export default Wrapper;