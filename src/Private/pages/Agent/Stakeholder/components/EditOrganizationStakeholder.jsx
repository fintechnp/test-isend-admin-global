import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import Loader from "App/components/Loader/Loader";
import HookForm from "App/core/hook-form/HookForm";
import OrganizationStakeholderForm from "./OrganizationStakeholderForm";
import PageContentContainer from "App/components/Container/PageContentContainer";

import isEmpty from "App/helpers/isEmpty";
import { stakeholderActions } from "../store";
import { relatedTo } from "Private/data/b2b";
import { PARENT_ORGANIZATION_ID } from "../data/constants";
import { createOrganizationStakeholderSchema } from "../schema/organizationStakeholderSchema";

export default function EditOrganizationStakeholder({ relatedTo, relatedId, stakeholderId, onSuccess }) {
    const dispatch = useDispatch();

    const { loading: isLoading, success: isSuccess } = useSelector((state) => state.update_organization_stakeholder);

    const { response: getOrganizationStakeholderByIdResponse, loading: isLoadingGetOrganizationStakeholderById } =
        useSelector((state) => state.get_organization_stakeholder_by_id);

    const methods = useForm({
        resolver: yupResolver(createOrganizationStakeholderSchema),
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
            parentKybId: data.parentKybId === PARENT_ORGANIZATION_ID ? null : data.parentKybId,
            documents: requiredDocuments,
            relatedTo: relatedTo,
            relatedId: relatedId,
        };
        dispatch(stakeholderActions.update_organization_stakeholder(stakeholderId, requestPayload));
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(stakeholderActions.update_organization_stakeholder_reset());
            onSuccess?.();
        }
    }, [isSuccess]);

    useEffect(() => {
        dispatch(stakeholderActions.get_organization_stakeholder_by_id(stakeholderId));
    }, [stakeholderId]);

    useEffect(() => {
        const data = getOrganizationStakeholderByIdResponse?.data;
        if (!data) return;

        setValue("parentKybId", data.parentId ?? PARENT_ORGANIZATION_ID);
        setValue("name", data.name);
        setValue("registrationNo", data.registrationNo);
        setValue("registeredDate", data.registeredDate);
        setValue("brandName", data.brandName);
        setValue("registeredCountryId", data.registeredCountry.countryId);
        setValue("address", data.address);
        setValue(
            "documents",
            data.documents.map((d) => ({
                documentName: d.documentName,
                documentTypeId: d.documentTypeId,
                documentLink: d.documentLink,
                fileType: d.fileType,
                documentId: d.documentId
            })),
        );
    }, [getOrganizationStakeholderByIdResponse]);

    return (
        <PageContentContainer title="Edit Organization Stakeholder">
            {isLoadingGetOrganizationStakeholderById ? (
                <Loader />
            ) : (
                <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                    <OrganizationStakeholderForm
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

EditOrganizationStakeholder.propTypes = {
    relatedTo: PropTypes.oneOf([relatedTo.AGENT, relatedTo.BUSINESS]).isRequired,
    relatedId: PropTypes.string.isRequired,
    stakeholderId: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
};
