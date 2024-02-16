import styled from "styled-components";

const Wrapper = styled.main`
        min-height: 700px;
        width:100%;
        height: 100%;
        display: flex;
        place-items: center;
        justify-content: center;
    .label-password{
        font-size: 1.3rem;
    }
    form{
        display: flex;
        flex-direction:column;
        gap: 1rem;
    }
    input{
        font-size: 1.3rem;
    }
    button{
        font-size: 1.3rem;
    }
`
export default Wrapper;