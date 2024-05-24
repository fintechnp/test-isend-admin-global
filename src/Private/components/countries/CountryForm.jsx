import React from "react";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import Grid from "@mui/material/Grid";
import "react-quill/dist/quill.snow.css";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import FormHelperText from "@mui/material/FormHelperText";
import ModalGridFormContainer from "App/components/Container/ModalGridFormContainer";

import { useForm } from "react-hook-form";
import HookForm from "App/core/hook-form/HookForm";
import FormTextField from "App/core/hook-form/FormTextField";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import FormSelect from "App/core/hook-form/FormSelect";

const schema = Yup.object().shape({
    country_name: Yup.string().required("Country Name is required"),
    currency: Yup.string().required("Currency is required"),
    iso2: Yup.string().required("Iso2 is required"),
    iso3: Yup.string().required("Iso3 is required"),
    phone_code: Yup.string().required("Phone Code is required"),
    currency_name: Yup.string().required("Currency Name is required"),
    phone_regex: Yup.string().required("Phone Regex is required"),
    postcode_regex: Yup.string().required("PostCode is required"),
    has_state: Yup.string().required("State is required"),
});

const CountryForm = ({ initialValues, onSubmit, loading, handleClose, isAddMode }) => {
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialValues,
    });

    const hasStateValue = [
        {
            label: "True",
            value: true,
        },
        {
            label: "False",
            value: false,
        },
    ];

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12} md={6}>
                    <FormTextField name="country_name" label="Country Name" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="currency" label="Currency" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="iso2" label="Iso2" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="iso3" label="Iso3" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="phone_code" label="Phone Code" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="currency_name" label="Currency Name" />
                </Grid>{" "}
                <Grid item xs={12} md={6}>
                    <FormTextField name="phone_regex" label="Phone Regex" />
                </Grid>{" "}
                <Grid item xs={12} md={6}>
                    <FormTextField name="postcode_regex" label="PostCode" />
                </Grid>{" "}
                <Grid item xs={12} md={6}>
                    <FormSelect name="has_state" label="Has State ?" options={hasStateValue} />
                </Grid>
                <Grid item xs={12}>
                    <ButtonWrapper>
                        <CancelButton onClick={handleClose} disabled={loading}>
                            Cancel
                        </CancelButton>
                        <SubmitButton isLoading={loading} isAddMode={isAddMode} />
                    </ButtonWrapper>
                </Grid>
            </Grid>
        </HookForm>
    );
};

export default CountryForm;
