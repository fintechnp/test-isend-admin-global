import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import FormRadio from "App/core/hook-form/FormRadio";
import FormCheckbox from "App/core/hook-form/FormCheckbox";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";
import FormTextField from "App/core/hook-form/FormTextField";

import Row from "App/components/Row/Row";
import { GenderStringOptions } from "App/data/Gender";
import FormUserProfileSelect from "App/core/hook-form/FormUserProfileSelect";
import { createUserSetupSchema, updateUserSetupSchema } from "../../validations/userSetupSchema";

const AccountForm = ({ onSubmit, defaultValues, update, loading, handleClose }) => {
    const methods = useForm({
        resolver: yupResolver(update ? updateUserSetupSchema : createUserSetupSchema),
        defaultValues,
    });

    return (
        <Box sx={{ maxWidth: "700px" }}>
            <HookForm {...methods} onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                        <FormTextField name="first_name" label="First Name" />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <FormTextField name="last_name" label="Last Name" />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <FormRadio name="gender" label="Gender" options={GenderStringOptions} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <FormTextField name="phone_number" label="Mobile No" />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <FormTextField name="email" label="Email" />
                    </Grid>
                    {!update && (
                        <>
                            <Grid item xs={12} md={6} lg={6}>
                                <FormTextField type="password" name="password" label="Password" />
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                                <FormTextField type="password" name="confirm_password" label="Confirm Password" />
                            </Grid>
                        </>
                    )}
                    <Grid item xs={12} md={6} lg={6}>
                        <FormUserProfileSelect name="user_profile" label="User Profile" />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <FormCheckbox name="is_active" label="Active" />
                    </Grid>
                    <Grid item xs={12}>
                        <Row gap={2} justifyContent="flex-end">
                            <CancelButton onClick={handleClose} disabled={loading}>
                                Cancel
                            </CancelButton>
                            <SubmitButton
                                submitText={update ? "Update" : "Create"}
                                submittingText={update ? "Updating" : "Creating"}
                                isLoading={loading}
                            >
                                Save
                            </SubmitButton>
                        </Row>
                    </Grid>
                </Grid>
            </HookForm>
        </Box>
    );
};

export default AccountForm;
