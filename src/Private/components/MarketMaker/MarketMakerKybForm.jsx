import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useFieldArray, useFormContext } from "react-hook-form";

import ucwords from "App/helpers/ucwords";
import Center from "App/components/Center/Center";
import UploadFile from "App/core/upload/uploadFile";
import FormSelect from "App/core/hook-form/FormSelect";
import { localStorageGet } from "App/helpers/localStorage";
import FormTextField from "App/core/hook-form/FormTextField";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import { AddButton, CancelButton } from "../AllButtons/Buttons";
import FormInputWrapper from "App/core/hook-form/FormInputWrapper";

import { MarketMakerActions as actions } from "Private/pages/Agent/MarketMaker/store";
import isEmpty from "App/helpers/isEmpty";
import Row from "App/components/Row/Row";
import FormGroupContainer from "App/components/Container/FormGroupContainer";
import Column from "App/components/Column/Column";

export default function MarketMakerKybForm({ isAddMode = true, formLoading }) {
    const dispatch = useDispatch();

    const { response, loading, success: isSuccess } = useSelector((state) => state.get_document_settings);

    const { response: kybData, loading: kybLoading } = useSelector((state) => state.get_business_kyb);

    const {
        watch,
        control,
        getValues,
        formState: { errors },
        setValue,
        clearErrors,
    } = useFormContext();

    const countries = localStorageGet("country");

    const registeredCountryId = watch("registeredCountryId");

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
        setValue("documents", []);
    }, [dispatch, registeredCountryId]);

    const documents = watch("documents") ?? [];

    useEffect(() => {
        if (documents.length < 0) return;

        const documentSettings = response?.data;

        documentSettings?.forEach((documentSetting) => {
            append({
                documentId: "",
                documentName: documentSetting.documentName,
                documentTypeId: documentSetting.requiredDocumentId,
                isRequired: documentSetting.isRequired,
            });
        });
    }, [response]);

    const registeredCountyOptions = countries?.map((c) => {
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
                        <FormTextField name="name" label="Name" />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormTextField name="registrationNo" label="Registration Number" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormDatePicker
                            name="registereddate"
                            label="Registration Date"
                            dateFormat="yyyy-MM-dd"
                            disableFuture
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormTextField name="brandName" label="Brand Name" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormSelect
                            name="registeredCountryId"
                            label="Country of Registration"
                            options={registeredCountyOptions ?? []}
                        />
                    </Grid>
                </Grid>
            </FormGroupContainer>
            <FormGroupContainer title="Address Details">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <FormSelect name="countryId" label="Address Country" options={registeredCountyOptions ?? []} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="postCode" label="PostCode" />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormTextField name="unit" label="Unit" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="state" label="State" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="street" label="Street" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="city" label="City" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="address" label="Address" />
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
                                    {" "}
                                    <Typography color="grey.700">Settings not found</Typography>
                                </Grid>
                            );
                        else
                            return (
                                <>
                                    {documents.map((document, i) => (
                                        <Grid key={document.documentTypeId} item xs={12} md={6}>
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

            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                columnSpacing={2}
                style={{ padding: "4px 0px", paddingRight: "4px" }}
            >
                <Grid item>
                    <AddButton
                        size="small"
                        variant="outlined"
                        type="submit"
                        loading={formLoading}
                        disabled={formLoading}
                        sx={{
                            padding: "4px 8px",
                        }}
                    >
                        {isAddMode ? "Add" : "Update"}
                    </AddButton>
                </Grid>
            </Grid>
        </Column>
    );
}
