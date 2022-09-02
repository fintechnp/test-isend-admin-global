import Login from "../pages/Login";
import EmailVerification from "../pages/EmailVerification";
import ResetPassword from "../pages/ResetPassword";

const publicRoutes = [
    { path: "/login", component: <Login /> },
    { path: "/click/:code/:message", component: <EmailVerification /> },
    { path: "/reset/:user_id/:code/:string", component: <ResetPassword /> },
];

export default publicRoutes;
