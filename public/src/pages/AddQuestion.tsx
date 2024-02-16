import Wrapper from '../wrappers/AddQuestionWrapper';
import { QuestionSubmitForm } from '../components';

const AddQuestion = () => {
  return (
    <Wrapper>
      <section className="instructions">
        <h2>Instructions</h2>
        <h3>Welcome to our Quizzing App!</h3>
        <p>
          Our Quizzing App allows users to create and participate in quizzes across various categories. To enhance the quizzing experience, we offer an opportunity for admin and question-guru users to contribute questions to the app. Below are detailed instructions on how to add questions:</p>
          <p>
          1. Accessing the Question Addition Feature:

          Admin Users: Upon logging in, admin users will find an exclusive admin panel accessible from the dashboard. Within the admin panel, navigate to the "Manage Questions" section.
          Question-Guru Users: Similarly, question-guru users will find a dedicated dashboard upon logging in. Within their dashboard, they can access the "Contribute Questions" section.
          </p>
         <p>
          2. Adding a New Question:

          Once in the "Manage Questions" or "Contribute Questions" section, locate the option to "Add New Question" and click on it.
          You will be prompted to fill in the following fields:
          Question Type/Category: Select the appropriate category for your question from the dropdown menu (e.g., History, Math, Science).
          Question Text: Enter the question you want to add to the quiz.
          Potential Answers: Provide 3-4 potential answers to the question.
          Correct Answer: Indicate the correct answer among the potential answers provided.
          Additional Details: Optionally, you may include any additional information related to the question.
          </p>
          <p>

          3. Submitting the Question:

          Once all required fields are filled, review the question details to ensure accuracy.
          Click on the "Submit" or "Add Question" button to add the question to the app's database.
          </p>
          <p>

          4. Managing Existing Questions (Admin Users Only):

          Admin users have the additional ability to manage existing questions, including editing or deleting them, from the admin panel.
          </p>
         <p>

          5. Feedback and Support:

          If you encounter any issues or have suggestions for improving the quizzing app, please don't hesitate to reach out to our support team. Your feedback is invaluable in helping us enhance the app's functionality and user experience.
         </p>
          <p>
          Thank you for contributing to our growing repository of quiz questions! Happy quizzing!</p>
      </section>
      <QuestionSubmitForm />
    </Wrapper>
  )
}
export default AddQuestion