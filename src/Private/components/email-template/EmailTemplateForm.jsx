import React from "react";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import "react-quill/dist/quill.snow.css";
import { yupResolver } from "@hookform/resolvers/yup";
import Stack from "@mui/material/Stack";

import { useForm } from "react-hook-form";
import HookForm from "App/core/hook-form/HookForm";
import FormTextField from "App/core/hook-form/FormTextField";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import FormSelect from "App/core/hook-form/FormSelect";
import referenceTypeId from "Private/config/referenceTypeId";
import FormTextArea from "App/core/hook-form/FormTextArea";

const schema = Yup.object().shape({
    email_subject: Yup.string().required("TEmail subject is required"),
    email_format: Yup.string().required("Email format is required"),
    template_type: Yup.string().required("Email template type  is required"),
});

const EmailTemplateForm = ({ initialValues, onSubmit, handleClose, isAddMode, loading }) => {
    const reference = JSON.parse(localStorage.getItem("reference"));

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialValues,
    });

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Stack direction="column" spacing={3} columnSpacing={5}>
                <Stack item xs={12} md={6}>
                    <FormSelect
                        name="template_for"
                        label="Template For"
                        options={[
                            { label: "Customer", value: "customer" },
                            { label: "Admin", value: "admin" },
                        ]}
                    />
                </Stack>
                <Stack item xs={12} md={6}>
                    <FormSelect
                        name="template_type"
                        label="Template Type"
                        options={
                            reference &&
                            reference
                                ?.filter((ref_data) => ref_data.reference_type === referenceTypeId.emailTemplateType)[0]
                                .reference_data.map((ref) => ({
                                    label: ref.name,
                                    value: ref.value,
                                }))
                        }
                    />
                </Stack>
                <Stack item xs={12} md={6}>
                    <FormTextField name="email_subject" label="Email Subject" />
                </Stack>
                <Stack item xs={12} md={6}>
                    <FormTextArea name="email_format" label="Email Format" />
                </Stack>

                <Grid item xs={12}>
                    <ButtonWrapper>
                        <CancelButton onClick={handleClose} disabled={loading}>
                            Cancel
                        </CancelButton>
                        <SubmitButton isLoading={loading} isAddMode={isAddMode} />
                    </ButtonWrapper>
                </Grid>
            </Stack>
        </HookForm>
    );
};

export default EmailTemplateForm;

//
