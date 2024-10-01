import React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import FormLabel from "@mui/material/FormLabel";

import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";

import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import FormCheckbox from "App/core/hook-form/FormCheckbox";
import FormTextField from "App/core/hook-form/FormTextField";
import FormFileField from "App/core/hook-form/FormFileField";

const BannerForm = ({ handleSubmit, handleClose, loading, isAddMode, initialValues }) => {
    const methods = useForm({
        defaultValues: initialValues,
    });

    const { watch } = methods;

    const onSubmit = (data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        handleSubmit(formData);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Stack rowGap={4} spacing={1} rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormTextField name="banner_name" label="Banner Name" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormLabel htmlFor="mobileImage" component="label">
                            Mobile Image
                        </FormLabel>

                        <FormFileField name="mobileImage" accept="image/*" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormLabel htmlFor="webImage" component="label">
                            Web Image
                        </FormLabel>
                        <FormFileField name="webImage" accept="image/*" />
                    </Grid>
                    {!isAddMode && (
                        <Grid item xs={12} md={6}>
                            <FormCheckbox name="is_active" label="Is Active ?" />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <ButtonWrapper>
                            <CancelButton onClick={handleClose} disabled={loading}>
                                Cancel
                            </CancelButton>
                            <SubmitButton isLoading={loading} isAddMode={isAddMode} />
                        </ButtonWrapper>
                    </Grid>
                </Stack>
            </form>
        </FormProvider>
    );
};

export default BannerForm;
