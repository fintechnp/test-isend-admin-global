import React from "react";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import FormTextField from "App/core/hook-form/FormTextField";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";

const schema = Yup.object().shape({
    phone_number: Yup.string().required("Phone Number is required"),
    email: Yup.string().required("Email is required"),
});

const HelpCenterForm = ({ initialValues, onSubmit, handleClose, isAddMode, loading }) => {
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialValues,
    });

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Stack direction="column" spacing={3} columnSpacing={5}>
                <Stack item xs={12} md={6}>
                    <FormTextField name="phone_number" label="Phone Number" />
                </Stack>
                <Stack item xs={12} md={6}>
                    <FormTextField name="email" label="Email " />
                </Stack>

                <Grid item xs={12}>
                    <ButtonWrapper>
                        <CancelButton onClick={handleClose} disabled={loading}>
                            Cancel
                        </CancelButton>
                        <SubmitButton isLoading={loading} isAddMode={isAddMode} />
                    </ButtonWrapper>
                </Grid>
            </Stack>
        </HookForm>
    );
};

export default HelpCenterForm;
