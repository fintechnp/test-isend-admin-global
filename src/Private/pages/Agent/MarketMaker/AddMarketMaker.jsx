import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import HookForm from "App/core/hook-form/HookForm";
import PageContent from "App/components/Container/PageContent";
import MarketMakerForm from "Private/components/MarketMaker/MarketMakerForm";
import PageContentContainer from "App/components/Container/PageContentContainer";

import isEmpty from "App/helpers/isEmpty";
import routePaths from "Private/config/routePaths";
import { MarketMakerActions as actions } from "./store";
import { marketMakerValidationSchema } from "./validation/MarketMakerValidation";

export default function AddMarketMaker() {
    const dispatch = useDispatch();

    const methods = useForm({
        resolver: yupResolver(marketMakerValidationSchema),
    });

    const {
        handleSubmit,
        setError,
        formState: { errors },
    } = methods;

    const onSubmitData = (data) => {
        const requiredDocuments = data.documents
            .filter((document) => !!document.documentTypeId && !!document.documentId)
            .map((document) => ({
                documentTypeId: document.documentTypeId,
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

        const requestPayload = { ...data, documents: requiredDocuments };

        dispatch(actions.add_market_maker(requestPayload));
    };

    return (
        <PageContent
            documentTitle="Add New Agent"
            breadcrumbs={[
                {
                    label: "Agents",
                    link: routePaths.ListAgent,
                },
                {
                    label: "Create",
                },
            ]}
        >
            <PageContentContainer>
                <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                    <MarketMakerForm />
                </HookForm>
            </PageContentContainer>
        </PageContent>
    );
}
