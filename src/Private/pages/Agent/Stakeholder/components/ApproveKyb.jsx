import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import HookForm from "App/core/hook-form/HookForm";
import FormTextField from "App/core/hook-form/FormTextField";
import SubmitButton from "App/components/Button/SubmitButton";
import FormReferenceDataAutoComplete from "App/core/hook-form/FormReferenceDataAutoComplete";

import referenceTypeId from "Private/config/referenceTypeId";
import { useForm } from "react-hook-form";
import Row from "App/components/Row/Row";
import { useDispatch } from "react-redux";

export default function ApproveKybKyc() {
    const dispatch = useDispatch();

    const handleSubmit = () => {
        //
    };

    const methods = useForm();

    return (
        <Box mt={2}>
            <HookForm onSubmit={handleSubmit} {...methods}>
                <Grid container item xs={12} spacing={2}>
                    <Typography fontWeight={600} px="1rem" mb="1rem">
                        Approve or Reject Status
                    </Typography>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormReferenceDataAutoComplete
                            name="status"
                            label="Status"
                            referenceTypeId={referenceTypeId.kybKycStatuses}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="remarks" label="Remarks" multiline />
                    </Grid>
                    <Grid item xs={12}>
                        <Row justifyContent="flex-end">
                            <SubmitButton />
                        </Row>
                    </Grid>
                </Grid>
            </HookForm>
        </Box>
    );
}
