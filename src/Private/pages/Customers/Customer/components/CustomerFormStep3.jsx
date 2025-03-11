import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";

import FormFileField from "App/core/hook-form/FormFileField";
import FormTextField from "App/core/hook-form/FormTextField";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import FormSelectCountry from "App/core/hook-form/FormSelectCountry";

import { useFieldArray } from "react-hook-form";
import { useReactHookFormContext } from "App/core/hook-form/useReactHookForm";
import FormDocumentTypeSelect from "App/core/hook-form/FormDocumentTypeSelect";

export default function CustomerFormStep3({ isAddMode }) {
    const { watch } = useReactHookFormContext();

    const { fields } = useFieldArray({
        name: "customer_documents",
    });

    const registrationCountry = watch("country");

    return (
        <Grid container spacing="16px">
            <Grid item xs={12} md={6} lg={3}>
                <FormSelectCountry name="id_issued_country" label="ID Issued Country" required />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormDocumentTypeSelect
                    name="id_type"
                    label="Document  Type"
                    country={registrationCountry}
                    documentFor="KYC"
                    required
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormTextField name="id_number" label="Document Number" required />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormDatePicker name="id_issue_date" label="Issued Date" required />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormDatePicker name="id_expiry_date" label="Expiry Date" />
            </Grid>
            <Grid item xs={8} />
            {isAddMode && (
                <>
                    {fields.map((field, index) => (
                        <Grid key={field.id} item xs={12} md={6}>
                            <FormFileField
                                name={`customer_documents.${index}.document`}
                                label={field.form_label}
                                acceptedFiles={field.acceptedFiles}
                            />
                        </Grid>
                    ))}
                </>
            )}
        </Grid>
    );
}

CustomerFormStep3.propTypes = {
    isAddMode: PropTypes.bool,
};
