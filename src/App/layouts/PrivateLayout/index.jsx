
import React, { Suspense, useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import Drawer from "../../components/Drawer";
import Loading from "./../../../App/components/Loading";

import { AuthContext } from "../../auth";
import { getIntendedPath, removeIntendedPath, preserveIntendedPath } from "App/routes";

const PrivateLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const intendedPath = getIntendedPath();
        if (auth && auth.isUserLoggedIn && intendedPath) {
            removeIntendedPath();
            navigate(intendedPath);
        }
    }, []);

    const auth = useContext(AuthContext);

    if (auth && !auth.isUserLoggedIn) {
        preserveIntendedPath();
        return <Navigate to="/login" replace />;
    }

    return (
        <Drawer>
            <Suspense fallback={<Loading loading={true} />}>
                <Outlet />
            </Suspense>
        </Drawer>
    );
};

export default PrivateLayout;
