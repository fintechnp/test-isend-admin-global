import React from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";

import apiEndpoints from "Private/config/apiEndpoints";
import FormTextField from "App/core/hook-form/FormTextField";
import PageContent from "App/components/Container/PageContent";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import { ResetButton, SearchButton } from "../AllButtons/Buttons";

import FormSearchAutoComplete from "App/core/hook-form/FormSearchAutocomplete";

const statusOptions = [
    {
        label: "InActive",
        value: 0,
    },
    {
        label: "Active",
        value: 1,
    },
    {
        label: "Pending",
        value: 2,
    },
    {
        label: "Approved",
        value: 3,
    },
];

export default function BusinessFilterForm({ setFilterSchema, loading }) {
    const methods = useForm();
    const dispatch = useDispatch();

    const { reset, setValue, getValues } = methods;

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
                        <FormSearchAutoComplete
                            name="MarketMakerId"
                            label="Market Maker"
                            apiEndpoint={apiEndpoints.marketMaker.getAll}
                            paramkey="Name"
                            valueKey="marketMakerId"
                            labelKey="name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="BusinessName" label="Business Name" />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormDatePicker name="FromDate" label="From Date" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormDatePicker name="ToDate" label="To Date" />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormSelect name="Status" options={statusOptions} label="Status" />
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
                                <ResetButton size="small" variant="outlined" onClick={handleReset}>
                                    Reset
                                </ResetButton>
                            </Grid>
                            <Grid item>
                                <SearchButton size="small" variant="outlined" type="submit">
                                    Search
                                </SearchButton>
                            </Grid>
                        </ButtonWrapper>
                    </Grid>
                </Grid>
            </HookForm>
        </PageContent>
    );
}
