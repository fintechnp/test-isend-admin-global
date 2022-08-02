import Login from "../pages/Login";
import EmailVerification from "../pages/EmailVerification";

const publicRoutes = [
    { path: "/login", component: <Login /> },
    { path: "/click/:code/:message", component: <EmailVerification /> },
];

export default publicRoutes;
