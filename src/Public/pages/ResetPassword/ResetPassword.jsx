import { reset } from "redux-form";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import isEmpty from "App/helpers/isEmpty";
import ResetForm from "../components/ResetForm";
import actions from "../../../Common/store/actions";
import PageNotFound from "App/components/PageNotFound";
import PublicLayoutContainer from "../components/PublicLayoutContainer";

function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user_id, code } = useParams();

    const [searchParams] = useSearchParams();

    const apiBaseUrl = atob(searchParams.get("base_url") ?? "").replace("http://", "https://");

    let { success, loading } = useSelector((state) => state.reset_password);

    if (isEmpty(apiBaseUrl)) return <PageNotFound />;

    useEffect(() => {
        dispatch(reset("reset_password_form"));
        dispatch({ type: "PASSWORD_RESET_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            navigate("/");
            dispatch({ type: "PASSWORD_RESET_RESET" });
        }
    }, [success]);

    const handleReset = (data) => {
        data.code = code;
        data.user_id = user_id;
        dispatch(
            actions.reset_password({
                ...data,
                api_base_url: apiBaseUrl,
            }),
        );
    };

    return (
        <PublicLayoutContainer>
            <ResetForm onSubmit={handleReset} loading={loading} />
        </PublicLayoutContainer>
    );
}

export default ResetPassword;
