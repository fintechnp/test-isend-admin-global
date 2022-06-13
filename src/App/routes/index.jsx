import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

import showToast from "../components/Toast";
import { publicRoutes } from "../../Public";
import PrivateArea from "../components/PrivateArea";

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
            {publicRoutes.map((route) => (
                <Route
                    path={route.path}
                    element={route.component}
                    key={route.path}
                />
            ))}
            <Route path={"*"} element={<PrivateArea />} />
        </Routes>
    );
};

export default MainRoutes;
