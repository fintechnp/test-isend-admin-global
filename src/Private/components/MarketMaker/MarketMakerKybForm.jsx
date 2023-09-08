import { Box, CircularProgress, Divider, Grid, Typography } from "@mui/material";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import UploadFile from "App/core/upload/uploadFile";
import { localStorageGet } from "App/helpers/localStorage";
import ucwords from "App/helpers/ucwords";
import React, { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { MarketMakerActions as actions } from "Private/pages/MarketMaker/store";
import Center from "App/components/Center/Center";
import FormInputWrapper from "App/core/hook-form/FormInputWrapper";
import { AddButton, CancelButton } from "../AllButtons/Buttons";

export default function MarketMakerKybForm({ isAddMode = true, formLoading }) {
    const dispatch = useDispatch();

    const { response, loading } = useSelector((state) => state.get_document_settings);

    const {
        watch,
        control,
        getValues,
        formState: { errors },
        setError,
        setValue,
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

    useEffect(() => {
        const documentSettings = response?.data;
        documentSettings?.forEach((documentSetting) => {
            append({
                documentId: "",
                documentName: documentSetting.documentName,
                documentTypeId: documentSetting.requiredDocumentId,
            });
        });
    }, [response]);

    const documents = watch("documents") ?? [];

    const registeredCountyOptions = countries?.map((c) => {
        return {
            label: ucwords(c.country),
            value: c.country_id,
        };
    });
    const addressCountyOptions = countries?.map((c) => {
        return {
            label: ucwords(c.country),
            value: c.iso3,
        };
    });

    const handleFileUploadSuccess = (document, documentId) => {
        const index = getValues("documents").findIndex((d) => d.documentTypeId === document.documentTypeId);

        update(index, {
            ...documents[index],
            ...{ documentId },
        });
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
        <>
            <Box
                sx={{
                    px: 2,
                    py: 1,
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                }}
            >
                <Typography fontSize={17} fontWeight={600}>
                    Personal Details
                </Typography>
                <Divider
                    sx={{
                        my: 2,
                    }}
                />
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
                    <Grid item xs={12} md={3}>
                        <FormTextField name="registeredEntity" label="Registered Entity" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="businessType" label="Business Type" />
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    mt: 3,
                    px: 2,
                    py: 1,
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                }}
            >
                <Typography fontSize={17} fontWeight={600}>
                    Address Details
                </Typography>
                <Divider
                    sx={{
                        my: 2,
                    }}
                />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <FormSelect name="country" label="Address Country" options={addressCountyOptions ?? []} />
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
            </Box>

            <Box
                sx={{
                    mt: 3,
                    px: 2,
                    py: 1,
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                }}
            >
                <Typography fontSize={17} fontWeight={600}>
                    Upload Documents
                </Typography>
                <Divider
                    sx={{
                        my: 2,
                    }}
                />

                <Grid container spacing={3}>
                    {loading ? (
                        <Center sx={{ width: "100%", py: 5 }}>
                            <CircularProgress />
                        </Center>
                    ) : (
                        <>
                            {registeredCountryId &&
                                documents.map((document, i) => (
                                    <Grid key={document.documentTypeId} item xs={12} md={6}>
                                        <FormInputWrapper
                                            label={document.documentName}
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
                                                file={document?.file ?? document?.fileUrl}
                                                fileType={document?.fileType}
                                            />
                                        </FormInputWrapper>
                                    </Grid>
                                ))}
                        </>
                    )}
                </Grid>
            </Box>

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
        </>
    );
}
