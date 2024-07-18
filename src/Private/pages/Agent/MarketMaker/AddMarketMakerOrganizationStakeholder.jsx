import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";

import { relatedTo } from "Private/data/b2b";
import AddOrganizationStakeholder from "../Stakeholder/components/AddOrganizationStakeholder";

export default function AddMarketMakerOrganizationStakeholder() {
    const { agentId } = useParams();

    const navigate = useNavigate();

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
                    link: buildRoute(routePaths.ViewAgent, agentId),
                },
                {
                    label: "Organization Stakeholders",
                },
                {
                    label: "Create",
                },
            ]}
        >
            <AddOrganizationStakeholder
                relatedTo={relatedTo.AGENT}
                relatedId={agentId}
                onSuccess={() => {
                    navigate(buildRoute(routePaths.ViewAgent, agentId));
                }}
            />
        </PageContent>
    );
}
