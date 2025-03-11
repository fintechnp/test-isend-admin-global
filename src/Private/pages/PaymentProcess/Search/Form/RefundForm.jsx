import React from "react";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormCheckbox from "App/core/hook-form/FormCheckbox";
import FormTextField from "App/core/hook-form/FormTextField";

const BlockBox = styled(Box)(({ theme }) => ({
    width: "100%",
    marginTop: "12px",
    padding: "12px",
    border: `1px solid ${theme.palette.border.main}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
}));

const RefundButton = styled(LoadingButton)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    marginTop: "8px",
    textTransform: "capitalize",
    background: theme.palette.warning.main,
    "&:hover": {
        background: theme.palette.warning.dark,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

function RefundForm({ onSubmit, loading, initialValues }) {
    const reference = JSON.parse(localStorage.getItem("reference"));

    const remarksOptions =
        reference &&
        reference
            ?.filter((ref_data) => ref_data.reference_type === 54)[0]
            .reference_data.map((data) => ({
                label: data.name,
                value: data.value,
            }));

    const methods = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(
            Yup.object().shape({
                remarks: Yup.string().required("Remarks is Required"),
                others: Yup.string().when("remarks", {
                    is: (value) => value === "others",
                    then: (schema) => schema.required("Remarks is Required"),
                }),
                refund_charge: Yup.boolean(),
            }),
        ),
    });

    const { watch } = methods;
    const reasonValue = watch("remarks");

    return (
        <Grid container sx={{ pb: "24px" }}>
            <Grid item xs={12}>
                <HookForm onSubmit={onSubmit} {...methods}>
                    <BlockBox>
                        <Grid container columnGap={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormSelect
                                    name="remarks"
                                    type="text"
                                    options={[
                                        ...remarksOptions,
                                        {
                                            label: "Others",
                                            value: "others",
                                        },
                                    ]}
                                    label="Select Reason"
                                />
                            </Grid>
                            {reasonValue === "others" && (
                                <Grid item xs={12} sm={6} md={4}>
                                    <FormTextField name="others" label="Remarks" />
                                </Grid>
                            )}
                            <Grid item xs={12} sm={6} md={3}>
                                <FormCheckbox name="refund_charge" label="Refund Charge" />
                            </Grid>
                        </Grid>
                        <RefundButton size="small" variant="outlined" loading={loading} type="submit">
                            Refund
                        </RefundButton>
                    </BlockBox>
                </HookForm>
            </Grid>
        </Grid>
    );
}

export default RefundForm;
