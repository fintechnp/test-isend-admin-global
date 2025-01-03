import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import FormTextField from "App/core/hook-form/FormTextField";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";

const DocumentFileSchema = Yup.object().shape({
    title: Yup.string().required("Title is required").typeError("Title is required"),
});

const DocumentFileForm = ({ isAddMode, defaultType, loading, onSubmit, initialValues, handleClose }) => {
    const methods = useForm({
        defaultValues: {
            title: isAddMode ? "" : initialValues?.title,
            type: defaultType,
            title_content: null,
        },
        resolver: yupResolver(DocumentFileSchema),
    });

    const { reset, setValue } = methods;

    useEffect(() => {
        if (!isAddMode && initialValues) {
            setValue("title", initialValues.title);
        }
    }, [isAddMode, initialValues, setValue]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <FormTextField name="title" label="Title" />
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonWrapper>
                            <CancelButton onClick={handleClose} disabled={loading}>
                                Cancel
                            </CancelButton>
                            <SubmitButton isLoading={loading} isAddMode={isAddMode} />
                        </ButtonWrapper>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
};

export default DocumentFileForm;
