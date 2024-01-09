import Cookies from "js-cookie";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, Suspense } from "react";

import showToast from "../components/Toast";
import { publicRoutes } from "../../Public";
import { privateRoutes } from "../../Private";
import PageNotFound from "../components/PageNotFound";
import { PublicLayout, PrivateLayout } from "../layouts";

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
                {publicRoutes.map((route, i) => (
                    <Route key={i} path={route.path} element={route.component} />
                ))}
            </Route>
            <Route element={<PrivateLayout />}>
                {privateRoutes.map((route, i) => (
                    <Route key={i} path={route.path} element={route.component} />
                ))}
                <Route path="*" element={<PageNotFound title="Page Not Found" />} />
            </Route>
        </Routes>
    );
};

export default MainRoutes;

export const preserveIntendedPath = () => {
    const { pathname, search } = window.location;
    const intendedPath = pathname + search;
    sessionStorage.setItem("intendedPath", intendedPath);
};

export const getIntendedPath = () => {
    return sessionStorage.getItem("intendedPath");
};

export const removeIntendedPath = () => {
    sessionStorage.removeItem("intendedPath");
};
