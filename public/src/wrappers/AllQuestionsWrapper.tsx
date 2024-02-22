import styled from "styled-components";

const Wrapper = styled.main`
    padding: 1rem;
    .all-questions-header{
        margin: 0 auto;
        margin-top: 2rem;
        max-width: 800px;
    }
    .section-header{
        margin-top: 2rem;
    }
    .all-questions-section{
        margin-top: 2rem;
    }
    .exemption-questions{
        display: flex;
       height: 600px;
       justify-content: center;
       align-items: center;
    }
    .exemption-questions h2{
    }
    .questions{
        margin-top: 1rem;
        background: var(--clr-grey-300);
        padding: 1rem 0;
        display: flex;
        flex-wrap: wrap;
    }
    .question{
        border-radius: 2rem;
        padding: 1rem;
        width: 100%;
        max-width: 450px;
        position: relative;
    }
    .question-text{
        background: none;
        border: none;
        font-size: 1.1rem;
        padding: 0.5rem;
        width: 100%;
        resize: none;
    }
    .answer{
        background: var(--primary-white);
        padding: 0 1rem;
        margin-top: 1rem;
        font-size: 1rem;
        border: none;
        width: 100%;
        padding: 0.3rem;
    }
    .question-filters{
        margin-top: 1rem;
    }
    .question-filter-form{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        max-width: 700px;
        gap: 0.5rem;
    }
    .question-filter-form input{
        width: 80%;
        max-width: 300px;
    }
    .questions-next-prev{
        display: flex;
        gap: 0.5rem;
        justify-content: space-evenly;
        margin-top: 1rem;
    }
    .question-btn{
        font-size: 1.5rem;
        cursor: pointer;
        background: none;
        border: none;
        transition: var(--transition);
        &:hover{
            background: var(--primary-black);
            color: var(--primary-white);
        }
    }
    .edit-button{
      border: none;
      font-size: 1.4rem;
      background: none;
      color: var(--primary-Company-blue);
      position: absolute;
      top: 50%;
      right: 75%;
      cursor: pointer;
      visibility:hidden;
    }
    .delete-button{
      border: none;
      font-size: 1.4rem;
      background: none;
      color: var(--primary-Company-blue);
      position: absolute;
      top: 50%;
      right: 25%;
      cursor: pointer;
      visibility:hidden;
    }
    .additional-btn{
        margin-top: 0.3rem;
        margin-left: 1rem;
    }
    .question:hover .edit-button{
        visibility: visible;
    }
    .question:hover .delete-button{
        visibility: visible;
    }
`
export default Wrapper;