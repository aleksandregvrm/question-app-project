import styled from "styled-components";

const Wrapper = styled.nav`
    width: 100%;
    background: var(--primary-black);
    display: flex;
    gap: 1rem;
    padding: 1rem;
    ul{
        display: flex;
        list-style:none;
        width: 80%;
        margin: 0 auto;
        padding: 0.5rem;
        flex-wrap: wrap;
        gap: 1rem;
        color: var(--primary-white);
    }
    .links{
    }
    .link a{
        cursor: pointer;
        &:hover{
         color: var(--grey-800);
        }
        transition: var(--transition);
    }
    .logo{
        height: 130px;
        width: 130px;
    }
    .logo img{
      object-fit: contain;
    }
    .user-information{
        display: none;
    }
    @media screen and (min-width:980px){
        align-items: center;
        ul{
            width: 100%;
        }
        .user-information{
            display: inline-block;
            width: 30%;
        }
        .user-information h3{
            color: var(--primary-white);
            width: fit-content;
        }
        .links{
            width: 50%;
        }
        .last-quiz{
            text-decoration: underline;
            transition: var(--transition);
            width: fit-content;
            &:hover{
                text-decoration: none;
            }
        }
        .performance-text{
            color: var(--primary-white);
        }
}
`

export default Wrapper;