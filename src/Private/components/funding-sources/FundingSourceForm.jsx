import * as Yup from "yup";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormCheckbox from "App/core/hook-form/FormCheckbox";
import FormTextField from "App/core/hook-form/FormTextField";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import FormSelectCountry from "App/core/hook-form/FormSelectCountry";

const schema = Yup.object().shape({
    payment_name: Yup.string().required("Payment name is required").max(100, "Must be 100 characters or less"),
    payment_value: Yup.string().required("Payment Value is required").max(50, "Must be 50 characters or less"),
    funding_source_type: Yup.string().required("Funding Source Type is required"),
    country: Yup.string().required("Country is required"),
    currency: Yup.string(),
    description: Yup.string().required("Description is required").max(50, "Must be 50 characters or less"),
});

const FundingSourceType = [
    {
        label: "Individual",
        value: "individual",
    },
    {
        label: "Business",
        value: "business",
    },
    {
        label: "Both",
        value: "both",
    },
];

const FundingSourceForm = ({ onSubmit, isAddMode, isProcessing, onCancel, defaultValues }) => {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    const { setValue, control } = methods;
    const [isDisabled, setIsDisabled] = useState(true);
    const watchedValues = useWatch({ control });

    const handleChangeCountry = (selectedCountry) => {
        setValue("currency", selectedCountry.currency);
    };

    useEffect(() => {
        // Check if any field other than "funding_source_type" has changed
        const isChanged = Object.keys(watchedValues).some(
            (key) => key !== "funding_source_type" && watchedValues[key] !== defaultValues[key],
        );
        setIsDisabled(!isChanged);
    }, [watchedValues, defaultValues]);

    return (
        <HookForm onSubmit={methods.handleSubmit(onSubmit)} {...methods}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <FormTextField name="payment_name" label="Payment Name" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="payment_value" label="Payment Value" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormSelect
                        name="funding_source_type"
                        options={FundingSourceType}
                        label="Funding Source Type"
                        disabled={isDisabled}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormSelectCountry name="country" label="Country" onSelected={handleChangeCountry} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="currency" label="Currency" disabled />
                </Grid>
                <Grid item xs={12}>
                    <FormTextField name="description" label="Description" />
                </Grid>
                <Grid item xs={12}>
                    <ButtonWrapper>
                        <CancelButton onClick={onCancel} disabled={isProcessing}>
                            Cancel
                        </CancelButton>
                        <SubmitButton
                            type="submit"
                            isLoading={isProcessing}
                            isAddMode={isAddMode}
                            disabled={isDisabled}
                        />
                    </ButtonWrapper>
                </Grid>
            </Grid>
        </HookForm>
    );
};

export default FundingSourceForm;

FundingSourceForm.propTypes = {
    onSubmit: PropTypes.func,
    isAddMode: PropTypes.bool,
    onCancel: PropTypes.func,
    isProcessing: PropTypes.bool,
    defaultValues: PropTypes.object,
};
