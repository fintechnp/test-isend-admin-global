import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";
import EditIndividualStakeholder from "../Stakeholder/components/EditIndividualStakeholder";

import { relatedTo } from "Private/data/b2b";

export default function EditMarketMakerIndividualStakeholder() {

    const { agentId, stakeholderId } = useParams();

    const navigate = useNavigate();

    return (
        <PageContent
            documentTitle="B2B - Edit Individual Stakeholder"
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
                    label: "Individual Stakeholders",
                },
                {
                    label: "Edit",
                },
            ]}
        >
            <EditIndividualStakeholder
                relatedTo={relatedTo.AGENT}
                relatedId={agentId}
                stakeholderId={stakeholderId}
                onSuccess={() => navigate(-1)}
                isAddMode={false}
            />
        </PageContent>
    );
}
