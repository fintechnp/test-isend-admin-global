import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import HookForm from "App/core/hook-form/HookForm";
import PageContent from "App/components/Container/PageContent";
import PageContentContainer from "App/components/Container/PageContentContainer";

import isEmpty from "App/helpers/isEmpty";
import { MarketMakerActions as actions } from "Private/pages/Agent/MarketMaker/store";
import { marketMakerKybValidationSchema } from "./validation/MarketMakerKybValidation";
import OrganizationStakeholderForm from "../Stakeholder/components/OrganizationStakeholderForm";
import AddOrganizationStakeholder from "../Stakeholder/components/AddOrganizationStakeholder";
import { relatedTo } from "Private/data/b2b";

export default function AddMarketMakerKyb() {

    const { agentId } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { loading, response, success } = useSelector((state) => state.add_market_maker_kyb);

    const methods = useForm({
        resolver: yupResolver(marketMakerKybValidationSchema),
    });

    useEffect(() => {
        if (success) {
            navigate(buildRoute(routePaths.agent.viewMarketMaker, agentId));
        }
    }, [success]);

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

        const { countryId, postCode, unit, street, state, city, address, ...rest } = data;

        const dataToSend = {
            marketMakerId: agentId,
            address: {
                countryId,
                postCode,
                unit,
                street,
                city,
                state,
                address,
            },
            ...rest,
        };

        const requestData = { ...dataToSend, documents: requiredDocuments };

        dispatch(actions.add_market_maker_kyb(requestData));
    };

    return (
        <PageContent
            documentTitle="B2B - Add Organization Stakeholder"
            breadcrumbs={[
                {
                    label: "Agents",
                    link: routePaths.ListAgent,
                },
                {
                    label: agentId,
                    link: buildRoute(routePaths.ViewAgent, agentId)
                },
                {
                    label: "Create Organization Stakeholder",
                },
                {
                    label: "Create",
                },
            ]}
        >
            <AddOrganizationStakeholder
                    relatedTo={relatedTo.AGENT}
                    relatedId={agentId}
                    onSuccess={() => navigate(-1)}
                />
        </PageContent>
    );
}
