import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { useNavigate, useParams, Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useFieldArray, useFormContext } from "react-hook-form";

import Row from "App/components/Row/Row";
import Center from "App/components/Center/Center";
import Column from "App/components/Column/Column";
import UploadFile from "App/core/upload/uploadFile";
import FormTextField from "App/core/hook-form/FormTextField";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import FormInputWrapper from "App/core/hook-form/FormInputWrapper";
import FormSelectCountry from "App/core/hook-form/FormSelectCountry";
import OrganizationStakeholderSelect from "./OrganizationStakeholderSelect";
import FormGroupContainer from "App/components/Container/FormGroupContainer";
import FormReferenceDataAutoComplete from "App/core/hook-form/FormReferenceDataAutoComplete";

import isEmpty from "App/helpers/isEmpty";
import { relatedTo } from "Private/data/b2b";
import { GenderOptions } from "App/data/Gender";
import routePaths from "Private/config/routePaths";
import referenceTypeId from "Private/config/referenceTypeId";
import { MarketMakerActions as actions } from "Private/pages/Agent/MarketMaker/store";
import FormSelect from "App/core/hook-form/FormSelect";

export default function IndividualStakeholderForm({ isAddMode = true, isProcessing, relatedTo, relatedId }) {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { response, loading: isLoading, success: isSuccess } = useSelector((state) => state.get_document_settings);

    const [isChecked, setIsChecked] = useState(false);

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

    const parentKybId = watch("relatedKybId");

    const identityIssuedCountryId = watch("identityIssuedCountryId");

    useEffect(() => {
        if (!identityIssuedCountryId) return;

        dispatch(
            actions.get_document_settings({
                countryId: identityIssuedCountryId,
                documentFor: "KYC",
            }),
        );
    }, [dispatch, identityIssuedCountryId]);

    const documents = watch("documents") ?? [];

    useEffect(() => {
        if (documents.length < 0 || isLoading) return;

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

    const onChangeSameAsPermanentAddress = (e) => {
        const checked = e.target.checked;
        setIsChecked(checked);
        if (checked) {
            setValue("temporaryAddress", getValues("permanentAddress"));
        } else {
            setValue("temporaryAddress", {});
        }
    };

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
        <Column gap="1rem">
            <FormGroupContainer title="Personal Details">
                <Grid container spacing="1rem">
                    <Grid item xs={12} md={3}>
                        <OrganizationStakeholderSelect
                            label="Organization"
                            relatedTo={relatedTo}
                            relatedId={relatedId}
                            name="relatedKybId"
                            value={parentKybId}
                            onChange={(_e, option) => {
                                setValue("relatedKybId", option?.kybId ?? "");
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="firstName" label="First Name" required />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormTextField name="middleName" label="Middle Name" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="lastName" label="Last Name" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormDatePicker
                            name="dateOfBirth"
                            label="Date of Birth"
                            dateFormat="yyyy-MM-dd"
                            disableFuture
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormReferenceDataAutoComplete
                            name="designationId"
                            label="Designation"
                            referenceTypeId={referenceTypeId.designations}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormSelectCountry name="birthCountryId" label="Birth Country" valueKey="country_id" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="mobileNumber" label="Mobile Number" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormSelect name="gender" label="Gender" options={GenderOptions} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormSelectCountry
                            name="identityIssuedCountryId"
                            label="Identity Issued Country"
                            valueKey="country_id"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormReferenceDataAutoComplete
                            name="identityTypeId"
                            label="Identity Type"
                            referenceTypeId={referenceTypeId.identityTypes}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="identityNo" label="Identity Number" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="identityIssuedBy" label="Identity Issued By" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormDatePicker
                            name="identityIssuedDate"
                            label="Identity Issued Date"
                            dateFormat="yyyy-MM-dd"
                            disableFuture
                            required
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
                </Grid>
            </FormGroupContainer>
            <FormGroupContainer title="Permanent Address">
                <Grid container spacing="1rem">
                    <Grid item xs={12} md={3}>
                        <FormSelectCountry
                            name="permanentAddress.countryId"
                            label="Country"
                            valueKey="country_id"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="permanentAddress.state" label="State" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="permanentAddress.city" label="City" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="permanentAddress.postCode" label="Post Code" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="permanentAddress.unit" label="Unit ( Optional )" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="permanentAddress.street" label="Street" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="permanentAddress.address" label="Address" required />
                    </Grid>
                </Grid>
            </FormGroupContainer>
            <FormGroupContainer
                title="Temporary Address"
                actions={
                    <FormControlLabel
                        control={<Checkbox checked={isChecked} onChange={onChangeSameAsPermanentAddress} />}
                        label="Same as permanent address"
                    />
                }
            >
                <Grid container spacing="1rem">
                    <Grid item xs={12} md={3}>
                        <FormSelectCountry
                            name="temporaryAddress.countryId"
                            label="Country"
                            valueKey="country_id"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="temporaryAddress.state" label="State" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="temporaryAddress.city" label="City" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="temporaryAddress.postCode" label="Post Code" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="temporaryAddress.unit" label="Unit ( Optional )" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="temporaryAddress.street" label="Street" required />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="temporaryAddress.address" label="Address" required />
                    </Grid>
                </Grid>
            </FormGroupContainer>

            <FormGroupContainer title="Upload Documents">
                <Grid container spacing="1rem">
                    {(() => {
                        if (isLoading)
                            return (
                                <Grid item xs={12}>
                                    <Center sx={{ width: "100%", py: 5 }}>
                                        <CircularProgress />
                                    </Center>
                                </Grid>
                            );
                        else if (isEmpty(identityIssuedCountryId))
                            return (
                                <Grid item xs={12}>
                                    <Typography color="grey.700">Select a Identity Issued Country</Typography>
                                </Grid>
                            );
                        else if (isSuccess && documents.length <= 0)
                            return (
                                <Grid item xs={12}>
                                    <Row>
                                        <Typography color="grey.700">
                                            Document setting not found for selected identity issued country. &nbsp;
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
                            );
                    })()}
                </Grid>
            </FormGroupContainer>

            <Row justifyContent="flex-end" gap="1rem">
                <CancelButton onClick={() => navigate(-1)} disabled={isProcessing} />
                <SubmitButton isLoading={isProcessing} />
            </Row>
        </Column>
    );
}

IndividualStakeholderForm.propTypes = {
    isAddMode: PropTypes.bool,
    isProcessing: PropTypes.bool.isRequired,
    relatedTo: PropTypes.oneOf([relatedTo.AGENT, relatedTo.BUSINESS]).isRequired,
    relatedId: PropTypes.string.isRequired,
};
