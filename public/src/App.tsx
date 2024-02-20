import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {HomeLayout,HomePage,Profile,Authorization,Verification,ResetPassword,Leaderboard,AddQuestion,About,AllQuestions} from "./pages";
import Error from "./errors/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <Error />,
      },
      {
        path:"profile",
        element:<Profile/>,
        errorElement:<Error/>
      },
      {
        path:"authorization",
        element:<Authorization/>,
        errorElement:<Error/>
      },
      {
        path:"user/verify-email",
        element:<Verification/>,
        errorElement:<Error/>
      },
      {
        path:"user/reset-password",
        element:<ResetPassword/>,
        errorElement:<Error/>
      },
      {
        path:"leaderboard",
        element:<Leaderboard/>,
        errorElement:<Error/>
      },
      {
        path:"add-question",
        element:<AddQuestion/>,
        errorElement:<Error/>
      },
      {
        path:"all-questions",
        element:<AllQuestions/>,
        errorElement:<Error/>
      },
      {
        path:"about",
        element:<About/>,
        errorElement:<Error/>
      },
    ],
  },
]);
const App = () => {
  return (
    <RouterProvider router={router} />
  );
};
export default App;