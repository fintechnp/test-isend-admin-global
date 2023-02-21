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

const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Enter a valid email address").required("Email is required"),
    group_id: Yup.string().required("Group is required"),
});

const BulkEmailAddressForm = ({ onSubmit, isAddMode, initialState, isProcessing, onCancel }) => {
    const methods = useForm({
        defaultValues: initialState,
        resolver: yupResolver(schema),
    });

    const {
        setValue,
        clearErrors,
        formState: { errors },
    } = methods;

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12} md={6}>
                    <FormTextField name="name" label="Name" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormTextField name="email" label="Email Address" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SelectBulkEmailGroup
                        name="group_id"
                        label="Group"
                        error={!!errors?.group_id}
                        helperText={errors?.group_id?.message ?? ""}
                        value={!isAddMode ? initialState?.group_id : undefined}
                        onSelected={(v) => {
                            setValue("group_id", v);
                            clearErrors("group_id");
                        }}
                    />
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

export default React.memo(BulkEmailAddressForm);

BulkEmailAddressForm.propTypes = {
    isAddMode: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    isProcessing: PropTypes.bool,
    initialState: PropTypes.object,
};
