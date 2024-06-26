import { format } from "date-fns";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFieldArray, useFormContext } from "react-hook-form";

import Row from "App/components/Row/Row";
import Center from "App/components/Center/Center";
import Column from "App/components/Column/Column";
import UploadFile from "App/core/upload/uploadFile";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import FormPhoneNumber from "App/core/hook-form/FormPhoneNumber";
import FormMultiSelect from "App/core/hook-form/FormMultiSelect";
import FormInputWrapper from "App/core/hook-form/FormInputWrapper";
import CircularProgress from "App/components/Loading/CircularProgress";
import FormGroupContainer from "App/components/Container/FormGroupContainer";
import FormReferenceDataAutoComplete from "App/core/hook-form/FormReferenceDataAutoComplete";

import isEmpty from "App/helpers/isEmpty";
import ucwords from "App/helpers/ucwords";
import routePaths from "Private/config/routePaths";
import { localStorageGet } from "App/helpers/localStorage";
import referenceTypeId from "Private/config/referenceTypeId";
import { MarketMakerActions as actions } from "Private/pages/Agent/MarketMaker/store";
import FormSelectCountry from "App/core/hook-form/FormSelectCountry";
import FormMobileNumber from "App/core/hook-form/FormMobileNumber";

export default function MarketMakerForm({ isAddMode = true }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countries = localStorageGet("country");
    const reference = localStorageGet("reference");

    const {
        setValue,
        watch,
        getValues,
        control,
        formState: { errors },
        clearErrors,
    } = useFormContext();

    const { append, update } = useFieldArray({
        name: "documents",
        control,
    });

    const { loading, success } = useSelector((state) => state.add_market_maker);

    const { loading: updating, success: updateSuccess } = useSelector((state) => state.update_market_maker);

    const {
        response: documentResponse,
        loading: documentLoading,
        success: isGetDocumentSettingSuccess,
    } = useSelector((state) => state.get_document_settings);

    const registeredCountyOptions =
        localStorageGet("sendCountry")?.map((item) => {
            return {
                label: ucwords(item.country),
                value: item.country_id,
            };
        }) ?? [];

    const designationOptions = reference
        ?.find((item) => item.reference_type === referenceTypeId.designations)
        ?.reference_data?.map((item) => {
            return {
                label: item.name,
                value: item.reference_id,
            };
        });

    const allowedCountries = countries?.map((c) => {
        return {
            label: ucwords(c.country),
            value: c.country_id,
        };
    });

    const currencyOptions = countries?.map((c) => {
        return {
            label: ucwords(c.currency_name),
            value: c.currency,
        };
    });

    const totalAllowedCountrySelectedCount = (getValues("allowedCountryIds") ?? []).length;

    useEffect(() => {
        if (isAddMode) {
            setValue("registereddate", format(new Date(), "yyyy-MM-dd"));
        }
    }, []);

    const registeredCountryId = watch("registeredCountryId");

    useEffect(() => {
        if (!registeredCountryId || !isAddMode) return;

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

        const documentSettings = documentResponse?.data;

        if (isAddMode && documentSettings?.length <= 0) {
            setValue("documents", []);
            return;
        }

        documentSettings?.forEach((documentSetting) => {
            const index = documents.findIndex((d) => d.documentTypeId == documentSetting.requiredDocumentId);

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
    }, [documentResponse]);

    useEffect(() => {
        if (isAddMode && registeredCountryId) {
            const selectedCounty = countries?.find((item) => item?.country_id === registeredCountryId);
            setValue("currencyId", selectedCounty?.currency ?? "");
            setValue("countryId", registeredCountryId);
        }
    }, [registeredCountryId]);

    useEffect(() => {
        if (success || updateSuccess) {
            navigate(routePaths.ListAgent);
        }
    }, [success, updateSuccess]);

    const handleFileUploadSuccess = (document, documentId) => {
        const index = documents.findIndex((d) => d.documentTypeId === document.documentTypeId);

        update(index, {
            ...documents[index],
            ...{ documentId },
        });

        clearErrors(`documents.${index}.documentId`);
    };

    const handleRemove = (document) => {
        const index = documents.findIndex((d) => d.documentTypeId === document.documentTypeId);

        update(index, {
            ...documents[index],
            ...{ documentId: "" },
            file: undefined,
        });
    };

    const handleChange = (document, file) => {
        const index = documents.findIndex((d) => d.documentTypeId === document.documentTypeId);

        update(index, {
            ...documents[index],
            ...{ documentId: "" },
            file,
        });
    };

    return (
        <Column gap="16px">
            <FormGroupContainer title="Agent Details">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="name" label="Name" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormReferenceDataAutoComplete
                            name="typeOfBusinessId"
                            label="Business Type"
                            referenceTypeId={referenceTypeId.businessTypes}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="registrationNo" label="Registration Number" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="brandName" label="Brand Name" />
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
                        <FormSelect
                            name="registeredCountryId"
                            label="Country of Registration"
                            options={registeredCountyOptions ?? []}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormSelect name="currencyId" label="Currency" options={currencyOptions ?? []} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="contactNo" label="Contact Number" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="email" label="Email" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="website" label="Website" />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormMultiSelect
                            name="allowedCountryIds"
                            label={`Allowed Countries ( ${totalAllowedCountrySelectedCount} selected )`}
                            multiple
                            options={allowedCountries ?? []}
                        />
                    </Grid>
                </Grid>
            </FormGroupContainer>
            <FormGroupContainer title="Address Details">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <FormSelect name="address.countryId" label="Address Country" options={allowedCountries ?? []} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="address.state" label="State" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="address.city" label="City" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="address.postCode" label="PostCode" />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormTextField name="address.unit" label="Unit" />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormTextField name="address.street" label="Street" />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormTextField name="address.address" label="Address" />
                    </Grid>
                </Grid>
            </FormGroupContainer>
            <FormGroupContainer title="Contact Person Details">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="contactPerson.name" label="Name" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormSelect
                            name="contactPerson.designationId"
                            label="Designation"
                            options={designationOptions ?? []}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormSelectCountry
                            name="contactPerson.countryId"
                            label="Country"
                            valueKey="country_id"
                            onSelected={(country) => {
                                setValue("contactPerson.extension", country.phone_code);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormTextField name="contactPerson.email" label="Email" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormPhoneNumber
                            name="contactPerson.mobileNo"
                            label="Mobile Number"
                            dialingCodeName="contactPerson.extension"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormPhoneNumber
                            name="contactPerson.phoneNo"
                            label="Phone Number"
                            dialingCodeName="contactPerson.extension"
                        />
                    </Grid>
                </Grid>
            </FormGroupContainer>
            {isAddMode && (
                <FormGroupContainer title="Login Details">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                            <FormTextField name="loginEmail" label="Email" />
                        </Grid>
                    </Grid>
                </FormGroupContainer>
            )}

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
                        else if (isGetDocumentSettingSuccess && documents.length <= 0)
                            return (
                                <Grid item xs={12}>
                                    <Row>
                                        <Typography color="grey.700">
                                            Document setting not found for selected country of registration. &nbsp;
                                        </Typography>
                                        <Link to="/">Click Here</Link> &nbsp;
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
                {/*                     )}
                </Grid>
                    ) : (
                        <>
                        </>
                        </Center>
                                ))}
                    {documentLoading ? (
                                        >
                                    </Grid>
                <Grid container spacing={3}>
                                            />
                            <CircularProgress />
                                                ]}
                                                }}
                            {registeredCountryId &&
                                            <UploadFile
                                        <FormInputWrapper
                                        </FormInputWrapper>
                        <Center sx={{ width: "100%", py: 5 }}>
                                documents.map((document, i) => (
                                                    "image/png",
                                                    "image/jpg",
                                                    "image/jpeg",
                                                allowedFileTypes={[
                                    <Grid key={i} item xs={12} md={6}>
                                                    "application/pdf",
                                            label={document.documentName}
                                                onUploadSuccess={(id) => {
                                            isOptional={!document.isRequired}
                                                fileType={document?.fileType}
                                                documentName={document?.documentName}
                                                    handleFileUploadSuccess(document, id);
                                                onFileRemove={() => handleRemove(document)}
                                                title={`Upload your ${document.documentName}`}
                                                file={document?.file ?? document?.documentLink}
                                                onChange={(file) => handleChange(document, file)}
                                                error={!!errors?.documents?.[i]?.documentId?.message}
                                            errorMessage={errors?.documents?.[i]?.documentId?.message}
                                                supportedFileDescription="Supported file formats: PDF, JPG, PNG." */}
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
                    <CancelButton onClick={() => navigate(-1)} disabled={updating || loading}>
                        Cancel
                    </CancelButton>
                </Grid>
                <Grid item>
                    <SubmitButton isLoading={updating || loading} />
                </Grid>
            </Grid>
        </Column>
    );
}
