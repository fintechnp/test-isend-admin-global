import React from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Spacer from "App/components/Spacer/Spacer";
import HookForm from "App/core/hook-form/HookForm";
import FormTextField from "App/core/hook-form/FormTextField";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";

const schema = Yup.object().shape({
    group_name: Yup.string().required("Group Name is required"),
});

const BulkEmailGroupForm = ({ onSubmit, isAddMode, initialState, isProcessing, onCancel }) => {
    const methods = useForm({
        defaultValues: initialState,
        resolver: yupResolver(schema),
    });

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                    <FormTextField name="group_name" label="Group Name" />
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

export default React.memo(BulkEmailGroupForm);

BulkEmailGroupForm.propTypes = {
    isAddMode: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    isProcessing: PropTypes.bool,
    initialState: PropTypes.object,
};
