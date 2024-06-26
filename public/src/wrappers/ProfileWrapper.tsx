import styled, { keyframes } from "styled-components";


const scaleAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
`;

const Wrapper = styled.main`
    display: flex;
    min-height: 700px;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    padding: 1rem;
    .user-role{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }
    .user-img{
        margin-top: 2rem;
        width: 100px;
        height: 100px;
    }
    .profile-form{
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }
    input{
        font-size: 1rem;
        width: 300px;
        height: 2rem;
    }
    button{
        margin-top: 1rem;
    }
    .admin-button{
        background: var(--primary-Company-red);
        animation: ${scaleAnimation} 2s infinite alternate-reverse;
    }
    .user-ability{
        display: flex;
        justify-content: center;
        gap: 0.5rem;
    }
    .user-stats{
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: auto;
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
        /* transition: var(--transition); */
        visibility: hidden;
        overflow: hidden;
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
    @media screen and (min-width:890px){
        .user-summary{
            max-width: 500px;
        }
    }
`
export default Wrapper;