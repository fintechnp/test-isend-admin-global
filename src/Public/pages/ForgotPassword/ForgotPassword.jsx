import React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import Column from "App/components/Column/Column";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import FormContainer from "Public/components/container/FormContainer";
import PublicLayoutContainer from "../components/PublicLayoutContainer";

import { ForgotPasswordActions } from "./store";
import { publicRoutePaths } from "Public/config/pubicRoutePaths";

function ForgotPassword() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const state = useSelector((state) => state.forgot_password);

    const { loading, success: isSuccess, response, error } = state;

    const message = response?.message;

    const handleSubmit = async (data) => {
        dispatch(ForgotPasswordActions.forgotPassword(data));
    };

    const handleGoBack = () => {
        dispatch(ForgotPasswordActions.resetForgotPassword());
        navigate(publicRoutePaths.login);
    };

    return (
        <PublicLayoutContainer>
            <FormContainer title={isSuccess ? "" : "Forgot Password"} disableBadge>
                {error && <Alert severity="error">{error?.message}</Alert>}
                {isSuccess ? (
                    <Column>
                        <Alert severity="success">{message}</Alert>
                        <Button
                            variant="text"
                            size="large"
                            startIcon={<ArrowBackRoundedIcon />}
                            onClick={handleGoBack}
                            sx={{
                                color: (theme) => theme.palette.text.primary,
                                mt: "8px",
                            }}
                            fullWidth
                        >
                            Back to login
                        </Button>
                    </Column>
                ) : (
                    <ForgotPasswordForm onSubmit={handleSubmit} isSubmitting={loading} />
                )}
            </FormContainer>
        </PublicLayoutContainer>
    );
}

export default ForgotPassword;
