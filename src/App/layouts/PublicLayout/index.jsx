import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AuthUtility from "App/utils/AuthUtility";

const PublicLayout = () => {
    useEffect(() => {
        AuthUtility.logOut();
    }, []);

    return <Outlet />;
};

export default PublicLayout;
