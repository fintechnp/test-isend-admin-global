import { useSelector } from "react-redux";
import React, { Suspense, useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import Drawer from "../../components/Drawer";
import Loading from "App/components/Loading";
import CircularProgress from "App/components/Loading/CircularProgress";

import { AuthContext } from "../../auth";
import Center from "App/components/Center/Center";
import { getIntendedPath, removeIntendedPath, preserveIntendedPath } from "App/routes";

const PrivateLayout = () => {
    const navigate = useNavigate();

    const { loading: isLoadingUserMensAndPermissions } = useSelector((state) => state.get_user_menus_and_permissions);

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
                {isLoadingUserMensAndPermissions ? (
                    <Center sx={{ height: "90svh" }}>
                        <CircularProgress />
                    </Center>
                ) : (
                    <Outlet />
                )}
            </Suspense>
        </Drawer>
    );
};

export default PrivateLayout;
