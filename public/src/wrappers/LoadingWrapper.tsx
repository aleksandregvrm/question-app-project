import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const Wrapper = styled.div`
width: 100%;
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
  }
  .loading-spinner {
    border: 15px solid var(--primary-white);
    border-top: 15px solid var(--primary-black);
    border-radius: 50%;
    width: 100px;
    height: 100px;
    animation: ${spin} 0.5s linear infinite;
  }
`;
export default Wrapper;