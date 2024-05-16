import React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import Row from "App/components/Row/Row";
import HookForm from "App/core/hook-form/HookForm";
import FormTextField from "App/core/hook-form/FormTextField";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";

const MakePaymentForm = ({ method, onSubmit, loading, handleClose }) => {
    return (
        <HookForm onSubmit={method.handleSubmit(onSubmit)} {...method}>
            <Grid container>
                <Grid item xs={12}>
                    <FormTextField disabled name="transactionRefNo" label="Transaction Ref No" />
                </Grid>

                <Divider />

                <Grid item xs={12} mt={4}>
                    <FormTextField name="amount" label="Amount" />
                </Grid>

                <Grid item xs={12} mt={4}>
                    <FormTextField name="remarks" label="remarks" />
                </Grid>

                <Grid item xs={12} mt={4}>
                    <Row gap={2} justifyContent="flex-end">
                        <SubmitButton disabled={loading} size="medium" variant="outlined" type="submit">
                            Submit
                        </SubmitButton>

                        <CancelButton onClick={handleClose} size="medium" variant="outlined">
                            Cancel
                        </CancelButton>
                    </Row>
                </Grid>
            </Grid>
        </HookForm>
    );
};

export default MakePaymentForm;
