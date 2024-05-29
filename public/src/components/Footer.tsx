import Wrapper from '../wrappers/FooterWrapper';
import NavLinks from './NavLinks';

const currentDate = new Date().getFullYear();
const Footer = () => {
  return (
    <Wrapper>
      <div className="footer-header">
        <h2>Georgian Quiz App</h2>
        <span className='copy-text'>All rights reserved &copy;  {currentDate}</span>
        <NavLinks/>
      </div>
      <div className="message-admin">
        <h3>Message Us</h3>
         <form>
            <textarea name="" id=""></textarea>
            <button className='btn'>Send</button>
        </form> 
      </div>
    </Wrapper>
  )
}

export default Footer