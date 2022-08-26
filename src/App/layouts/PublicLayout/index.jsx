import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthConsumer } from "../../auth";

const PublicLayout = () => (
    <AuthConsumer>
        {(authContext) =>
            !(authContext && authContext.isUserLoggedIn) ? (
                <>
                    <Outlet />
                </>
            ) : (
                <Navigate to="/" replace />
            )
        }
    </AuthConsumer>
);

export default PublicLayout;
