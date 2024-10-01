import React from "react";
import Grid from "@mui/material/Grid";

import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import FormPhoneNumber from "App/core/hook-form/FormPhoneNumber";

import { useReactHookFormContext } from "App/core/hook-form/useReactHookForm";

const AddressForm = () => {
    const country = JSON.parse(localStorage.getItem("country"));

    const { setValue } = useReactHookFormContext();

    const countryMap = country.map((data) => ({
        value: data.iso3,
        label: data.country,
    }));

    const convertCode = (iso3) => {
        const result = country.filter((data) => data.iso3 === iso3);
        if (result) {
            setValue("phone_country_code", result[0]?.phone_code);
            setValue("phone_code_regex", result[0]?.phone_regex);
            return result[0].phone_code;
        }
    };

    const convertCurrency = (iso3) => {
        const currency = country.filter((data) => data.iso3 === iso3);
        if (currency) {
            return currency[0].currency;
        }
    };

    const handleCurrency = (e) => {
        setValue("currency", convertCurrency(e.target.value));
        setValue("phone_country_code", convertCode(e.target.value));
    };

    return (
        <Grid container spacing="16px">
            <Grid item xs={12} md={6} lg={3}>
                <FormSelect name="country" label="Beneficary Country" onChange={handleCurrency} options={countryMap} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormTextField name="unit" label="Postal Code (Optional)" type="number" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormTextField name="state" label="State / Province" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormTextField name="city" label="City / Town" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormTextField name="street" label="Street" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormPhoneNumber dialingCodeName="phone_country_code" name="mobile_number" label="Phone Number" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormDatePicker name="date_of_birth" label="Date of Birth" />
            </Grid>
        </Grid>
    );
};

export default AddressForm;
