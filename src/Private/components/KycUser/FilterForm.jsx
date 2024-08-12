import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";

import HookForm from "App/core/hook-form/HookForm";
import apiEndpoints from "Private/config/apiEndpoints";
import FormSelect from "App/core/hook-form/FormSelect";
import { localStorageGet } from "App/helpers/localStorage";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import PageContent from "App/components/Container/PageContent";
import FormSearchAutocomplete from "App/core/hook-form/FormSearchAutocomplete";

import referenceTypeId from "Private/config/referenceTypeId";
import { relatedTo as relatedToConstant, relatedToOptions } from "Private/data/b2b";

const orderByOptions = [
    { label: "Ascending", value: "ASC" },
    { label: "Descending", value: "DESC" },
];

export default function FilterForm({ sortByOptions = [], setFilterSchema, loading }) {
    const methods = useForm();

    const { reset, watch, setValue } = methods;

    const relatedTo = watch("RelatedTo");

    useEffect(() => {
        setValue("RelatedTo", relatedToConstant.AGENT);
    }, []);

    const statusOptions = localStorageGet("reference")
        ?.find((item) => item?.reference_type === referenceTypeId.balanceRequestStatus)
        ?.reference_data?.map((referenceItem) => {
            return {
                label: referenceItem.name,
                value: +referenceItem.value,
            };
        });

    const handleSubmit = (data) => {
        setFilterSchema((prev) => {
            return {
                ...prev,
                marketMakerId: data.marketMakerId,
                statusId: data.statusId,
            };
        });
    };

    const handleReset = () => {
        reset();
        setValue("RelatedTo", relatedToConstant.AGENT);
        setFilterSchema({});
    };
    return (
        <PageContent>
            <HookForm onSubmit={handleSubmit} {...methods}>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormSelect name="RelatedTo" options={relatedToOptions ?? []} label="Market Maker" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: relatedTo === relatedToConstant.BUSINESS ? "block" : "none",
                            }}
                        >
                            <FormSearchAutocomplete
                                name="marketMakerId"
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
                            <FormSearchAutocomplete
                                name="marketMakerId"
                                label="Agent"
                                apiEndpoint={apiEndpoints.marketMaker.getAll}
                                paramkey="Name"
                                valueKey="marketMakerId"
                                labelKey="name"
                                pageNumberQueryKey="Page"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormSelect name="statusId" options={statusOptions} label="Status" />
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
