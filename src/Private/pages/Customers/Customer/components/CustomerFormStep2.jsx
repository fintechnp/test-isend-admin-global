import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormTextField from "App/core/hook-form/FormTextField";
import FormStateSelect from "App/core/hook-form/FormStateSelect";
import LoadingBackdrop from "App/components/Loading/LoadingBackdrop";

import isEmpty from "App/helpers/isEmpty";
import { CommonAction } from "Common/store";
import { AUSTRALIA_ISO3 } from "App/data/SendingCountry";
import { IS_STATE_REQUIRED } from "../schema/createCustomerSchema";
import { useReactHookFormContext } from "App/core/hook-form/useReactHookForm";
import FormStreetTypeSelect from "App/core/hook-form/FormStreetTypeSelect";

export default function CustomerFormStep2({ isAddMode }) {
    const dispatch = useDispatch();

    const { watch, setValue } = useReactHookFormContext();

    const registrationCountry = watch("country");

    const {
        response,
        loading: isLoading,
        country: countryValidationRulesCountry,
        success: isSuccess,
    } = useSelector((state) => state.get_country_validation_rules);

    useEffect(() => {
        if (registrationCountry?.toUpperCase() !== countryValidationRulesCountry?.toUpperCase() || !isSuccess)
            dispatch(CommonAction.get_country_validation_rules(registrationCountry));
    }, []);

    useEffect(() => {
        const data = response?.data;
        if (isEmpty(data)) return;
        setValue(IS_STATE_REQUIRED, !!data?.stateValidationRequired);
    }, [response]);

    const isStateRequired = watch(IS_STATE_REQUIRED);

    return (
        <Grid container spacing="16px">
            <Grid item xs={12} md={6} lg={3}>
                <FormTextField name="postcode" label="Post Code" required />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormTextField name="unit" label="Unit" isOptional />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormTextField name="street" label="Street" required />
            </Grid>
            {registrationCountry?.toUpperCase() === AUSTRALIA_ISO3 && (
                <>
                    <Grid item xs={12} md={6} lg={3}>
                        <FormStreetTypeSelect
                            name="street_type"
                            label="Street Type"
                            country={registrationCountry}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <FormTextField name="street_no" label="Street Number" required />
                    </Grid>
                </>
            )}
            <Grid item xs={12} md={6} lg={3}>
                <FormTextField name="city" label="City" required />
            </Grid>
            {isStateRequired && (
                <Grid item xs={12} md={6} lg={3}>
                    <FormStateSelect
                        name="state"
                        label="State"
                        country={registrationCountry}
                        onChange={(e, value) => {
                            setValue("state_name", value?.name ?? "");
                        }}
                        required
                    />
                </Grid>
            )}
            <Grid item xs={12} md={6} lg={3}>
                <FormTextField name="address" label="Address" required />
            </Grid>
            <LoadingBackdrop open={isLoading} />
        </Grid>
    );
}

CustomerFormStep2.propsTypes = {
    isAddMode: PropTypes.bool,
};
