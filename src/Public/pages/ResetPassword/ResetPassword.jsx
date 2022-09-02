import React, { useEffect } from "react";
import { reset } from "redux-form";
import { useSelector, useDispatch } from "react-redux";

import ResetForm from "../components/ResetForm";
import actions from "../../../Common/store/actions";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user_id, code } = useParams();
    const { success, loading } = useSelector((state) => state.reset_password);

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
        dispatch(actions.reset_password(data));
    };

    return <ResetForm onSubmit={handleReset} loading={loading} />;
}

export default ResetPassword;
