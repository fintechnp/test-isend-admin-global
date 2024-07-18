import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";

import { relatedTo } from "Private/data/b2b";
import EditOrganizationStakeholder from "../Stakeholder/components/EditOrganizationStakeholder";

export default function EditBusinessOrganizationStakeholder() {
    const { businessId, stakeholderId } = useParams();

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
                    label: businessId,
                    link: buildRoute(routePaths.ViewBusiness, businessId),
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
                relatedTo={relatedTo.BUSINESS}
                relatedId={businessId}
                stakeholderId={stakeholderId}
                onSuccess={() => navigate(-1)}
                isAddMode={false}
            />
        </PageContent>
    );
}
