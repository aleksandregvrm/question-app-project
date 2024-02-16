import Wrapper from '../wrappers/FooterWrapper';

const Footer = () => {
  return (
    <Wrapper>
      <div className="footer-header">
        <h2>Georgian Quiz App</h2>
        <p className='footer-text'>
                  🧠 Test your knowledge with our fun quizzes! Explore, learn, and challenge yourself. Knowledge is power, and the journey to wisdom begins here. Happy quizzing! 🌐✨
        </p>
      </div>
      <div className="message-admin">
        <h3>Message Admin</h3>
        <form>
            <textarea name="" id=""></textarea>
            <button className='btn'>Send</button>
        </form>
      </div>
    </Wrapper>
  )
}

export default Footer