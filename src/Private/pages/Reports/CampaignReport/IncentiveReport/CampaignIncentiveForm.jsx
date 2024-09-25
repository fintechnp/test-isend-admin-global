import { Grid, Stack } from "@mui/material";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IncentivePaidStatusOptions } from "./data/IncentivePaidStatus";

const CampaignIncentiveForm = ({ handleSubmit, handleClose, loading, isAddMode, initialValues }) => {
    const methods = useForm({});

    const onSubmit = (data) => {
        handleSubmit(data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Stack rowGap={4} spacing={1} rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormTextField name="remarks" label="Remarks" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormSelect name="is_paid" label="Is Paid ?" options={IncentivePaidStatusOptions} />
                    </Grid>

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

export default CampaignIncentiveForm;
