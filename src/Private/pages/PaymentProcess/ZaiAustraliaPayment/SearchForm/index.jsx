import { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import HookForm from "App/core/hook-form/HookForm";

import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import PageContent from "App/components/Container/PageContent";
import FormDatePicker from "App/core/hook-form/FormDatePicker";

import FormTextField from "App/core/hook-form/FormTextField";
import FormSelect from "App/core/hook-form/FormSelect";

export default function ZaiFilterForm({ loading, setFilterSchema, handleReset }) {
    const reference = JSON.parse(localStorage.getItem("reference"));
    const methods = useForm();

    const { reset, watch, setValue } = methods;

    const handleSubmit = (data) => {
        setFilterSchema((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
        console.log(data);
    };

    return (
        <PageContent>
            <HookForm onSubmit={handleSubmit} {...methods}>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormDatePicker name="from_date" label="From Date" disableFuture />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="transaction_id" label="Transaction ID" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormDatePicker name="to_date" label="To Date" disableFuture />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormTextField name="customer_id" label="Customer ID" />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormSelect
                            name="send_status"
                            label="Transaction Status"
                            options={
                                reference &&
                                reference
                                    ?.filter((ref_data) => ref_data.reference_type === 66)[0]
                                    .reference_data.map((ref) => ({
                                        label: ref.name,
                                        value: ref.value,
                                    }))
                            }
                        />
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
