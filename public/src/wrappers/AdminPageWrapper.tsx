import styled from "styled-components";

const Wrapper = styled.main`
    padding: 1rem;
    .header{
        margin-top: 2rem;
    }
    .user-section{
        margin-top: 2rem;
    }
    .users-list{
        border: 1px solid black;
        width: 90%;
        max-width: 1100px;
        height: 600px;
        margin: 0 auto;
        margin-top: 1rem;
        overflow-y: scroll;
        padding: 1rem;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1.5rem;
    }
    .user{
        width: 160px;
        height: 300px;
        background: var(--clr-grey-300);
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.2rem;
        border-radius: 5px;
        padding: 0.2rem;
    }
    .user img{
        height: 100px;
        width: 100px;
    }
    .user div{
        display: flex;
        align-items: center;
        gap: 2px;
    }
    .delete-btn{
        background: var(--primary-Company-red);
        color: var(--primary-white);
        scale: 0.75;
    }
    .edit-btn{
        background: var(--primary-white);
    }
`
export default Wrapper;