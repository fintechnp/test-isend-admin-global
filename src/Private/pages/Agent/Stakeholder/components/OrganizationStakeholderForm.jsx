import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useFieldArray, useFormContext } from "react-hook-form";

import Row from "App/components/Row/Row";
import Link from "App/components/Link/Link";
import Column from "App/components/Column/Column";
import Center from "App/components/Center/Center";
import UploadFile from "App/core/upload/uploadFile";
import FormSelect from "App/core/hook-form/FormSelect";
import { localStorageGet } from "App/helpers/localStorage";
import SubmitButton from "App/components/Button/SubmitButton";
import FormTextField from "App/core/hook-form/FormTextField";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import CancelButton from "App/components/Button/CancelButton";
import FormInputWrapper from "App/core/hook-form/FormInputWrapper";
import OrganizationStakeholderSelect from "./OrganizationStakeholderSelect";
import FormGroupContainer from "App/components/Container/FormGroupContainer";

import ucwords from "App/helpers/ucwords";
import isEmpty from "App/helpers/isEmpty";
import { relatedTo } from "Private/data/b2b";
import { MarketMakerActions as actions } from "Private/pages/Agent/MarketMaker/store";
import routePaths from "Private/config/routePaths";

export default function OrganizationStakeholderForm({
    isAddMode = true,
    isProcessing,
    relatedTo,
    relatedId,
    stakeholderId,
}) {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { response, loading, success: isSuccess } = useSelector((state) => state.get_document_settings);

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

    const parentKybId = watch("parentKybId");

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

    const documents = watch("documents") ?? [];

    useEffect(() => {
        if (documents.length < 0) return;

        const documentSettings = response?.data;

        if (isAddMode && documentSettings?.length <= 0) {
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
                        <OrganizationStakeholderSelect
                            label="Parent Organization"
                            relatedTo={relatedTo}
                            relatedId={relatedId}
                            name="parentKybId"
                            value={parentKybId}
                            onChange={(_e, option) => {
                                setValue("parentKybId", option?.kybId ?? "");
                            }}
                            ignoreValues={[stakeholderId]}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="name" label="Name" required />
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
                        <FormSelect
                            name="registeredCountryId"
                            label="Country of Registration"
                            options={registeredCountyOptions ?? []}
                            required
                        />
                    </Grid>
                </Grid>
            </FormGroupContainer>
            <FormGroupContainer title="Address Details">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <FormSelect
                            name="address.countryId"
                            label="Address Country"
                            options={registeredCountyOptions ?? []}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="address.state" label="State/Province" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="address.city" label="City" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="address.postCode" label="PostCode/Zip Code" isOptional />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="address.unit" label="Unit" isOptional />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="address.street" label="Street" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="address.address" label="Address" required />
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
                                    </Row>{" "}
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

            <Row gap="1rem" justifyContent="flex-end">
                <CancelButton onClick={() => navigate(-1)} disabled={isProcessing} />
                <SubmitButton isLoading={isProcessing} />
            </Row>
        </Column>
    );
}

OrganizationStakeholderForm.propTypes = {
    isAddMode: PropTypes.bool,
    isProcessing: PropTypes.bool.isRequired,
    relatedTo: PropTypes.oneOf([relatedTo.AGENT, relatedTo.BUSINESS]).isRequired,
    relatedId: PropTypes.string.isRequired,
    stakeholderId: (props, propName, componentName) => {
        if (!props.isAddMode && !props[propName]) {
            return new Error(
                `Invalid prop \`${propName}\` supplied to \`${componentName}\`. ` +
                    `${propName} is required when isAddMode is false.`,
            );
        }
    },
};
