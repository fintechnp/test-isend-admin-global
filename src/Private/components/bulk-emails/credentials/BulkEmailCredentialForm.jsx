import React from "react";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import FormCheckbox from "App/core/hook-form/FormCheckbox";
import FormTextField from "App/core/hook-form/FormTextField";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";

import { useConfirm } from "App/core/mui-confirm";

const schema = Yup.object().shape({
    host: Yup.string().required(),
    port: Yup.string().required(),
    enable_ssl: Yup.bool().required(),
    credential_email: Yup.string().required(),
    pwd: Yup.string().required(),
    sender_name: Yup.string().required(),
    from_address: Yup.string().required(),
    replyto_address: Yup.string().required(),
    display_name: Yup.string().required(),
});

export default function BulkEmailCredentialForm({ onSubmit, initialState, isProcessing }) {
    const methods = useForm({
        defaultValues: initialState,
        resolver: yupResolver(schema),
    });

    const confirm = useConfirm();

    const handleSubmit = (data) => {
        confirm({
            description: "This will update the email credentials",
            confirmationText: "Yes, Update it.",
        }).then(() => onSubmit(data));
    };

    return (
        <HookForm onSubmit={handleSubmit} {...methods}>
            <Grid container rowSpacing={3} columnSpacing={2}>
                <Grid item xs={12} md={6}>
                    <FormTextField name="host" label="Host" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="port" label="Port" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="sender_name" label="Sender Name" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="credential_email" label="Email" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField type="password" name="pwd" label="Password" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="display_name" label="Display Name" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="from_address" label="From Address" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="replyto_address" label="Reply To Address" />
                </Grid>
              
                <Grid item xs={12} md={6}>
                    <FormCheckbox name="enable_ssl" label="Enable SSL" />
                </Grid>
                <Grid item xs={12}>
                    <ButtonWrapper>
                        <SubmitButton isAddMode={false} isLoading={isProcessing} />
                    </ButtonWrapper>
                </Grid>
            </Grid>
        </HookForm>
    );
}
