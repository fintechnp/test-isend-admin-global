import React, { useState, useEffect, useContext } from "react";
import { SubmissionError, reset } from "redux-form";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";

import { PublicLayout } from "../../../App/layouts";
import { AuthContext } from "../../../App/auth";
import LoginForm from "../components/LoginForm";
import actions from "../../../Common/store/actions";

function Login() {
    const dispatch = useDispatch();
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const {
        response: user,
        success,
        loading: user_loading,
    } = useSelector((state) => state.get_user);

    useEffect(() => {
        dispatch(reset("login_form"));
        dispatch({ type: "REFRESH_TOKEN_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            authContext.setUserData(user?.data);
        }
    }, [success]);

    const handleLogin = async (data) => {
        setLoading(true);
        try {
            const res = await authContext.loginUser(data);
            if (res) {
                authContext.setToken(res.token);
                Cookies.set("refreshToken", res.refresh_token);
                dispatch(actions.get_user());
                dispatch(actions.get_all_country());
                dispatch(
                    actions.get_all_reference({
                        page_number: 1,
                        page_size: 100,
                    })
                );
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            dispatch({
                type: "SET_TOAST_DATA",
                data: err?.data,
            });
            if (err) {
                throw new SubmissionError({
                    password: err.data.message,
                });
            }
        }
    };

    return (
        <PublicLayout>
            <LoginForm
                onSubmit={handleLogin}
                loading={loading || user_loading}
            />
        </PublicLayout>
    );
}

export default Login;
