import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import { FormProvider } from "react-hook-form";
import FormTextField from "App/core/hook-form/FormTextField";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";

import { AccountClosureRequestFormValues } from "../data/AccountClosureRequestStatus";

const AcceptRejectAccountClosureRequestModal = ({ handleSubmit, setOpen, status, loading }) => {
    const methods = useForm({
        defaultValues: {
            remarks: "",
        },
    });

    const { setValue } = methods;

    useEffect(() => {
        if (status) {
            setValue("status", status);
        }
    }, [status]);

    const onSubmit = (data) => {
        handleSubmit(data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Stack rowGap={4} spacing={1} rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormTextField name="remarks" label="Remarks" multiline />
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonWrapper>
                            <CancelButton
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                    setOpen(false);
                                }}
                                disabled={loading}
                            >
                                Cancel
                            </CancelButton>
                            <SubmitButton
                                submitText={status === AccountClosureRequestFormValues.ACCEPTED ? "Approve" : "Reject"}
                                submittingText={
                                    status === AccountClosureRequestFormValues.ACCEPTED ? "Approving" : "Rejecting"
                                }
                                isLoading={loading}
                            />
                        </ButtonWrapper>
                    </Grid>
                </Stack>
            </form>
        </FormProvider>
    );
};

export default AcceptRejectAccountClosureRequestModal;
