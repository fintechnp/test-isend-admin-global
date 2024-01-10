import Login from "../pages/Login";
import EmailVerification from "../pages/EmailVerification";
import ResetPassword from "../pages/ResetPassword";

export const guestRoutes = [{ path: "/login", component: <Login title="Login" /> }];

export const publicRoutes = [
    {
        path: "/click/:code/:message",
        component: <EmailVerification title="Account Verification" />,
    },
    {
        path: "/reset/:user_id/:code/:string",
        component: <ResetPassword title="Password Reset" />,
    },
];
