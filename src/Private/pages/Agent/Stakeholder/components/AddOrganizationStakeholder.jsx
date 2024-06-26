import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import HookForm from "App/core/hook-form/HookForm";
import OrganizationStakeholderForm from "./OrganizationStakeholderForm";
import PageContentContainer from "App/components/Container/PageContentContainer";

import isEmpty from "App/helpers/isEmpty";
import { relatedTo } from "Private/data/b2b";
import { stakeholderActions } from "../store";
import { PARENT_ORGANIZATION_ID } from "../data/constants";
import { createOrganizationStakeholderSchema } from "../schema/organizationStakeholderSchema";

export default function AddOrganizationStakeholder({ relatedTo, relatedId, onSuccess }) {
    const dispatch = useDispatch();

    const { loading: isLoading, success: isSuccess } = useSelector((state) => state.add_organization_stakeholder);

    const methods = useForm({
        resolver: yupResolver(createOrganizationStakeholderSchema),
    });

    useEffect(() => {
        if (isSuccess) {
            dispatch(stakeholderActions.add_organization_stakeholder_reset());
            onSuccess?.();
        }
    }, [isSuccess]);

    const { handleSubmit, setError } = methods;

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

        dispatch(stakeholderActions.add_organization_stakeholder(requestPayload));
    };

    return (
        <PageContentContainer title="Add Organization Stakeholder">
            <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                <OrganizationStakeholderForm isProcessing={isLoading} relatedTo={relatedTo} relatedId={relatedId} />
            </HookForm>
        </PageContentContainer>
    );
}

AddOrganizationStakeholder.propTypes = {
    relatedTo: PropTypes.oneOf([relatedTo.AGENT, relatedTo.BUSINESS]).isRequired,
    relatedId: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
};
