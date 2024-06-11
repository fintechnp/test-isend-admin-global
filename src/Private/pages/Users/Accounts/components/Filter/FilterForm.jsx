import React from "react";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";

import Row from "App/components/Row/Row";
import { useForm } from "react-hook-form";
import HookForm from "App/core/hook-form/HookForm";
import ResetButton from "App/components/Button/ResetButton";
import FormTextField from "App/core/hook-form/FormTextField";
import SubmitButton from "App/components/Button/SubmitButton";
import FormUserProfileSelect from "App/core/hook-form/FormUserProfileSelect";
import FormSelect from "App/core/hook-form/FormSelect";
import cleanObject from "App/helpers/cleanObject";
import isEmpty from "App/helpers/isEmpty";
import FormSearchAutocomplete from "App/core/hook-form/FormSearchAutocomplete";
import apiEndpoints from "Private/config/apiEndpoints";

const Container = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const schema = Yup.object().shape({
    email: Yup.string().email().nullable(),
});

export default function FilterForm({ isOpen, sx, onSubmit, onReset, onCancel }) {
    const methods = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    const { reset } = methods;

    const handleSubmit = (data) => {
        if (isEmpty(cleanObject(data))) return;
        onSubmit?.(data);
    };

    const handleReset = () => {
        reset({});
        onReset?.();
    };

    return (
        <Collapse in={isOpen}>
            <HookForm {...methods} onSubmit={handleSubmit}>
                <Container sx={sx}>
                    <Box>
                        <Grid sx={sx} container spacing={1}>
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <FormTextField name="name" label="Name" />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <FormTextField name="phone_number" label="Phone Number" />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <FormSearchAutocomplete
                                    name="role"
                                    label="Role"
                                    apiEndpoint={apiEndpoints.userProfileSetups.list}
                                    paramkey="name"
                                    valueKey="id"
                                    labelKey="role_name"
                                    pageNumberQueryKey="page_number"
                                    pageSizeQueryKey="page_size"
                                    defaultValuePageSize="1000"
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <FormTextField type="email" name="email" label="Email" />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <FormSelect
                                    name="status"
                                    label="Status"
                                    options={[
                                        {
                                            label: "Active",
                                            value: true,
                                        },
                                        {
                                            label: "Inactive",
                                            value: false,
                                        },
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Row justifyContent="flex-end" gap={1}>
                                    <ResetButton onClick={handleReset} />
                                    <SubmitButton />
                                </Row>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </HookForm>
        </Collapse>
    );
}
