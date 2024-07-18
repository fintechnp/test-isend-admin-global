import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";

import { relatedTo } from "Private/data/b2b";
import EditOrganizationStakeholder from "../Stakeholder/components/EditOrganizationStakeholder";

export default function EditMarketMakerOrganizationStakeholder() {
    const { agentId, stakeholderId } = useParams();

    const navigate = useNavigate();

    return (
        <PageContent
            documentTitle="B2B - Edit Organization Stakeholder"
            breadcrumbs={[
                {
                    label: "Businesses",
                    link: routePaths.ListBusiness,
                },
                {
                    label: agentId,
                    link: buildRoute(routePaths.ViewBusiness, agentId),
                },
                {
                    label: "Organization Stakeholders",
                },
                {
                    label: "Edit",
                },
            ]}
        >
            <EditOrganizationStakeholder
                relatedTo={relatedTo.AGENT}
                relatedId={agentId}
                stakeholderId={stakeholderId}
                onSuccess={() => navigate(-1)}
                isAddMode={false}
            />
        </PageContent>
    );
}
