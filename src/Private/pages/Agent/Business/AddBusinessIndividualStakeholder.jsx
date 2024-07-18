import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";

import { relatedTo } from "Private/data/b2b";
import AddIndividualStakeholder from "../Stakeholder/components/AddIndividualStakeholder";

export default function AddBusinessIndividualStakeholder() {
    const { businessId } = useParams();

    const navigate = useNavigate();

    return (
        <PageContent
            documentTitle="B2B - Add Individual Stakeholder"
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
                    label: "Individual Stakeholders",
                },
                {
                    label: "Create",
                },
            ]}
        >
            <AddIndividualStakeholder
                relatedTo={relatedTo.BUSINESS}
                relatedId={businessId}
                onSuccess={() => {
                    navigate(buildRoute(routePaths.ViewBusiness, businessId));
                }}
            />
        </PageContent>
    );
}
