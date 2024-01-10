

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthConsumer } from "../../auth";

const GuestLayout = () => (
    <AuthConsumer>
        {(authContext) => {
            return !(authContext && authContext.isUserLoggedIn) ? (
                <>
                    <Outlet />
                </>
            ) : (
                <Navigate to="/" replace />
            );
        }}
    </AuthConsumer>
);

export default GuestLayout;
