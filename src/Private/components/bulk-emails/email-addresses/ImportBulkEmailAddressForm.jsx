import React, { useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import SelectBulkEmailGroup from "Private/components/shared/SelectBulkEmailGroup";

const schema = Yup.object().shape({
    group_id: Yup.string().required("Select a group"),
    file: Yup.string().required("Select a file"),
});

const ImportBulkEmailAddressForm = ({ onSubmit, isValidateImportSuccess, initialState, isProcessing, onCancel }) => {
    const methods = useForm({
        defaultValues: initialState,
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();

    const [file, setFile] = useState();

    const {
        setValue,
        formState: { errors },
        getValues,
    } = methods;

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("group_id", getValues("group_id"));
        onSubmit(formData);
    };

    return (
        <HookForm onSubmit={handleSubmit} encType="multipart/form-data" {...methods}>
            <Grid container rowSpacing={3} columnSpacing={2}>
                {isValidateImportSuccess && (
                    <Grid item xs={12}>
                        <Typography color="success.main">
                            Emails validated successfully. Please click confirm to import.
                        </Typography>
                    </Grid>
                )}
                <Grid item xs={12} md={6}>
                    <SelectBulkEmailGroup
                        name="group_id"
                        label="Group"
                        error={!!errors?.group_id}
                        helperText={errors?.group_id?.message ?? ""}
                        onSelected={(v) => {
                            setValue("group_id", v);
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        size="small"
                        type="file"
                        error={!!errors?.file}
                        helperText={errors?.file?.message ?? ""}
                        name="file"
                        onChange={(e) => {
                            dispatch({ type: "RESET_IMPORT_BULK_EMAIL_ADDRESS_VALIDATE" });
                            if (!e.target.files) return;
                            setFile(e.target.files[0]);
                            setValue("file", e.target.files[0]);
                        }}
                        inputProps={{
                            accept: ".csv",
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ButtonWrapper>
                        <CancelButton onClick={onCancel} disabled={isProcessing}>
                            Cancel
                        </CancelButton>
                        <SubmitButton
                            startIcon={isValidateImportSuccess ? <CheckIcon /> : <></>}
                            isLoading={isProcessing}
                            {...(isValidateImportSuccess
                                ? {
                                      submitText: "Import",
                                      submittingText: "Importing Emails",
                                  }
                                : {
                                      submitText: "Validate",
                                      submittingText: "Validating",
                                  })}
                        />
                    </ButtonWrapper>
                </Grid>
            </Grid>
        </HookForm>
    );
};

export default React.memo(ImportBulkEmailAddressForm);

ImportBulkEmailAddressForm.propTypes = {
    isAddMode: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    isProcessing: PropTypes.bool,
    isValidateImportSuccess: PropTypes.bool,
};
