import React from "react";
import Grid from "@mui/material/Grid";
import { Field, Form, reduxForm } from "redux-form";

import TextField from "App/components/Fields/TextField";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";
import ButtonWrapper from "App/components/Fields/Forms/ButtonWrapper";

function UserIPWhitelistFilterForm({ handleSubmit, handleReset }) {
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Field name="search" placeholder="Enter a username" small={12} component={TextField} />
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonWrapper>
                            <CancelButton onClick={handleReset}>Reset</CancelButton>
                            <SubmitButton type="submit">Filter</SubmitButton>
                        </ButtonWrapper>
                    </Grid>
                </Grid>
            </Grid>
        </Form>
    );
}

export default reduxForm({ form: "search_form_beneficiary_reports" })(UserIPWhitelistFilterForm);
