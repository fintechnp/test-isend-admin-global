import React from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import HookForm from "App/core/hook-form/HookForm";
import FormTextField from "App/core/hook-form/FormTextField";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import FormSelectCountry from "App/core/hook-form/FormSelectCountry";

const schema = Yup.object().shape({
    country: Yup.string().required("Select a country"),
    phone_country_code: Yup.string().required(""),
    mobile_number: Yup.string().required("Enter a mobile number").matches(/^\d*$/, "Invalid phone number").max(14),
    email: Yup.string().email().required("Email is required"),
});

const CustomerAccountForm = ({ onSubmit, isProcessing, onCancel }) => {
    const { initial_form_state } = useSelector((state) => state.update_customer_account);

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: initial_form_state,
    });

    const { setValue, getValues } = methods;

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Grid container rowSpacing={1} columnSpacing={2}>
                <Grid item xs={13} sm={6} md={4}>
                    <FormSelectCountry
                        name="country"
                        label="Country"
                        onSelected={(c) => {
                            setValue("phone_country_code", c?.phone_code ?? "");
                        }}
                    />
                </Grid>
                <Grid item xs={13} sm={6} md={4}>
                    <Box display="flex">
                        <Box
                            sx={{
                                border: (theme) => `1px solid ${theme.palette.grey[500]}`,
                                px: 1,
                                borderRadius: "4px",
                            }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {getValues("phone_country_code")}
                        </Box>
                        <FormTextField name="mobile_number" label="Mobile Number" />
                    </Box>
                </Grid>
                <Grid item xs={13} sm={6} md={4}>
                    <FormTextField name="email" label="Email" />
                </Grid>
                <Grid item xs={12}>
                    <ButtonWrapper>
                        <CancelButton onClick={onCancel}>Cancel</CancelButton>
                        <SubmitButton isLoading={isProcessing} isAddMode={false} />
                    </ButtonWrapper>
                </Grid>
            </Grid>
        </HookForm>
    );
};

export default CustomerAccountForm;

CustomerAccountForm.propTypes = {
    isAddMode: PropTypes.bool,
    onCancel: PropTypes.func,
    isProcessing: PropTypes.bool,
};
