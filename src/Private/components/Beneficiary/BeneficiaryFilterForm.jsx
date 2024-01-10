import React from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button'

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import apiEndpoints from "Private/config/apiEndpoints";
import FormTextField from "App/core/hook-form/FormTextField";
import PageContent from "App/components/Container/PageContent";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import { ResetButton, SearchButton } from "../AllButtons/Buttons";
import FormSearchAutoComplete from "App/core/hook-form/FormSearchAutocomplete";
import { localStorageGet } from "App/helpers/localStorage";


const orderByOptions = [
    { label: "Ascending", value: "ASC" },
    { label: "Descending", value: "DESC" },
];

const relatedToOptions = [
    {
        label: "Business",
        value: "business",
    },
    {
        label: "MarketMaker",
        value: "marketmaker",
    },
];

export default function BeneficiaryFilterForm({ filterSchema, setFilterSchema, sortByOptions = [], loading }) {
    const methods = useForm();
    const dispatch = useDispatch();

    const country = localStorageGet("country");

    const countryOptions = country?.map((item) => {
        return {
            label: item.country,
            value: item.iso3,
        };
    });

    const { reset, watch } = methods;

    const relatedTo = watch("related_to");

    const handleSubmit = (data) => {
        setFilterSchema((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
    };
    const handleReset = () => {
        reset();
    };
    return (
        <PageContent>
            <HookForm onSubmit={handleSubmit} {...methods}>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormSelect name="related_to" label="choose" options={relatedToOptions ?? []} />
                    </Grid>

                    {(() => {
                        if (relatedTo === "business") {
                            return (
                                <Grid item xs={12} sm={6}>
                                    <FormSearchAutoComplete
                                        name="related_id"
                                        label="Business Id"
                                        apiEndpoint={apiEndpoints.business.getAll}
                                        paramkey="BusinessName"
                                        valueKey="businessId"
                                        labelKey="name"
                                    />
                                </Grid>
                            );
                        } else if (relatedTo === "marketmaker") {
                            return (
                                <Grid item xs={12} sm={6}>
                                    <FormSearchAutoComplete
                                        name="related_id"
                                        label="Market Maker Id"
                                        apiEndpoint={apiEndpoints.marketMaker.getAll}
                                        paramkey="Name"
                                        valueKey="marketMakerId"
                                        labelKey="name"
                                    />
                                </Grid>
                            );
                        }
                    })()}

                    <Grid item xs={12} sm={6}>
                        <FormTextField name="beneficiary_id" label="Beneficiary id" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="name" label="Name" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="mobile_number" label="Mobile Number" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormSelect name="country" label="Country" options={countryOptions ?? []} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="search" label="Search" />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormSelect name="sort_by" label="Order By" options={sortByOptions ?? []} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormSelect name="order_by" label="Sort By" options={orderByOptions} />
                    </Grid>

                    <Grid item xs={12}>
                        <ButtonWrapper
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            columnSpacing={2}
                        >
                            <Grid item>
                                <Button size="small" color="error" variant="contained" onClick={handleReset} disabled={loading}>
                                    Reset
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button size="small" variant="contained" type="submit" disabled={loading}>
                                    Search
                                </Button>
                            </Grid>
                        </ButtonWrapper>
                    </Grid>
                </Grid>
            </HookForm>
        </PageContent>
    );
}
