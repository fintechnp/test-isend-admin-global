import React from "react";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";

import HookForm from "App/core/hook-form/HookForm";
import FormTextField from "App/core/hook-form/FormTextField";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";

export default function UpdateStatusForm({ loading, defaultValues, onClose, handleSubmit }) {
    const methods = useForm({
        defaultValues: defaultValues,
    });

    return (
        <HookForm onSubmit={methods.handleSubmit(handleSubmit)} {...methods}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <FormTextField name="status" label="Status" />
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                columnSpacing={2}
                style={{ padding: "4px 0px", paddingRight: "4px" }}
            >
                <Grid item>
                    <CancelButton
                        size="small"
                        variant="outlined"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Cancel
                    </CancelButton>
                </Grid>
                <Grid item>
                    <SubmitButton size="small" variant="outlined" type="submit" loading={loading} disabled={loading}>
                        Update
                    </SubmitButton>
                </Grid>
            </Grid>
        </HookForm>
    );
}
