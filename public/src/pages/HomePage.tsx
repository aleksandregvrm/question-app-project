import Wrapper from "../wrappers/HomePageWrapper";
import leaderboardImg from "../assets/leaderboard.png";
import boxesImg from "../assets/boxes.png";

const HomePage = () => {
  return (
    <Wrapper>
    <section className="home-text">
      <h2>Georgian Quiz App is...</h2>
        <p>The Georgian Quiz App is an innovative and engaging platform designed for individuals of all backgrounds and ages who are eager to test and expand their knowledge. Our app aims to create a dynamic space where users can embark on a journey of learning and self-discovery through a variety of quizzes covering a wide range of topics.</p>
        <p>At the heart of our platform is the belief that knowledge is a powerful tool that empowers individuals to navigate and understand the world around them. Whether you're a student looking to reinforce your academic understanding, a professional seeking to broaden your expertise, or simply someone with a curious mind eager for intellectual challenges, the Georgian Quiz App is designed to cater to all.</p>
        <p>Our extensive quiz library spans diverse subjects, including science, history, arts, culture, and more. With carefully crafted questions and interactive features, we ensure that each quiz provides not only an opportunity for assessment but also an engaging and enjoyable learning experience. The platform is designed to be user-friendly, making it accessible for both seasoned quiz enthusiasts and newcomers alike.
        </p>
        <p>One of the distinctive features of the Georgian Quiz App is its commitment to fostering a sense of community and friendly competition. Users can challenge their friends, family, or even global participants, creating a lively and interactive atmosphere. The app also encourages users to share their quiz results and achievements on social media, promoting a culture of continuous learning and knowledge sharing.</p>
        <p>
          Accessibility is a key aspect of our platform. The Georgian Quiz App is designed to be accessible on various devices, allowing users to enjoy quizzes anytime, anywhere. Whether you prefer short quizzes during your coffee break or longer sessions at home, our app is adaptable to your schedule and preferences.
        </p>
        <p>In summary, the Georgian Quiz App is not just a platform for testing knowledge; it's a vibrant community where curiosity is celebrated, and learning is a lifelong adventure. Join us on this exciting journey to explore, discover, and challenge yourself intellectually. Together, let's make the pursuit of knowledge a fun and engaging experience for everyone.</p>
    </section>
    <section className="leaderboard-home">
      <h2>Leaderboard...</h2>
      <div className="leaderboard-photo">
          <img alt="Leaderboard photo" srcSet={leaderboardImg} />
          <p>
            The leaderboard system in our Georgian Quiz App adds a competitive edge, allowing users to compare their quiz performance with others globally. As users participate and excel in quizzes, their scores contribute to an interactive leaderboard. The system ranks participants based on their accuracy, speed, and overall quiz achievements. It not only fosters healthy competition but also motivates users to continuously enhance their knowledge and quiz-taking skills. The leaderboard is dynamically updated, providing real-time insights into top performers, creating a spirited atmosphere of camaraderie, and encouraging users to climb the ranks. It's a feature designed to celebrate achievements and inspire ongoing engagement.
          </p>
      </div>
    </section>
    <section className="prizes-home">
      <h2>Prizes that you can win...</h2>
      <div className="prizes-photo">
        <img srcSet={boxesImg} alt="" />
          <p>Our Georgian Quiz App rewards excellence with exciting prizes for the top three players on the leaderboard. The first-place achiever is crowned the Quiz Master, receiving a prestigious trophy, a certificate of achievement, and exclusive access to premium quiz content. The second and third-place winners are recognized as Quiz Champions, earning personalized certificates and access to special quizzes. These prizes not only celebrate intellectual prowess but also add an extra layer of motivation for users to strive for the top positions. It's our way of appreciating dedication, knowledge, and competitive spirit within our vibrant quiz community.</p>
      </div>
    </section>
    </Wrapper>
  )
}

export default HomePage