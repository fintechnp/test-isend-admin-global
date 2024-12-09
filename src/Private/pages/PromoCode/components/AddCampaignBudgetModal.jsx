import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import Modal from "App/components/Modal/Modal";
import FormTextField from "App/core/hook-form/FormTextField";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";

const schema = Yup.object().shape({
    budget: Yup.number().required("Budget is required"),
});

const AddCampaignBudgetModal = ({
    isLoading,
    isOpen,
    handleClose,
    onSubmit,
    initial_values,
    campaignName,
    AvailableBudget,
}) => {
    const methods = useForm({
        defaultValues: {
            campaignId: "",
            budget: "",
        },
        resolver: yupResolver(schema),
    });

    const { reset, watch } = methods;

    useEffect(() => {
        if (initial_values) {
            reset({
                campaignId: initial_values?.campaignId,
            });
        }
    }, [initial_values, reset]);

    if (!isOpen) return null;

    return (
        <Modal open={isOpen} onClose={handleClose} title="Add Campaign Budget">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid display="none" item xs={12} md={6} lg={3}>
                            <FormTextField type="number" disabled name="campaignId" label="Campaign ID" required />
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <Typography variant="subtitle2">Campaign Name</Typography>
                            <Typography variant="body2">{campaignName}</Typography>
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <Typography variant="subtitle2">Available Budget</Typography>
                            <Typography variant="body1">{AvailableBudget}</Typography>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <FormTextField type="number" name="budget" label="Add Budget" />
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonWrapper>
                                <CancelButton onClick={handleClose}>Cancel</CancelButton>
                                <SubmitButton type="submit" disabled={isLoading}>
                                    Submit
                                </SubmitButton>
                            </ButtonWrapper>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
        </Modal>
    );
};

export default AddCampaignBudgetModal;
