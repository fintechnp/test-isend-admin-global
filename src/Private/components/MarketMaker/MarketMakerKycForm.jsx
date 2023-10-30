import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useFieldArray, useFormContext } from "react-hook-form";

import ucwords from "App/helpers/ucwords";
import { AddButton } from "../AllButtons/Buttons";
import Center from "App/components/Center/Center";
import UploadFile from "App/core/upload/uploadFile";
import FormSelect from "App/core/hook-form/FormSelect";
import { localStorageGet } from "App/helpers/localStorage";
import FormTextField from "App/core/hook-form/FormTextField";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import FormInputWrapper from "App/core/hook-form/FormInputWrapper";
import { MarketMakerActions as actions } from "Private/pages/MarketMaker/store";

import { businessActions } from "Private/pages/Business/store";

const genderOptions = [
    {
        label: "None",
        value: 0,
    },
    {
        label: "Male",
        value: 1,
    },
    {
        label: "Female",
        value: 2,
    },
    {
        label: "Third",
        value: 3,
    },
    {
        label: "Other",
        value: 4,
    },
];

export default function MarketMakerKycForm({ formLoading, isAddMode = true, isUserKyc = false }) {
    const dispatch = useDispatch();
    const { marketMakerId } = useParams();

    const { response, loading } = useSelector((state) => state.get_document_settings);
    const { response: kybData, loading: kybLoading } = useSelector((state) => state.get_business_kyb);

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (isUserKyc) return;
        dispatch(businessActions.get_business_kyb({ marketMakerId }));
    }, []);

    const {
        setValue,
        getValues,
        control,
        watch,
        formState: { errors },
        clearErrors,
    } = useFormContext();

    const { append, update } = useFieldArray({
        control,
        name: "documents",
    });

    const countries = localStorageGet("country");

    const reference = localStorageGet("reference");

    const relatedKybOptions = kybData?.data?.map((item) => {
        return {
            label: item.name,
            value: item.kybId,
        };
    });

    const designationOptions = reference
        ?.find((item) => item.reference_type === 101)
        ?.reference_data?.map((item) => {
            return {
                label: item.name,
                value: item.reference_id,
            };
        });

    const identityTypeOptions = reference
        ?.find((item) => item.reference_type === 2)
        ?.reference_data?.map((item) => {
            return {
                label: item.name,
                value: item.reference_id,
            };
        });

    const countyOptions = countries?.map((c) => {
        return {
            label: ucwords(c.country),
            value: c.country_id,
        };
    });

    const identityIssuedCountryId = watch("identityIssuedCountryId");

    useEffect(() => {
        if (!identityIssuedCountryId) return;
        dispatch(
            actions.get_document_settings({
                countryId: identityIssuedCountryId,
                documentFor: "KYC",
            }),
        );
        setValue("documents", []);
    }, [dispatch, identityIssuedCountryId]);

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

    useEffect(() => {
        if (isChecked) {
            setValue("permanentAddressCountryId", getValues("temporaryAddressCountryId"));
            setValue("permanentAddressPostCode", getValues("temporaryAddressPostCode"));
            setValue("permanentAddressUnit", getValues("temporaryAddressUnit"));
            setValue("permanentAddressStreet", getValues("temporaryAddressStreet"));
            setValue("permanentAddressCity", getValues("temporaryAddressCity"));
            setValue("permanentAddressState", getValues("temporaryAddressState"));
            setValue("permanentAddressAddress", getValues("temporaryAddressAddress"));
        } else {
            setValue("permanentAddressCountryId", "");
            setValue("permanentAddressPostCode", "");
            setValue("permanentAddressUnit", "");
            setValue("permanentAddressStreet", "");
            setValue("permanentAddressCity", "");
            setValue("permanentAddressState", "");
            setValue("permanentAddressAddress", "");
        }
    }, [isChecked]);

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
                    {!isUserKyc && (
                        <Grid item xs={12} md={3}>
                            <FormSelect
                                name="relatedKybId"
                                label="KYB"
                                options={relatedKybOptions ?? []}
                                disabled={!isAddMode}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12} md={3}>
                        <FormTextField name="firstName" label="First Name" />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormTextField name="middleName" label="Middle Name" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="lastName" label="Last Name" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormDatePicker
                            name="dateOfBirth"
                            label="Date of Birth"
                            dateFormat="yyyy-MM-dd"
                            disableFuture
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormSelect name="birthCountryId" label="Birth Country" options={countyOptions ?? []} />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormTextField name="mobileNumber" label="Mobile Number" />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormSelect name="gender" label="Gender" options={genderOptions ?? []} />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormSelect name="identityTypeId" label="Identity Type" options={identityTypeOptions ?? []} />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormTextField name="identityNo" label="Identity No" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="identityIssuedBy" label="Identity Issued By" />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormSelect
                            name="identityIssuedCountryId"
                            label="identity Issued Country"
                            options={countyOptions ?? []}
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormDatePicker
                            name="identityIssuedDate"
                            label="Identity Issued Date"
                            dateFormat="yyyy-MM-dd"
                            disableFuture
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormDatePicker
                            name="identityExpiryDate"
                            label="Identity Expiry Date (Optional)"
                            dateFormat="yyyy-MM-dd"
                            disablePast
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormSelect name="designationId" label="Designation" options={designationOptions ?? []} />
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    px: 2,
                    py: 1,
                    mt: 3,
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                }}
            >
                <Typography fontSize={17} fontWeight={600}>
                    Temporary Address
                </Typography>
                <Divider
                    sx={{
                        my: 2,
                    }}
                />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <FormSelect name="temporaryAddressCountryId" label="Country" options={countyOptions ?? []} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="temporaryAddressPostCode" label="Post Code" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="temporaryAddressUnit" label="Unit" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="temporaryAddressStreet" label="Street" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="temporaryAddressCity" label="City" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="temporaryAddressState" label="State" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="temporaryAddressAddress" label="Address" />
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    mt: 3,
                }}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isChecked}
                            onChange={(e) => {
                                setIsChecked(e.target.checked);
                            }}
                        />
                    }
                    label="Same as temporary address"
                />
            </Box>

            <Box
                sx={{
                    px: 2,
                    py: 1,
                    mt: 3,
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                }}
            >
                <Typography fontSize={17} fontWeight={600}>
                    Permanent Address
                </Typography>
                <Divider
                    sx={{
                        my: 2,
                    }}
                />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <FormSelect name="permanentAddressCountryId" label="Country" options={countyOptions ?? []} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="permanentAddressPostCode" label="Post Code" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="permanentAddressUnit" label="Unit" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="permanentAddressStreet" label="Street" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="permanentAddressCity" label="City" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="permanentAddressState" label="State" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="permanentAddressAddress" label="Address" />
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
                            {identityIssuedCountryId &&
                                documents.map((document, i) => (
                                    <Grid key={document.documentTypeId} item xs={12} md={6}>
                                        <FormInputWrapper
                                            label={document.documentName}
                                            errorMessage={errors?.documents?.[i]?.documentId?.message}
                                            isOptional={!document.isRequired}
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
