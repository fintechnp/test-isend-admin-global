import Box from "@mui/material/Box";
import { styled } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";

import dateUtils from "App/utils/dateUtils";
import Modal from "App/components/Modal/Modal";
import PageContent from "App/components/Container/PageContent";
import SourceDetails from "App/core/source-detail/SourceDetails";
import useSourceDetail from "App/core/source-detail/useSourceDetail";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { promoCodeActions } from "./store";
import routePaths from "Private/config/routePaths";
import AddCampaignBudgetModal from "./AddCampaignBudgetModal";

const Wrapper = styled(Box)(({ theme }) => ({
    border: `1px solid ${theme.palette.stroke.base}`,
    padding: theme.spacing(2),
    height: "100%",
    borderRadius: "8px",
}));

const ResponsiveBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
        flexDirection: "row",
    },
}));

export default function ViewPromoCode() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [open, setOpen] = useState(false);

    const [imageOpen, setImageOpen] = useState(false);

    const toggleButton = () => !setOpen(true);

    const toggleImageButton = () => !setImageOpen(true);

    const handleImageClose = () => setImageOpen(false);

    const handleClose = () => setOpen(false);

    const { response, loading } = useSelector((state) => state.get_promo_code_by_id);

    const { response: PromoCodeUsage } = useSelector((state) => state.get_promo_code_Usage);

    const termsAndConditionInformation = response?.data?.termsAndCondition;

    const mobileImage = response?.data?.mobileImage;
    const webImage = response?.data?.webImage;

    const {
        is_modal_open: isOpen,
        loading: isLoading,
        success: isSuccess,
        initial_form_data,
    } = useSelector((state) => state.add_promo_code_budget);

    useEffect(() => {
        dispatch(promoCodeActions.get_promo_code_by_id(id));
    }, [dispatch]);

    useEffect(() => {
        dispatch(promoCodeActions.get_promo_code_usage(id));
    }, [dispatch]);

    const data = response?.data;

    const promoCodeData = response?.data?.promoCodeThresholds;
    const attributeFamilyCampaignsData = response?.data?.attributeFamilyCampaigns;

    const onSubmit = (data) => {
        dispatch(promoCodeActions.add_promo_code_budget(data));
    };

    const handleModalClose = useCallback(() => {
        dispatch(promoCodeActions.close_add_promo_code_budget_modal());
    });

    useEffect(() => {
        if (isSuccess) {
            dispatch(promoCodeActions.get_promo_code_by_id(id));
        }
    }, [dispatch, isSuccess]);

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
            ],
        },
    ]);

    const CampaignBudgetDefinition = useSourceDetail([
        {
            title: "Campaign Budget",
            items: [
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
                {
                    label: "Available Budget",
                    accessorKey: "availableBudget",
                },
            ],
        },
    ]);

    const columns = useMemo(() => [
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
                ,
                { label: "Display Mechanism", accessorKey: "displayMechanism" },
                { label: "Display Mechanism Name", accessorKey: "displayMechanismName" },
                { label: "Promo Code Criteria", accessorKey: "promoCodeCriteria" },
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
                    label: "List Promo Code",
                    link: routePaths.ListPromoCode,
                },
                {
                    label: "View",
                },
            ]}
        >
            <PageContentContainer
                topRightContent={
                    <Button
                        onClick={() => {
                            dispatch(promoCodeActions.open_update_promo_code_budget_modal(data));
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Add Budget
                    </Button>
                }
                title="View Promo Code"
            >
                <ResponsiveBox
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Wrapper>
                                <SourceDetails
                                    viewMode="column"
                                    rowMode="row"
                                    definition={CampaignDefinition}
                                    data={data}
                                />
                            </Wrapper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Wrapper>
                                <SourceDetails
                                    viewMode="column"
                                    rowMode="row"
                                    definition={CampaignBudgetDefinition}
                                    data={data}
                                />
                            </Wrapper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Wrapper>
                                {attributeFamilyCampaignsData?.map((campaign) => (
                                    <SourceDetails
                                        viewMode="column"
                                        rowMode="row"
                                        key={campaign?.id}
                                        definition={AttributeFamilyCampaignsDefinition}
                                        data={campaign}
                                    />
                                ))}
                            </Wrapper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Wrapper>
                                <SourceDetails
                                    viewMode="column"
                                    rowMode="row"
                                    definition={AdditionalDataDefinition}
                                    data={data}
                                />
                            </Wrapper>
                        </Grid>
                        <AddCampaignBudgetModal
                            isOpen={isOpen}
                            handleClose={handleModalClose}
                            isLoading={isLoading}
                            campaignName={initial_form_data?.campaignName}
                            AvailableBudget={initial_form_data?.availableBudget}
                            onSubmit={onSubmit}
                            initial_values={{
                                campaignId: initial_form_data?.id,
                            }}
                        />

                        <Grid item>
                            {promoCodeData?.map((threshold) => (
                                // <SourceDetails key={threshold?.id} definition={PromoCodeDefinition} data={threshold} />

                                <TanstackReactTable key={threshold?.id} columns={columns} data={threshold} />
                            ))}
                        </Grid>
                    </Grid>
                </ResponsiveBox>

                <Grid item xs={12} gap={"10px"} display={"flex"}>
                    <Button onClick={toggleButton} size="medium" variant="outlined" disableElevation disableRipple>
                        Terms & Conditions
                    </Button>

                    <Button onClick={toggleImageButton} size="medium" variant="outlined" disableElevation disableRipple>
                        View Promo Images
                    </Button>
                </Grid>

                <Modal title=" " open={open} onClose={handleClose}>
                    <Box component="span" dangerouslySetInnerHTML={{ __html: termsAndConditionInformation }} />
                </Modal>

                <Modal
                    sx={{
                        width: "400px",
                    }}
                    open={imageOpen}
                    title="Promo Images"
                    onClose={handleImageClose}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={2} // Gap between Card items
                    >
                        <Card>
                            <CardActionArea>
                                <Typography>Mobile Image</Typography>
                                <CardMedia
                                    sx={{
                                        objectFit: "contain",
                                    }}
                                    component="img"
                                    height="450"
                                    image={mobileImage}
                                    alt="Mobile Image"
                                />
                            </CardActionArea>
                        </Card>

                        <Card>
                            <CardActionArea>
                                <Typography>Web Image</Typography>
                                <CardMedia
                                    sx={{
                                        objectFit: "contain",
                                    }}
                                    component="img"
                                    height="140"
                                    image={webImage}
                                    alt="Web Image"
                                />
                            </CardActionArea>
                        </Card>

                        <Box display="flex" justifyContent="flex-end">
                            <Button variant="outlined" color="primary" onClick={handleImageClose}>
                                Close
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </PageContentContainer>
        </PageContent>
    );
}
