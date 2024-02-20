import Wrapper from "../wrappers/AboutWrapper"
import LibraryIMG from "../assets/about-library.png";
import AvatarPersonIMG from "../assets/library-preson.png"

const About = () => {
    return (
        <Wrapper>
            <section className="about-text">
                <h2>About us....</h2>
                <p>The Georgian Quiz App is an innovative and engaging platform designed for individuals of all backgrounds and ages who are eager to test and expand their knowledge. Our app aims to create a dynamic space where users can embark on a journey of learning and self-discovery through a variety of quizzes covering a wide range of topics.</p>
                <p>At the heart of our platform is the belief that knowledge is a powerful tool that empowers individuals to navigate and understand the world around them. Whether you're a student looking to reinforce your academic understanding, a professional seeking to broaden your expertise, or simply someone with a curious mind eager for intellectual challenges, the Georgian Quiz App is designed to cater to all.</p>
                <p>Our extensive quiz library spans diverse subjects, including science, history, arts, culture, and more. With carefully crafted questions and interactive features, we ensure that each quiz provides not only an opportunity for assessment but also an engaging and enjoyable learning experience. The platform is designed to be user-friendly, making it accessible for both seasoned quiz enthusiasts and newcomers alike.
                </p>
                <p>One of the distinctive features of the Georgian Quiz App is its commitment to fostering a sense of community and friendly competition. Users can challenge their friends, family, or even global participants, creating a lively and interactive atmosphere. The app also encourages users to share their quiz results and achievements on social media, promoting a culture of continuous learning and knowledge sharing.</p>
                <p>
                    Accessibility is a key aspect of our platform. The Georgian Quiz App is designed to be accessible on various devices, allowing users to enjoy quizzes anytime, anywhere. Whether you prefer short quizzes during your coffee break or longer sessions at home, our app is adaptable to your schedule and preferences.
                </p>
                <p>In summary, the Georgian Quiz App is not just a platform for testing knowledge; it's a vibrant community where curiosity is celebrated, and learning is a lifelong adventure. Join us on this exciting journey to explore, discover, and challenge yourself intellectually. Together, let's make the pursuit of knowledge a fun and engaging experience for everyone.</p>
                <img className="about-img-library" alt="Libary image" srcSet={LibraryIMG} />
            </section>
            <section className="about-person">
                <p>
                ...Here you embody the spirit of Wan Shi Tong, the knowledge-seeking spirit from Avatar: The Last Airbender, who chose to remain in the vast library during the events of season two. Just like Wan Shi Tong, you have decided to immerse yourself in endless knowledge rather than follow Katara, Sokka, and Aang out of the library.
                </p>
                <p>
                In this app, every user is akin to Wan Shi Tong, pursued by the eternal abyss of the unknown. Each quiz you engage in represents your journey through the vast expanse of knowledge, delving deeper into topics and subjects that intrigue you. As you answer questions and explore various categories, you are not only testing your existing knowledge but also expanding your understanding of the world around you.
                </p>
                <p>
                Just like Wan Shi Tong guarded his library fiercely, you too can guard your newfound knowledge by continually challenging yourself and striving to learn more. So, embark on your quest for enlightenment with the Georgian Quz App, and let the pursuit of knowledge guide you on your journey through the endless depths of curiosity.
                </p>
                <img srcSet={AvatarPersonIMG} alt="avatar person" className="about-img-library"/>
            </section>
        </Wrapper>
    )
}
export default About