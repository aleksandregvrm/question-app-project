import styled from "styled-components";
import footerImg from "../assets/animation-library.png";

const Wrapper = styled.footer`
margin-top: 2rem;
  padding: 1rem;
  position: relative;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${footerImg});
  background-size: cover;
  h2 {
    color: var(--primary-white);
    background: var(--primary-black);
    border-radius: 10px;
  }
  .footer-header {
    text-align: center;
    opacity: 0.8;
  }
  .message-admin {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0.5rem;
    text-align: center;
    margin-top: 1rem;
  }
  .message-admin textarea {
    background: transparent;
    outline: none;
    color: var(--primary-white);
    font-size: 1.1rem;
    width: 100%;
    height: 150px;
    border-radius: 1.5rem;
    padding: 0.5rem;
    border: 0.5px solid var(--primary-white);
  }
  .footer-text {
    display: none;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-top: 0.5rem;
    align-items: center;
  }
  h3 {
    color: var(--primary-white);
  }
  button {
    background: none;
    border: 0.5px solid var(--primary-white);
    width: 200px;
    &:hover {
      background: var(--primary-black);
      color: var(--primary-white);
    }
  }
  @media screen and (min-width: 890px) {
    background-size: contain;
    h2 {
      background: none;
    }
    .footer-text {
      padding: 0 0.2rem;
      display: inline-block;
      transition: var(--transition);
      &:hover {
        background: var(--primary-white);
      }
      border-radius: 1.5rem;
    }
    .message-admin textarea {
      width: 50%;
      padding: 1rem;
    }
    h3{
        align-self: center;
        width: 200px;
        transition: var(--transition);
        border-radius: 1.5rem;
        color: var(--primary-black);
        &:hover{
          background: var(--primary-white);
        }
    }
  }
`;
export default Wrapper;
