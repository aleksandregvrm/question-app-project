import styled from "styled-components";

const Wrapper = styled.main`
    padding: 1rem;
    .categories{
      margin-top: 2rem;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.2rem;
    }
    .category{
        width: 250px;
        height: 250px;
        object-fit: cover;
        cursor: pointer;
        border: 1px solid var(--primary-black);
    }
    
`
export default Wrapper;