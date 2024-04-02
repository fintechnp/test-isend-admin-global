import * as yup from "yup";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import HookForm from "App/core/hook-form/HookForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import UploadFile from "App/core/upload/uploadFile";
import FormTextField from "App/core/hook-form/FormTextField";
import { AddButton } from "Private/components/AllButtons/Buttons";
import FormInputWrapper from "App/core/hook-form/FormInputWrapper";

import actions from "../store/actions";

const addAttachmentSchema = yup.object().shape({
    attachmentName: yup.string().required("Attachment Name is required"),
    attachment: yup.string().required("Attachment is required"),
    attachmentObjectId: yup.string().required("Attachment Object Id is required"),
    attachmentObjectType: yup.string().required("Attachment Object Type is required"),
});
export default function AddAttachmentForm({ attachmentObjectId, attachmentObjectType, onClose }) {
    const dispatch = useDispatch();
    const { loading, success } = useSelector((state) => state.upload_attachment);

    const methods = useForm({
        resolver: yupResolver(addAttachmentSchema),
        defaultValues: {
            attachmentObjectId,
            attachmentObjectType,
        },
    });

    const {
        setValue,
        formState: { errors },
        clearErrors,
    } = methods;

    const handleFileUploadSuccess = (id) => {
        setValue("attachment", id);
        clearErrors("attachment");
    };

    const handleRemove = () => {
        setValue("attachment", "");
    };
    useEffect(() => {
        if (success) {
            setValue("attachmentName", "");
            setValue("attachment", "");
            onClose();
        }
    }, [success]);

    const handleSubmit = (data) => {
        dispatch(actions.upload_attachment(data));
    };

    return (
        <HookForm onSubmit={methods.handleSubmit(handleSubmit)} {...methods}>
            <Grid xs={12} container spacing={2}>
                <Grid item xs={12}>
                    <Typography fontSize={24} textAlign="center">
                        Add Attachment
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormTextField name="attachmentName" label="Attachment Name" />
                </Grid>
                <Grid item xs={12}>
                    <FormInputWrapper label="Attachment" errorMessage={errors?.attachment?.message}>
                        <UploadFile
                            title="Upload Attachment"
                            supportedFileDescription="Supported file formats: PDF, JPG, PNG."
                            allowedFileTypes={["application/pdf", "image/jpeg", "image/png", "image/jpg"]}
                            onFileRemove={() => handleRemove()}
                            onUploadSuccess={(id) => {
                                handleFileUploadSuccess(id);
                            }}
                            error={!!errors?.attachment}
                        />
                    </FormInputWrapper>
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
                        <AddButton size="small" variant="outlined" type="submit" loading={loading} disabled={loading}>
                            Add
                        </AddButton>
                    </Grid>
                </Grid>
            </Grid>
        </HookForm>
    );
}
