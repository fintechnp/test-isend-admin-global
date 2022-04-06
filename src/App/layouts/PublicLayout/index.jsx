import React from "react";
import { Navigate } from "react-router-dom";
import { AuthConsumer } from "../../auth";

const PublicLayout = ({ children }) => (
    <AuthConsumer>
        {(authContext) =>
            !(authContext && authContext.isUserLoggedIn) ? (
                <>{children}</>
            ) : (
                <Navigate to="/" />
            )
        }
    </AuthConsumer>
);

export default PublicLayout;
