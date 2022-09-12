import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

import { PublicLayout, PrivateLayout } from "../layouts";
import showToast from "../components/Toast";
import PageNotFound from "../components/PageNotFound";
import { publicRoutes } from "../../Public";
import { privateRoutes } from "../../Private";

const MainRoutes = ({ setMode }) => {
    const dispatch = useDispatch();
    const token = Cookies.get("token");
    const mode = useSelector((state) => state.change_theme?.mode);
    const { response: toast_data } = useSelector((state) => state.toast);

    useEffect(() => {
        setMode(mode);
    }, []);

    useEffect(() => {
        if (toast_data?.message) {
            showToast(toast_data);
            dispatch({ type: "RESET_TOAST_DATA" });
        }
    }, [toast_data]);

    useEffect(() => {
        if (token) {
            setMode(mode);
        }
    }, [mode]);

    return (
        <Routes>
            <Route element={<PublicLayout />}>
                {publicRoutes.map((route) => (
                    <Route
                        path={route.path}
                        element={route.component}
                        key={route.path}
                    />
                ))}
            </Route>
            <Route element={<PrivateLayout />}>
                {privateRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.component}
                    />
                ))}
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
};

export default MainRoutes;
