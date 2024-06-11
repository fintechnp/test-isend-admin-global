import React from "react";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import "react-quill/dist/quill.snow.css";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";

const schema = Yup.object().shape({
    country: Yup.string().required("Country Name is required"),
    document_type: Yup.string().required("Document Type is required"),
    status: Yup.string().required("Status is required"),
});

const statusData = [
    {
        label: "Active",
        value: "active",
    },
    {
        label: "Inactive",
        value: "inactive",
    },
];

const DocumentAcceptanceForm = ({ initialValues, onSubmit, loading, handleClose, isAddMode }) => {
    const reference = JSON.parse(localStorage.getItem("reference"));

    const countriesList = JSON.parse(localStorage.getItem("country"));

    const finalCountriesList = countriesList.map((country) => ({
        label: country.country,
        value: country.iso3,
    }));

    console.log("Initial values", initialValues);

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialValues,
    });

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Grid container rowSpacing={2} columnSpacing={2}>
                {isAddMode && (
                    <Grid item xs={12} md={6}>
                        <FormSelect name="country" label="Country Name" options={finalCountriesList} />
                    </Grid>
                )}
                <Grid item xs={12} md={6}>
                    <FormSelect
                        name="document_type"
                        label="Document Type"
                        options={
                            reference &&
                            reference
                                ?.filter((ref_data) => ref_data.reference_type === 2)[0]
                                .reference_data.map((ref) => ({
                                    label: ref.name,
                                    value: ref.value,
                                }))
                        }
                    />
                </Grid>

                {isAddMode && (
                    <Grid item xs={12} md={6}>
                        <FormSelect name="status" label="status" options={statusData} />
                    </Grid>
                )}

                <Grid marginY={2} item xs={12}>
                    <ButtonWrapper>
                        <CancelButton onClick={handleClose} disabled={loading}>
                            Cancel
                        </CancelButton>
                        <SubmitButton isLoading={loading} isAddMode={isAddMode} />
                    </ButtonWrapper>
                </Grid>
            </Grid>
        </HookForm>
    );
};

export default DocumentAcceptanceForm;
