import React from "react";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Row from "App/components/Row/Row";
import HookForm from "App/core/hook-form/HookForm";
import FormTextField from "App/core/hook-form/FormTextField";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";
import FormMultipleValueTextField from "App/core/hook-form/FormMultipleValueTextField";

const schema = Yup.object().shape({
    config_for: Yup.string().required("Config for is required"),
    emails: Yup.array()
        .of(Yup.string().email("Invalid email"))
        .min(1, "At least one email is required")
        .required("Emails are required"),
});

const EmailConfigForm = ({ onSubmit, initialValues, onClose, loading }) => {
    const methods = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <FormTextField name="config_for" label="Config For" required />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormMultipleValueTextField name="emails" label="Emails" type="email" required fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Row justifyContent="flex-end" gap={1}>
                        <CancelButton onClick={onClose} />
                        <SubmitButton disabled={loading} />
                    </Row>
                </Grid>
            </Grid>
        </HookForm>
    );
};

export default EmailConfigForm;
