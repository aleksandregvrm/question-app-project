import styled from "styled-components";

const Wrapper = styled.main`
    min-height: 700px;
    padding: 1rem;
    .instructions{
        margin-top: 2rem;
    }
    .question-submit{
        margin-top: 2rem;
    }
    .question-submit-form{
        border: 1px solid var(--primary-black);
        margin: 0 auto;
        border-radius: 2rem;
        max-width: 600px;
        padding: 1rem;
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
        align-items: center;
    }
    #question{
        width: 90%;
        max-width: 500px;
    }
    .answers-container{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.3rem;
        flex-wrap: wrap;
    }
    input{
        height: 2rem;
        max-width: 300px;

    }
    select{
        font-size: 1.1rem;
        width: 50%;
        max-width: 200px;
    }
    h2,h3{
        text-align: center;
    }
`
export default Wrapper;