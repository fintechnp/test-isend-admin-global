import { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import EntryType from "Private/pages/Agent/Ledger/enum/EntryType";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import PageContent from "App/components/Container/PageContent";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import FormSearchAutoComplete from "App/core/hook-form/FormSearchAutocomplete";

import apiEndpoints from "Private/config/apiEndpoints";
import { relatedTo as relatedToConstant, relatedToOptions } from "Private/data/b2b";


const entityTypeOptions = [
    {
        label: EntryType.Single,
        value: 0,
    },
    {
        label: EntryType.Batch,
        value: 1,
    },
    {
        label: EntryType.BalanceRequest,
        value: 2,
    },
    {
        label: EntryType.Manual,
        value: 3,
    },
    {
        label: EntryType.SingleServiceCharge,
        value: 4,
    },
    {
        label: EntryType.BatchServiceCharge,
        value: 5,
    },
    {
        label: EntryType.SingleReverseEntry,
        value: 6,
    },
    {
        label: EntryType.BatchReverseEntry,
        value: 7,
    },
    {
        label: EntryType.SingleServiceChargeReverseEntry,
        value: 8,
    },
    {
        label: EntryType.BatchServiceChargeReverseEntry,
        value: 9,
    },
    {
        label: EntryType.SingleBatchTransaction,
        value: 10,
    },
    {
        label: EntryType.SingleBatchServiceCharge,
        value: 11,
    },
];

export default function LedgerFilterForm({ setFilterSchema, loading }) {
    const methods = useForm();

    const { reset, watch, setValue } = methods;

    const relatedTo = watch("RelatedTo");

    useEffect(() => {
        setValue("RelatedTo", "marketmaker");
    }, []);

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
                        <FormSelect name="RelatedTo" options={relatedToOptions ?? []} label="Agent/Business" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: relatedTo === relatedToConstant.BUSINESS ? "block" : "none",
                            }}
                        >
                            <FormSearchAutoComplete
                                name="relatedId"
                                label="Business Id"
                                apiEndpoint={apiEndpoints.business.getAll}
                                paramkey="BusinessName"
                                valueKey="businessId"
                                labelKey="name"
                            />
                        </Box>
                        <Box
                            sx={{
                                display: relatedTo === relatedToConstant.AGENT ? "block" : "none",
                            }}
                        >
                            <FormSearchAutoComplete
                                name="relatedId"
                                label="Agent"
                                apiEndpoint={apiEndpoints.marketMaker.getAll}
                                paramkey="Name"
                                valueKey="marketMakerId"
                                labelKey="name"
                                pageNumberQueryKey="Page"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormSelect name="EntryType" options={entityTypeOptions ?? []} label="Entry Type" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormDatePicker name="FromDate" label="From Date" disableFuture />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormDatePicker name="ToDate" label="To Date" disableFuture />
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
                                <Button
                                    color="error"
                                    size="small"
                                    variant="contained"
                                    onClick={handleReset}
                                    disabled={loading}
                                >
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
