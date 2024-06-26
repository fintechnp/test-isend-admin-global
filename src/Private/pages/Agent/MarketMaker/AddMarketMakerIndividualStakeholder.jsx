import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";

import { relatedTo } from "Private/data/b2b";
import AddIndividualStakeholder from "../Stakeholder/components/AddIndividualStakeholder";

export default function AddMarketMakerIndividualStakeholder() {
    const { agentId } = useParams();

    const navigate = useNavigate();

    return (
        <PageContent
            documentTitle="B2B - Add Individual Stakeholder"
            breadcrumbs={[
                {
                    label: "Agents",
                    link: routePaths.ListBusiness,
                },
                {
                    label: agentId,
                    link: buildRoute(routePaths.ViewAgent, agentId),
                },
                {
                    label: "Individual Stakeholders",
                },
                {
                    label: "Create",
                },
            ]}
        >
            <AddIndividualStakeholder
                relatedTo={relatedTo.AGENT}
                relatedId={agentId}
                onSuccess={() => {
                    navigate(buildRoute(routePaths.ViewAgent, agentId));
                }}
            />
        </PageContent>
    );
}
