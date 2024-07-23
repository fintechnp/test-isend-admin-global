import React from "react";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextArea from "App/core/hook-form/FormTextArea";
import FormTextField from "App/core/hook-form/FormTextField";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";

import { templateForOptions } from "./data/template-for";
import referenceTypeId from "Private/config/referenceTypeId";
import { templateFor as TemplateForConstant } from "./data/template-for";

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

    const { watch } = methods;

    const templateFor = watch("template_for");

    const referenceTypeIdForTemplateType =
        templateFor === TemplateForConstant.ADMIN
            ? referenceTypeId.emailTemplateTypeForAdmin
            : templateFor === TemplateForConstant.CUSTOMER
              ? referenceTypeId.emailTemplateTypeForCustomer
              : null;

    const referenceData = referenceTypeIdForTemplateType
        ? (reference
              ?.filter((ref_data) => ref_data.reference_type === referenceTypeIdForTemplateType)[0]
              .reference_data.map((ref) => ({
                  label: ref.name,
                  value: ref.value,
              })) ?? [])
        : [];

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Stack direction="column" spacing={3} columnSpacing={5}>
                <Stack item xs={12} md={6}>
                    <FormSelect name="template_for" label="Template For" options={templateForOptions} />
                </Stack>
                <Stack item xs={12} md={6}>
                    <FormSelect name="template_type" label="Template Type" options={referenceData} />
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
