import * as yup from "yup";
import { Alert, AlertTitle, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import FormTextField from "App/core/hook-form/FormTextField";
import { changePasswordActions as actions } from "../../store";
import { CommonAction } from "Common/store";
import { AddButton, CancelButton } from "Private/components/AllButtons/Buttons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const changePasswordSchema = yup.object().shape({
    current_password: yup.string().required("Old Password is required"),
    new_password: yup.string().required("New Password is required"),
    confirm_password: yup.string().oneOf([yup.ref("new_password"), null], "Passwords must match"),
});

export const ChangePasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { success, loading } = useSelector((state) => state.change_password);
    const { loading: logoutLoading, success: logoutSuccess } = useSelector((state) => state.logout);
    const methods = useForm({
        defaultValues: {
            current_password: "",
            new_password: "",
            confirm_password: "",
        },
        resolver: yupResolver(changePasswordSchema),
    });

    useEffect(() => {
        if (success) {
            dispatch(CommonAction.log_out());
            if (logoutSuccess) {
                navigate("/login");
                Cookies.remove("token");
                Cookies.remove("refresh_token");
            }
        }
    }, [success, loading, logoutSuccess, logoutLoading]);

    const handleSubmit = (data) => {
        dispatch(actions.change_password(data));
    };
    return (
        <>
            <Alert
                severity="warning"
                sx={{
                    marginY: "1rem",
                }}
            >
                You will be logged out after changing password.
            </Alert>
            <HookForm onSubmit={handleSubmit} {...methods}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <FormTextField size="0.8rem" type="password" name="current_password" label="Current Password" />
                    </Grid>
                    <Grid item xs={12}>
                        <FormTextField size="0.8rem" type="password" name="new_password" label="New Password" />
                    </Grid>
                    <Grid item xs={12}>
                        <FormTextField size="0.8rem" type="password" name="confirm_password" label="Confirm Password" />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction="row" justifyContent="flex-end" columnSpacing={2}>
                            <Grid item>
                                <AddButton
                                    size="small"
                                    variant="outlined"
                                    type="submit"
                                    disabled={logoutLoading || loading || logoutSuccess || success}
                                >
                                    {logoutLoading || loading ? "Changing Password" : " Change Password"}
                                </AddButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </HookForm>
        </>
    );
};
