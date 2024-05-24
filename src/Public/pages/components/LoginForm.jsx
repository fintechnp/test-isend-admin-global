import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import Link from "App/components/Link/Link";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import SubmitButton from "App/components/Button/SubmitButton";

import sendingCountries from "Private/config/sendingCountries";
import BaseUrlConfiguration from "App/lib/BaseUrlConfiguration";
import { publicRoutePaths } from "Public/config/pubicRoutePaths";

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
    identifier: Yup.string().required("Country is required"),
});

const LoginForm = ({ onSubmit, loading }) => {
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            identifier: BaseUrlConfiguration.getDefaultSendingCountryIso3(),
        },
    });

    const { watch, control } = methods;

    const loginCountry = watch("identifier");

    useEffect(() => {
        if (loginCountry) {
            BaseUrlConfiguration.saveCountry(loginCountry);
        } else {
            BaseUrlConfiguration.removeCountry();
        }
    }, [loginCountry]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container gap="24px">
                    <Grid item xs={12} mt={2}>
                        <FormSelect size="medium" name="identifier" label="Select Country" options={sendingCountries} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormTextField size="medium" name="email" label="Email" />
                    </Grid>
                    <Grid item xs={12}>
                        <FormTextField size="medium" type="password" name="password" label="Password" />
                        <Link to={publicRoutePaths.forgotPassword}>
                            <Typography fontWeight={500} fontSize="0.813rem" lineHeight="1.875">
                                Forgot Password ?
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={12} mt={2}>
                        <SubmitButton
                            size="large"
                            isLoading={loading}
                            role="button"
                            name="login"
                            sx={{ textTransform: "uppercase" }}
                            fullWidth
                        >
                            {loading ? "Logging In" : "Login"}
                        </SubmitButton>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
};

export default LoginForm;
