import React from "react";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import Grid from "@mui/material/Grid";
import "react-quill/dist/quill.snow.css";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import FormHelperText from "@mui/material/FormHelperText";

import { useForm } from "react-hook-form";
import HookForm from "App/core/hook-form/HookForm";
import FormTextField from "App/core/hook-form/FormTextField";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";

const schema = Yup.object().shape({
    email_by: Yup.string().email().required("Required").max(100),
    email_to: Yup.string().email().required("Required").max(100),
    email_cc: Yup.string().optional().max(100),
    email_bcc: Yup.string().optional().max(100),
    email_subject: Yup.string().email().required("Required").max(100),
    email_body: Yup.string().required("Enter a email body"),
});

const EmailForm = ({ onSubmit, loading, handleClose }) => {
    const methods = useForm({
        resolver: yupResolver(schema),
    });

    const {
        setValue,
        formState: { errors },
        watch,
    } = methods;

    const emailBody = watch("email_body");

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12} md={6}>
                    <FormTextField name="email_by" label="Email by" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="email_to" label="Email to" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="email_cc" label="CC" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="email_bcc" label="BCC" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="email_subject" label="Subject" />
                </Grid>
                <Grid item xs={12}>
                    <Typography>Body</Typography>
                    <ReactQuill theme="snow" value={emailBody} onChange={(v) => setValue("email_body", v)} />
                    <FormHelperText error={true}>{errors?.email_body?.message}</FormHelperText>
                </Grid>
                <Grid item xs={12}>
                    <ButtonWrapper>
                        <CancelButton onClick={handleClose} disabled={loading}>
                            Cancel
                        </CancelButton>
                        <SubmitButton isLoading={loading} isAddMode={true} />
                    </ButtonWrapper>
                </Grid>
            </Grid>
        </HookForm>
    );
};

export default EmailForm;
