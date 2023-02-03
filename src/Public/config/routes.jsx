import Login from "../pages/Login";
import EmailVerification from "../pages/EmailVerification";
import ResetPassword from "../pages/ResetPassword";

const publicRoutes = [
  { path: "/login", component: <Login title="Login" /> },
  {
    path: "/click/:code/:message",
    component: <EmailVerification title="Account Verification" />,
  },
  {
    path: "/reset/:user_id/:code/:string",
    component: <ResetPassword title="Password Reset" />,
  },
];

export default publicRoutes;
