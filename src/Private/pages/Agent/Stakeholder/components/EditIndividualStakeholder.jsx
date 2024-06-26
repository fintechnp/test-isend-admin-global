import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import Loader from "App/components/Loader/Loader";
import HookForm from "App/core/hook-form/HookForm";
import IndividualStakeholderForm from "./IndividualStakeholderForm";
import PageContentContainer from "App/components/Container/PageContentContainer";

import isEmpty from "App/helpers/isEmpty";
import { relatedTo } from "Private/data/b2b";
import { stakeholderActions } from "../store";
import { PARENT_ORGANIZATION_ID } from "../data/constants";
import { updateIndividualStakeholderSchema } from "../schema/individualStakeholderSchema";

export default function EditIndividualStakeholder({ relatedTo, relatedId, stakeholderId, onSuccess }) {
    const dispatch = useDispatch();

    const { loading: isLoading, success: isSuccess } = useSelector((state) => state.update_organization_stakeholder);

    const { response: getIndividualStakeholderByIdResponse, loading: isLoadingGetIndividualStakeholderById } =
        useSelector((state) => state.get_individual_stakeholder_by_id);

    const methods = useForm({
        resolver: yupResolver(updateIndividualStakeholderSchema),
    });

    const { handleSubmit, setError, setValue } = methods;

    const onSubmitData = (data) => {
        const requiredDocuments = data.documents
            .filter((document) => !!document.documentTypeId && !!document.documentId)
            .map((document) => ({
                documentTypeId: document.documentTypeId,
                documentName: document.documentName,
                documentId: document.documentId,
            }));

        const requiredEmptyDocuments = data.documents.filter((document, index) => {
            if (document.isRequired && isEmpty(document.documentId)) {
                setError(`documents.${index}.documentId`, {
                    type: "required",
                    message: "Document is required",
                });
            }
            return document.isRequired && isEmpty(document.documentId);
        });

        if (requiredEmptyDocuments.length > 0) return;

        const requestPayload = {
            ...data,
            relatedKybId: data.relatedKybId === PARENT_ORGANIZATION_ID ? null : data.relatedKybId,
            documents: requiredDocuments,
            relatedTo,
            relatedId,
        };

        dispatch(stakeholderActions.update_individual_stakeholder(stakeholderId, requestPayload));
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(stakeholderActions.update_individual_stakeholder_reset());
            onSuccess?.();
        }
    }, [isSuccess]);

    useEffect(() => {
        dispatch(stakeholderActions.get_individual_stakeholder_by_id(stakeholderId));
    }, [stakeholderId]);

    useEffect(() => {
        const data = getIndividualStakeholderByIdResponse?.data;
        if (!data) return;
        setValue("relatedKybId", data.relatedKybId ?? PARENT_ORGANIZATION_ID);
        setValue("firstName", data.firstName);
        setValue("middleName", data.middleName);
        setValue("lastName", data.lastName);
        setValue("dateOfBirth", data.dateOfBirth);
        setValue("mobileNumber", data.mobileNumber);
        setValue("gender", data.gender);
        setValue("permanentAddress.countryId", data.permanentAddress.countryDetails.countryId);
        setValue("permanentAddress.postCode", data.permanentAddress.postCode);
        setValue("permanentAddress.unit", data.permanentAddress.unit);
        setValue("permanentAddress.street", data.permanentAddress.street);
        setValue("permanentAddress.city", data.permanentAddress.city);
        setValue("permanentAddress.state", data.permanentAddress.state);
        setValue("permanentAddress.address", data.permanentAddress.address);
        setValue("temporaryAddress.countryId", data.temporaryAddress.countryDetails.countryId);
        setValue("temporaryAddress.postCode", data.temporaryAddress.postCode);
        setValue("temporaryAddress.unit", data.temporaryAddress.unit);
        setValue("temporaryAddress.street", data.temporaryAddress.street);
        setValue("temporaryAddress.city", data.temporaryAddress.city);
        setValue("temporaryAddress.state", data.temporaryAddress.state);
        setValue("temporaryAddress.address", data.temporaryAddress.address);
        setValue("designationId", data.designationId);
        setValue("identityTypeId", data.identityTypeId);
        setValue("identityNo", data.identityNo);
        setValue("identityIssuedDate", data.identityIssuedDate);
        setValue("identityIssuedBy", data.identityIssuedBy);
        setValue("identityIssuedCountryId", data.identityIssuedCountryId);
        setValue("identityExpiryDate", data.identityExpiryDate);
        setValue("birthCountryId", data.birthCountry.countryId);
        setValue(
            "documents",
            data.documents.map((d) => ({
                documentType: d.documentType,
                documentName: d.documentName,
                documentTypeId: d.documentTypeId,
                documentLink: d.documentLink,
                fileUrl: d.documentLink,
                fileType: d.fileType,
            })),
        );
    }, [getIndividualStakeholderByIdResponse]);

    return (
        <PageContentContainer title="Edit Individual Stakeholder">
            {isLoadingGetIndividualStakeholderById ? (
                <Loader />
            ) : (
                <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                    <IndividualStakeholderForm
                        isProcessing={isLoading}
                        relatedTo={relatedTo}
                        relatedId={relatedId}
                        isAddMode={false}
                        stakeholderId={stakeholderId}
                    />
                </HookForm>
            )}
        </PageContentContainer>
    );
}

EditIndividualStakeholder.propTypes = {
    relatedTo: PropTypes.oneOf([relatedTo.AGENT, relatedTo.BUSINESS]).isRequired,
    relatedId: PropTypes.string.isRequired,
    stakeholderId: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
};
