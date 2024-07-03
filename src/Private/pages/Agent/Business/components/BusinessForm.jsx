import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useFieldArray, useFormContext } from "react-hook-form";

import Row from "App/components/Row/Row";
import Link from "App/components/Link/Link";
import Center from "App/components/Center/Center";
import Column from "App/components/Column/Column";
import UploadFile from "App/core/upload/uploadFile";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import FormPhoneNumber from "App/core/hook-form/FormPhoneNumber";
import FormInputWrapper from "App/core/hook-form/FormInputWrapper";
import FormGroupContainer from "App/components/Container/FormGroupContainer";
import FormReferenceDataAutoComplete from "App/core/hook-form/FormReferenceDataAutoComplete";

import ucwords from "App/helpers/ucwords";
import isEmpty from "App/helpers/isEmpty";
import useConstants from "App/hooks/useConstants";
import routePaths from "Private/config/routePaths";
import referenceTypeId from "Private/config/referenceTypeId";
import { MarketMakerActions as actions } from "Private/pages/Agent/MarketMaker/store";
import FormSelectRegistrationCountry from "App/core/hook-form/FormSelectRegistrationCountry";

export default function BusinessForm({ isAddMode = true, isProcessing }) {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { response, loading, success: isSuccess } = useSelector((state) => state.get_document_settings);

    const {
        watch,
        control,
        getValues,
        formState: { errors },
        setValue,
        clearErrors,
    } = useFormContext();

    const { countries } = useConstants();

    const registeredCountryId = watch("registeredCountryId");

    const contactPersonCountryId = watch("contactPersonCountryId");

    const { append, update } = useFieldArray({
        control,
        name: "documents",
    });

    useEffect(() => {
        if (!registeredCountryId) return;
        dispatch(
            actions.get_document_settings({
                countryId: registeredCountryId,
                documentFor: "KYB",
            }),
        );
    }, [dispatch, registeredCountryId]);

    useEffect(() => {
        if (!contactPersonCountryId) return;
        const country = countries.find((c) => c.country_id === contactPersonCountryId);
        setValue("contactPersonExtension", country.phone_code);
    }, [contactPersonCountryId]);

    const documents = watch("documents") ?? [];

    useEffect(() => {
        if (documents.length < 0) return;

        const documentSettings = response?.data;

        if (documentSettings?.length <= 0) {
            setValue("documents", []);
            return;
        }

        documentSettings?.forEach((documentSetting) => {
            const index = documents.findIndex((d) => d.documentTypeId === documentSetting.requiredDocumentId);

            if (index === -1) {
                append({
                    documentId: "",
                    documentName: documentSetting.documentName,
                    documentTypeId: documentSetting.requiredDocumentId,
                    isRequired: documentSetting.isRequired,
                });
            } else {
                update(index, {
                    ...documents[index],
                    isFieldRequired: documentSetting.isRequired,
                });
            }
        });
    }, [response]);

    const countryOptions = countries?.map((c) => {
        return {
            label: ucwords(c.country),
            value: c.country_id,
        };
    });

    const handleFileUploadSuccess = (document, documentId) => {
        const index = getValues("documents").findIndex((d) => d.documentTypeId === document.documentTypeId);

        update(index, {
            ...documents[index],
            ...{ documentId },
        });

        clearErrors(`documents.${index}.documentId`);
    };

    const handleRemove = (document) => {
        const index = getValues("documents").findIndex((d) => d.documentTypeId === document.documentTypeId);

        update(index, {
            ...documents[index],
            ...{ documentId: "" },
            file: undefined,
        });
    };

    const handleChange = (document, file) => {
        const index = getValues("documents").findIndex((d) => d.documentTypeId === document.documentTypeId);

        update(index, {
            ...documents[index],
            ...{ documentId: "" },
            file,
        });
    };

    return (
        <Column gap="16px">
            <FormGroupContainer title="Organization Details">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="name" label="Name" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormSelectRegistrationCountry
                            name="registeredCountryId"
                            label="Registered Country"
                            valueKey="country_id"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="registrationNo" label="Registration Number" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormDatePicker
                            name="registeredDate"
                            label="Registration Date"
                            dateFormat="yyyy-MM-dd"
                            disableFuture
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormTextField name="brandName" label="Brand Name" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="phoneNo" label="Phone Number" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="email" label="Email" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormReferenceDataAutoComplete
                            label="Business Type"
                            name="typeOfBusinessId"
                            referenceTypeId={referenceTypeId.businessTypes}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="website" label="Website" isOptional />
                    </Grid>
                </Grid>
            </FormGroupContainer>
            <FormGroupContainer title="Address Details">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <FormSelect name="addressCountry" label="Country" options={countryOptions ?? []} required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="addressState" label="State/Province" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="addressCity" label="City" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="addressPostCode" label="PostCode/Zip Code" isOptional />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="addressUnit" label="Unit" isOptional />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormTextField name="addressStreet" label="Street" required />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormTextField name="address" label="Address" required />
                    </Grid>
                </Grid>
            </FormGroupContainer>
            <FormGroupContainer title="Contact Person Details">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="contactPersonName" label="Name" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormReferenceDataAutoComplete
                            name="contactPersonDesignationId"
                            label="Designation"
                            referenceTypeId={referenceTypeId.designations}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormSelect
                            name="contactPersonCountryId"
                            label="Country"
                            options={countryOptions ?? []}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="contactPersonEmail" label="Email" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormPhoneNumber
                            label="Mobile Number"
                            name="contactPersonMobileNumber"
                            dialingCodeName="contactPersonExtension"
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormPhoneNumber
                            name="contactPersonPhoneNumber"
                            label="Phone Number"
                            dialingCodeName="contactPersonExtension"
                            required
                        />
                    </Grid>
                </Grid>
            </FormGroupContainer>
            <FormGroupContainer title="Upload Documents">
                <Grid container spacing={3} p="16px">
                    {(() => {
                        if (loading)
                            return (
                                <Grid item xs={12}>
                                    <Center sx={{ width: "100%", py: 5 }}>
                                        <CircularProgress />
                                    </Center>
                                </Grid>
                            );
                        else if (isEmpty(registeredCountryId))
                            return (
                                <Grid item xs={12}>
                                    <Typography color="grey.700">Select Country of Registration</Typography>
                                </Grid>
                            );
                        else if (isSuccess && documents.length <= 0)
                            return (
                                <Grid item xs={12}>
                                    <Row>
                                        <Typography color="grey.700">
                                            Document setting not found for selected country of registration. &nbsp;
                                        </Typography>
                                        <Link to={routePaths.documentAcceptance.index}>Click Here</Link> &nbsp;
                                        <Typography color="grey.700"> to add document setting. </Typography>
                                    </Row>
                                </Grid>
                            );
                        else
                            return (
                                <>
                                    {documents.map((document, index) => (
                                        <Grid key={index} item xs={12} md={6}>
                                            <FormInputWrapper
                                                label={document.documentName}
                                                isOptional={!document.isRequired}
                                                errorMessage={errors?.documents?.[i]?.documentId?.message}
                                            >
                                                <UploadFile
                                                    title={`Upload your ${document.documentName}`}
                                                    supportedFileDescription="Supported file formats: PDF, JPG, PNG."
                                                    allowedFileTypes={[
                                                        "application/pdf",
                                                        "image/jpeg",
                                                        "image/png",
                                                        "image/jpg",
                                                    ]}
                                                    onFileRemove={() => handleRemove(document)}
                                                    onUploadSuccess={(id) => handleFileUploadSuccess(document, id)}
                                                    error={!!errors?.documents?.[i]?.documentId?.message}
                                                    onChange={(file) => handleChange(document, file)}
                                                    file={document?.file ?? document?.documentLink}
                                                    fileType={document?.fileType}
                                                    documentName={document?.documentName}
                                                />
                                            </FormInputWrapper>
                                        </Grid>
                                    ))}
                                </>
                            );
                    })()}
                </Grid>
            </FormGroupContainer>

            <Row justifyContent="flex-end" gap="16px">
                <CancelButton onClick={() => navigate(-1)} disabled={isProcessing} />
                <SubmitButton isLoading={isProcessing} />
            </Row>
        </Column>
    );
}
