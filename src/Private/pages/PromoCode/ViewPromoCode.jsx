import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import dateUtils from "App/utils/dateUtils";
import Modal from "App/components/Modal/Modal";
import PageContent from "App/components/Container/PageContent";
import SourceDetails from "App/core/source-detail/SourceDetails";
import useSourceDetail from "App/core/source-detail/useSourceDetail";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { promoCodeActions } from "./store";

export default function ViewPromoCode() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [open, setOpen] = useState(false);

    const toggleButton = () => !setOpen(true);

    const handleClose = () => setOpen(false);

    const { response, loading } = useSelector((state) => state.get_promo_code_by_id);

    useEffect(() => {
        dispatch(promoCodeActions.get_promo_code_by_id(id));
    }, [dispatch]);

    const data = response?.data;

    const promoCodeData = response?.data?.promoCodeThresholds;
    const attributeFamilyCampaignsData = response?.data?.attributeFamilyCampaigns;

    const CampaignDefinition = useSourceDetail([
        {
            title: "Campaign Information",
            items: [
                {
                    label: "Campaign Name",
                    accessorKey: "campaignName",
                },
                {
                    label: "Campaign Code",
                    accessorKey: "campaignCode",
                },
                {
                    label: "Campaign Type",
                    accessorKey: "campaignType",
                },
                {
                    label: "Status",
                    accessorKey: "statusName",
                },
                {
                    label: "Start Date and Time",
                    accessorKey: "startDate",
                    cell: (data) => (data.startDate ? dateUtils.getLocalDateTimeFromUTC(data.startDate) : "-"),
                },
                {
                    label: "End Date and Time",
                    accessorKey: "endDate",
                    cell: (data) => (data.endDate ? dateUtils.getLocalDateTimeFromUTC(data.endDate) : "-"),
                },
                {
                    label: "Budget",
                    accessorKey: "budget",
                },
            ],
        },
    ]);

    const PromoCodeDefinition = useSourceDetail([
        {
            title: "Campaign Information",
            items: [
                {
                    label: "ID",
                    accessorKey: "id",
                },
                {
                    label: "Minimum Amount",
                    accessorKey: "minimumAmount",
                },
                {
                    label: "Maximum Amount",
                    accessorKey: "maximumAmount",
                },
                {
                    label: "Reward Type",
                    accessorKey: "rewardType",
                },
                {
                    label: "Reward On",
                    accessorKey: "rewardOn",
                },
                {
                    label: "Reward On Name",
                    accessorKey: "rewardOnName",
                },
                {
                    label: "Reward Value",
                    accessorKey: "rewardValue",
                },
                {
                    label: "Limit",
                    accessorKey: "limit",
                },
            ],
        },
    ]);

    const AttributeFamilyCampaignsDefinition = useSourceDetail([
        {
            title: "Attribute Family Campaigns",
            items: [
                { label: "ID", accessorKey: "id" },
                { label: "Attribute Family ID", accessorKey: "attributeFamilyId" },
                { label: "Attribute Family Name", accessorKey: "attributeFamilyName" },
                { label: "Criteria", accessorKey: "criteria" },
                { label: "Criteria Name", accessorKey: "criteriaName" },
                { label: "Currency", accessorKey: "currency" },
                { label: "Amount", accessorKey: "amount" },
            ],
        },
    ]);

    const AdditionalDataDefinition = useSourceDetail([
        {
            title: "Additional Campaign Information",
            items: [
                { label: "Attribute Family", accessorKey: "attributeFamily" },
                { label: "Limit Per User", accessorKey: "limitPerUser" },
                { label: "Limit Per Campaign", accessorKey: "limitPerCampaign" },
                {
                    label: "Terms and Conditions",
                    accessorKey: "termsAndCondition",

                    cell: (data) => (
                        <>
                            <Modal title=" " open={open} onClose={handleClose}>
                                <Box component="span" dangerouslySetInnerHTML={{ __html: data.termsAndCondition }} />
                            </Modal>

                            <Button variant="contained" size="small" onClick={toggleButton}>
                                View T & C
                            </Button>
                        </>
                    ),
                },
                {
                    label: "Mobile Image",
                    accessorKey: "mobileImage",
                    cell: (data) => (
                        <img
                            src={data?.mobileImage}
                            alt="Mobile Image"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                    ),
                },
                {
                    label: "Web Image",
                    accessorKey: "webImage",
                    cell: (data) => (
                        <img
                            src={data?.mobileImage}
                            alt="Mobile Image"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                    ),
                },
                { label: "Display Mechanism", accessorKey: "displayMechanism" },
                { label: "Display Mechanism Name", accessorKey: "displayMechanismName" },
                { label: "Promo Code Criteria", accessorKey: "promoCodeCriteria" },
                { label: "Additional Rules Enabled", accessorKey: "additionalRulesEnabled" },
                { label: "Is Deleted", accessorKey: "isDeleted" },
                { label: "ID", accessorKey: "id" },
                { label: "Created Timestamp", accessorKey: "createdTs" },
                { label: "Updated Timestamp", accessorKey: "updatedTs" },
            ],
        },
    ]);

    return (
        <PageContent
            documentTitle="View Promo Code"
            breadcrumbs={[
                {
                    label: "Dashboard",
                },
            ]}
        >
            <PageContentContainer title="View Promo Code">
                {/* Add View Promo Code Component */}

                <Grid gap={5} container>
                    <Grid item>
                        <SourceDetails definition={CampaignDefinition} data={data} />
                    </Grid>

                    <Grid item>
                        {promoCodeData?.map((threshold) => (
                            <SourceDetails key={threshold?.id} definition={PromoCodeDefinition} data={threshold} />
                        ))}
                    </Grid>
                    <Grid item>
                        {attributeFamilyCampaignsData?.map((campaign) => (
                            <SourceDetails
                                key={campaign?.id}
                                definition={AttributeFamilyCampaignsDefinition}
                                data={campaign}
                            />
                        ))}
                    </Grid>

                    <Grid item>
                        <SourceDetails definition={AdditionalDataDefinition} data={data} />
                    </Grid>
                </Grid>
            </PageContentContainer>
        </PageContent>
    );
}
