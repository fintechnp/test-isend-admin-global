import React, { useCallback, useEffect } from "react";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import MuiPaper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import SelectField from "App/components/Fields/SelectField";
import { yupResolver } from "@hookform/resolvers/yup";

import HookFom from "App/core/hook-form/HookForm";
import SubmitButton from "App/components/Button/SubmitButton";

import FormTextField from "App/core/hook-form/FormTextField";
import { ReactComponent as Logo } from "assets/long-logo.svg";

import sendingCountries from "Private/config/sendingCountries";
import { localStorageGet, localStorageSave } from "App/helpers/localStorage";
import CountriesSelectFilter from "Private/components/country-states/CountriesSelectFilter";
import FormSelect from "App/core/hook-form/FormSelect";
import { Watch } from "@mui/icons-material";

const Paper = styled(MuiPaper)(({ theme }) => ({
    minWidth: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(90deg, rgba(12,12,150,1) 16%, rgba(114,107,236,1) 50%, rgba(0,212,255,1) 100%)",
}));

const FormContainer = styled("div")(({ theme }) => ({
    padding: "16px 20px",
    paddingBottom: "30px",
    maxWidth: "300px",
    backgroundColor: "#fcfcfc",
    borderRadius: "6px",
    [theme.breakpoints.up("sm")]: {
        minWidth: "340px",
    },
    boxShadow: "10px 0px 8px 5px rgba(0, 0, 0, .1)",
    "&:hover": {
        boxShadow: "10px 0px 20px 5px rgba(0, 0, 0, .2)",
    },
}));

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
    selectedCountry: Yup.string().required("Country is required"),
});

const LoginForm = ({ onSubmit, loading }) => {
    const methods = useForm({
        resolver: yupResolver(schema),
    });

    const handleCountryChange = useCallback((event) => {
        localStorageSave("loginCountry", event.target.value);
    }, []);

    const loginCountry = methods.watch("selectedCountry");

    useEffect(() => {
        if (loginCountry) localStorageSave("loginCountry", loginCountry);
    }, [loginCountry]);

    return (
        <Paper square={true}>
            <FormContainer>
                <HookFom onSubmit={onSubmit} {...methods}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        <Logo style={{ height: "100px" }} />
                        <Typography textAlign="center" variant="h6">
                            Sign In to your account
                        </Typography>

                        <FormSelect name="selectedCountry" label="Select Country" options={sendingCountries} />

                        <FormTextField size="small" name="email" label="Email" />
                        <FormTextField size="small" type="password" name="password" label="Password" />
                        <SubmitButton size="large" isLoading={loading} role="button" name="login">
                            {loading ? "Logging In" : "Login"}
                        </SubmitButton>
                    </Box>
                </HookFom>
            </FormContainer>
        </Paper>
    );
};

export default LoginForm;
