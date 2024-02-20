import styled from "styled-components";

const Wrapper = styled.main`
    padding: 1rem;
    .about-text{
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
    }
    .about-img-library{
        margin-top: 1rem;
        align-self: center;
        border-radius:1.5rem;
        max-width: 800px;
    }
    .about-person{
        margin: 0 auto;
        margin-top: 1rem;
        max-width: 800px;
        display: flex;
        flex-direction: column;
    }
`
export default Wrapper;