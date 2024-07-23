import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import MuiPaper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import SubmitButton from "App/components/Button/SubmitButton";

import sendingCountries from "Private/config/sendingCountries";
import BaseUrlConfiguration from "App/lib/BaseUrlConfiguration";
import { publicRoutePaths } from "Public/config/pubicRoutePaths";

const schema = Yup.object().shape({
    email: Yup.string()
        .email("Enter a valid email address")
        .required("Email address is required")
        .typeError("Enter an email address"),
});

export default function ForgotPasswordForm({ onSubmit, isSubmitting }) {
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            identifier: BaseUrlConfiguration.getDefaultSendingCountryIso3(),
        },
    });

    const { watch } = methods;

    const navigate = useNavigate();

    const loginCountry = watch("identifier");

    useEffect(() => {
        if (loginCountry) {
            BaseUrlConfiguration.saveCountry(loginCountry);
        } else {
            BaseUrlConfiguration.removeCountry();
        }
    }, [loginCountry]);

    return (
        <HookForm {...methods} onSubmit={onSubmit}>
            <Grid container gap="24px">
                <Grid item xs={12}>
                    <FormSelect size="medium" name="identifier" label="Select Country" options={sendingCountries} />
                </Grid>
                <Grid item xs={12}>
                    <FormTextField size="medium" name="email" label="Email" />
                </Grid>
                <Grid item xs={12}>
                    <SubmitButton size="large" isLoading={isSubmitting} fullWidth>
                        Reset Password
                    </SubmitButton>
                    <Button
                        variant="text"
                        size="large"
                        startIcon={<ArrowBackRoundedIcon />}
                        onClick={() => navigate(publicRoutePaths.login)}
                        sx={{
                            color: (theme) => theme.palette.text.primary,
                            mt: "8px",
                        }}
                        fullWidth
                    >
                        Back to login
                    </Button>
                </Grid>
            </Grid>
        </HookForm>
    );
}
