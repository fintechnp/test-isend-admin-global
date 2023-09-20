import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";

import ucwords from "App/helpers/ucwords";
import routePaths from "Private/config/routePaths";
import FormSelect from "App/core/hook-form/FormSelect";
import { localStorageGet } from "App/helpers/localStorage";
import FormTextField from "App/core/hook-form/FormTextField";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import { AddButton, CancelButton } from "../AllButtons/Buttons";
import FormMultiSelect from "App/core/hook-form/FormMultiSelect";
import referenceTypeId from "Private/config/referenceTypeId";

const registeredCountyOptions = [
    {
        value: 155,
        label: "Australia",
    },
    {
        label: "Singapore",
        value: 104,
    },
    {
        label: "United States of America",
        value: 55,
    },
];

export default function MarketMakerForm({ isAddMode = true }) {
    const navigate = useNavigate();
    const countries = localStorageGet("country");
    const reference = localStorageGet("reference");

    const { setValue, watch, getValues } = useFormContext();

    const { loading, success } = useSelector((state) => state.add_market_maker);

    const { loading: updating, success: updateSuccess } = useSelector((state) => state.update_market_maker);

    const designationOptions = reference
        ?.find((item) => item.reference_type === referenceTypeId.designations)
        ?.reference_data?.map((item) => {
            return {
                label: item.name,
                value: item.reference_id,
            };
        });

    const allowedCountries = countries?.map((c) => {
        return {
            label: ucwords(c.country),
            value: c.country_id,
        };
    });

    const currencyOptions = countries?.map((c) => {
        return {
            label: ucwords(c.currency_name),
            value: c.currency,
        };
    });

    const totalAllowedCountrySelectedCount = (getValues("allowedCountryIds") ?? []).length;

    useEffect(() => {
        if (isAddMode) {
            setValue("registereddate", format(new Date(), "yyyy-MM-dd"));
        }
    }, []);

    const registeredCountryId = watch("registeredCountryId");

    useEffect(() => {
        if (isAddMode && registeredCountryId) {
            const selectedCounty = countries?.find((item) => item?.country_id === registeredCountryId);
            setValue("currencyId", selectedCounty?.currency ?? "");
            setValue("countryId", registeredCountryId);
            setValue("contactPersonExtension", selectedCounty?.phone_code ?? "");
        }
    }, [registeredCountryId]);

    useEffect(() => {
        if (success || updateSuccess) {
            navigate(routePaths.agent.listMarketMaker);
        }
    }, [success, updateSuccess]);
    return (
        <>
            <Box
                sx={{
                    px: 2,
                    py: 1,
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                }}
            >
                <Typography fontSize={17} fontWeight={600}>
                    Agent Details
                </Typography>
                <Divider
                    sx={{
                        my: 2,
                    }}
                />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="name" label="Name" />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormTextField name="registrationNo" label="Registration Number" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="brandName" label="Brand Name" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormDatePicker
                            name="registereddate"
                            label="Registration Date"
                            dateFormat="yyyy-MM-dd"
                            disableFuture
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormSelect
                            name="registeredCountryId"
                            label="Country of Registration"
                            options={registeredCountyOptions ?? []}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormSelect name="currencyId" label="Currency" options={currencyOptions ?? []} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="contactNo" label="Contact Number" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="email" label="Email" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="website" label="Website" />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormMultiSelect
                            name="allowedCountryIds"
                            label={`Allowed Countries ( ${totalAllowedCountrySelectedCount} selected )`}
                            multiple
                            options={allowedCountries ?? []}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    mt: 3,
                    px: 2,
                    py: 1,
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                }}
            >
                <Typography fontSize={17} fontWeight={600}>
                    Address Details
                </Typography>
                <Divider
                    sx={{
                        my: 2,
                    }}
                />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <FormSelect name="countryId" label="Address Country" options={allowedCountries ?? []} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="postCode" label="PostCode" />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormTextField name="unit" label="Unit" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="state" label="State" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="street" label="Street" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="city" label="City" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="address" label="Address" />
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    mt: 3,
                    px: 2,
                    py: 1,
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                }}
            >
                <Typography fontSize={17} fontWeight={600}>
                    Contact Person Details
                </Typography>
                <Divider
                    sx={{
                        my: 2,
                    }}
                />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="contactPersonName" label="Name" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormSelect name="designationId" label="Designation" options={designationOptions ?? []} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="contactPersonExtension" label="Phone Extension" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="contactMobileNo" label="Mobile No" />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormTextField name="contactPhoneNo" label="Phone No" />
                    </Grid>
                </Grid>
            </Box>
            {isAddMode && (
                <Box
                    sx={{
                        mt: 3,
                        px: 2,
                        py: 1,
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                    }}
                >
                    <Typography fontSize={17} fontWeight={600}>
                        Login Details
                    </Typography>
                    <Divider
                        sx={{
                            my: 2,
                        }}
                    />
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                            <FormTextField name="loginEmail" label="Email" />
                        </Grid>
                    </Grid>
                </Box>
            )}
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                columnSpacing={2}
                style={{ padding: "4px 0px", paddingRight: "4px" }}
            >
                <Grid item>
                    <CancelButton size="small" variant="outlined" disabled={updating}>
                        Cancel
                    </CancelButton>
                </Grid>
                <Grid item>
                    <AddButton
                        size="small"
                        variant="outlined"
                        type="submit"
                        loading={updating | loading}
                        disabled={updating | loading}
                    >
                        {isAddMode ? "Add" : "Update"}
                    </AddButton>
                </Grid>
            </Grid>
        </>
    );
}
