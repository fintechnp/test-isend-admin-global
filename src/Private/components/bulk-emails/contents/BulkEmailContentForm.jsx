import React from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import FormTextField from "App/core/hook-form/FormTextField";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import SelectBulkEmailGroup from "Private/components/shared/SelectBulkEmailGroup";
import FormCkEditor from "App/core/hook-form/FormCkEditor";
import FormCheckbox from "App/core/hook-form/FormCheckbox";

const schema = Yup.object().shape({
    send_from: Yup.string().email("Enter a valid email address").required("Send From Email is required"),
    send_to: Yup.string().email("Enter a valid email address").required("Send To Email is required"),
    group_id: Yup.string().required("Select a group"),
    email_subject: Yup.string("Email Subject must be at most 50 characters").max(50).required("Enter a subject"),
    email_body: Yup.string().required("Enter a email body"),
    is_active: Yup.boolean(),
});

const BulkEmailContentForm = ({ onSubmit, isAddMode, initialState, isProcessing, onCancel }) => {
    const methods = useForm({
        defaultValues: isAddMode
            ? {
                  is_active: true,
              }
            : initialState,
        resolver: yupResolver(schema),
    });

    const {
        setValue,
        formState: { errors },
    } = methods;

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12} md={6}>
                    <FormTextField name="send_from" label="Send From" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="send_to" label="Send To" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SelectBulkEmailGroup
                        name="group_id"
                        label="Group"
                        error={!!errors?.group_id}
                        helperText={errors?.group_id?.message ?? ""}
                        value={isAddMode ? undefined : initialState?.group_id}
                        onSelected={(v) => {
                            setValue("group_id", v);
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormTextField name="email_subject" label="Subject" />
                </Grid>
                <Grid item xs={12}>
                    <FormCkEditor name="email_body" label="Content" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormCheckbox name="is_active" label="Is Active ?" />
                </Grid>
                <Grid item xs={12}>
                    <ButtonWrapper>
                        <CancelButton onClick={onCancel} disabled={isProcessing}>
                            Cancel
                        </CancelButton>
                        <SubmitButton isLoading={isProcessing} isAddMode={isAddMode} />
                    </ButtonWrapper>
                </Grid>
            </Grid>
        </HookForm>
    );
};

export default React.memo(BulkEmailContentForm);

BulkEmailContentForm.propTypes = {
    isAddMode: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    isProcessing: PropTypes.bool,
    initialState: PropTypes.object,
};
