import Login from "../pages/Login";
import EmailVerification from "../pages/EmailVerification";
import ResetPassword from "../pages/ResetPassword";
import { publicRoutePaths } from "./pubicRoutePaths";
import ForgotPassword from "Public/pages/ForgotPassword";

export const guestRoutes = [
    { path: "/login", component: <Login title="Login" /> },
    {
        path: publicRoutePaths.forgotPassword,
        component: <ForgotPassword />,
    },
];

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
