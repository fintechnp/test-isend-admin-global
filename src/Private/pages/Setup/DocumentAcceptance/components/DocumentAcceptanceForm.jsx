import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import "react-quill/dist/quill.snow.css";
import Link from "App/components/Link/Link";
import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import Row from "App/components/Row/Row";
import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormCheckbox from "App/core/hook-form/FormCheckbox";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import FormReferenceDataAutoComplete from "App/core/hook-form/FormReferenceDataAutoComplete";

import { useForm } from "react-hook-form";
import referenceTypeId from "Private/config/referenceTypeId";
import FormSelectCountry from "App/core/hook-form/FormSelectCountry";
import { documentAcceptanceSchema } from "../schema/documentAcceptanceSchema";
import { documentStatus, documentStatusOptions } from "../data/documentStatus";
import { documentFor as documentForConstant, documentForOptions } from "../data/documentFor";

const DocumentAcceptanceForm = ({
    initialValues,
    onSubmit,
    loading,
    handleClose,
    isAddMode = true,
    selectedCountryISO3,
    documentFor,
}) => {
    const methods = useForm({
        resolver: yupResolver(documentAcceptanceSchema),
        defaultValues: isAddMode
            ? {
                  document_for: documentForConstant.KYC,
                  status: documentStatus.ACTIVE,
              }
            : initialValues,
    });

    const { watch, setValue } = methods;

    const documentForValue = watch("document_for");

    useEffect(() => {
        if (selectedCountryISO3) setValue("country", selectedCountryISO3);
    }, [selectedCountryISO3]);

    useEffect(() => {
        if (documentFor) setValue("document_for", documentFor);
    }, [documentFor]);

    const addDocumentLink = useMemo(() => {
        if (documentForValue === documentForConstant.KYC) {
            return `/setup/reference/data/KYC Documents/${referenceTypeId.kycDocuments}`;
        }
        if (documentForValue === documentForConstant.KYB) {
            return `/setup/reference/data/KYB Documents/${referenceTypeId.kybDocuments}`;
        }
        return null;
    }, [documentForValue]);

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Grid container rowSpacing={2} spacing={2}>
                {isAddMode && (
                    <Grid item xs={12}>
                        <FormSelectCountry name="country" label="Country" />
                    </Grid>
                )}
                <Grid item xs={12}>
                    <FormSelect
                        name="document_for"
                        label="Document For"
                        options={documentForOptions}
                        onChange={() => {
                            setValue("document_type", "");
                        }}
                    />
                </Grid>
                {(documentForValue === documentForConstant.KYC || documentForValue === documentForConstant.KYB) && (
                    <Grid item xs={12}>
                        <FormReferenceDataAutoComplete
                            name="document_type"
                            label="Document Type"
                            labelKey="name"
                            valueKey="value"
                            referenceTypeId={
                                documentForValue === documentForConstant.KYC
                                    ? referenceTypeId.kycDocuments
                                    : referenceTypeId.kybDocuments
                            }
                        />
                        {addDocumentLink && (
                            <Row
                                gap="4px"
                                mt="4px"
                                sx={{
                                    "& .MuiTypography-root": {
                                        fontSize: "12px",
                                        fontStyle: "italic",
                                    },
                                }}
                            >
                                <Typography>Note: To add {documentForValue} Document Type</Typography>
                                <Link to={addDocumentLink}>Click Here.</Link>
                            </Row>
                        )}
                    </Grid>
                )}
                <Grid item xs={12}>
                    <FormSelect name="status" label="Status" options={documentStatusOptions} />
                </Grid>
                <Grid item xs={12}>
                    <FormCheckbox name="is_required" label="Is Required ?" />
                    <Alert severity="info">The required flag is used in B2B</Alert>
                </Grid>
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
