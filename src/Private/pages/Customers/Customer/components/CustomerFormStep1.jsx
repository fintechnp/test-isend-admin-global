import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";

import FormTextField from "App/core/hook-form/FormTextField";
import referenceTypeId from "Private/config/referenceTypeId";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import FormPhoneNumber from "App/core/hook-form/FormPhoneNumber";
import FormSelectCountry from "App/core/hook-form/FormSelectCountry";
import FormPartnerSelect from "App/core/hook-form/FormPartnerSelect";
import { useReactHookFormContext } from "App/core/hook-form/useReactHookForm";
import FormReferenceDataAutoComplete from "App/core/hook-form/FormReferenceDataAutoComplete";
import FormSelectRegistrationCountry from "App/core/hook-form/FormSelectRegistrationCountry";

import { UNITED_STATES_ISO3 } from "App/data/SendingCountry";

export default function CustomerFormStep1({ isAddMode }) {
    const { setValue, watch } = useReactHookFormContext();

    const registrationCountry = watch("country");

    return (
        <Grid container spacing="16px">
            {isAddMode && (
                <Grid item xs={12} md={6} lg={3}>
                    <FormSelectRegistrationCountry
                        name="country"
                        label="Registration Country"
                        onSelected={(country) => {
                            setValue("phone_country_code", country?.phone_code ?? "");
                            setValue("phone_code_regex", country?.phone_regex ?? "");
                            if (country?.phone_code?.toUpperCase() !== UNITED_STATES_ISO3) {
                                setValue("ssn_number", "");
                            }
                        }}
                        required
                    />
                </Grid>
            )}
            <Grid item xs={12} md={6} lg={3}>
                <FormTextField name="first_name" label="First Name" required />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormTextField name="middle_name" label="Middle Name" isOptional />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormTextField name="last_name" label="Last Name" required />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormReferenceDataAutoComplete
                    name="gender"
                    label="Gender"
                    referenceTypeId={referenceTypeId.genders}
                    valueKey="value"
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormDatePicker name="date_of_birth" label="Date of birth" disableFuture />
            </Grid>
            {isAddMode && (
                <>
                    <Grid item xs={12} md={6} lg={3}>
                        <FormPhoneNumber
                            dialingCodeName="phone_country_code"
                            name="mobile_number"
                            label="Mobile Number"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <FormTextField name="email" label="Email" required />
                    </Grid>
                </>
            )}
            <Grid item xs={12} md={6} lg={3}>
                <FormSelectCountry name="birth_country" label="Birth Country" required />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormSelectCountry name="citizenship_country" label="Nationality" required />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormReferenceDataAutoComplete
                    name="occupation"
                    label="Occupation"
                    referenceTypeId={referenceTypeId.occupations}
                    valueKey="value"
                    required
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormReferenceDataAutoComplete
                    name="source_of_income"
                    label="Source of Income"
                    referenceTypeId={referenceTypeId.sourceOfIncomes}
                    valueKey="value"
                    required
                />
            </Grid>
            {registrationCountry?.toUpperCase() === UNITED_STATES_ISO3 && (
                <Grid item xs={12} md={6} lg={3}>
                    <FormTextField name="ssn_number" label="SSN Number" required />
                </Grid>
            )}
            {isAddMode && (
                <Grid item xs={12} md={6} lg={3}>
                    <FormPartnerSelect
                        name="register_agent_id"
                        label="Partner"
                        onChange={(_e, value) => {
                            setValue("registered_agent_name", value?.name ?? "");
                        }}
                        required
                    />
                </Grid>
            )}
        </Grid>
    );
}

CustomerFormStep1.propsTypes = {
    isAddMode: PropTypes.bool,
};
