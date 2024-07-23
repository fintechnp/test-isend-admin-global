import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import HookForm from "App/core/hook-form/HookForm";
import IndividualStakeholderForm from "./IndividualStakeholderForm";
import PageContentContainer from "App/components/Container/PageContentContainer";

import isEmpty from "App/helpers/isEmpty";
import { stakeholderActions } from "../store";
import { relatedTo } from "Private/data/b2b";
import { PARENT_ORGANIZATION_ID } from "../data/constants";
import { createIndividualStakeholderSchema } from "../schema/individualStakeholderSchema";

export default function AddIndividualStakeholder({ relatedTo, relatedId, onSuccess }) {
    const dispatch = useDispatch();

    const { loading: isLoading, success: isSuccess } = useSelector((state) => state.add_individual_stakeholder);

    const methods = useForm({
        resolver: yupResolver(createIndividualStakeholderSchema),
    });

    useEffect(() => {
        if (isSuccess) {
            dispatch(stakeholderActions.add_individual_stakeholder_reset());
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
            relatedKybId: data.relatedKybId === PARENT_ORGANIZATION_ID ? null : data.relatedKybId,
            documents: requiredDocuments,
            relatedId,
            relatedTo,
        };

        dispatch(stakeholderActions.add_individual_stakeholder(requestPayload));
    };

    return (
        <PageContentContainer title="Add Individual Stakeholder">
            <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                <IndividualStakeholderForm isProcessing={isLoading} relatedTo={relatedTo} relatedId={relatedId} />
            </HookForm>
        </PageContentContainer>
    );
}

AddIndividualStakeholder.propTypes = {
    relatedTo: PropTypes.oneOf([relatedTo.AGENT, relatedTo.BUSINESS]).isRequired,
    relatedId: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
};
