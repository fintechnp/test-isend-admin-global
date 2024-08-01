import React from "react";
import Grid from "@mui/material/Grid";

import FormTextField from "App/core/hook-form/FormTextField";

import referenceTypeId from "Private/config/referenceTypeId";
import FormReferenceDataAutoComplete from "App/core/hook-form/FormReferenceDataAutoComplete";

const BasicForm = () => {
    return (
        <Grid container spacing="16px">
            <Grid item xs={12} md={6} lg={3}>
                <FormReferenceDataAutoComplete
                    name="relation"
                    label="Relation"
                    labelKey="name"
                    valueKey="value"
                    referenceTypeId={referenceTypeId.relations}
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormTextField name="first_name" label="First Name" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormTextField name="middle_name" label="Middle Name" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormTextField name="last_name" label="Last Name" />
            </Grid>
        </Grid>
    );
};

export default BasicForm;
