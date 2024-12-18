import Box from "@mui/material/Box";
import { styled } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";

import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import Modal from "App/components/Modal/Modal";
import buildRoute from "App/helpers/buildRoute";
import Clipboard from "App/components/Clipboard/Clipboard";
import PageContent from "App/components/Container/PageContent";
import SourceDetails from "App/core/source-detail/SourceDetails";
import useSourceDetail from "App/core/source-detail/useSourceDetail";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";
import routePaths from "Private/config/routePaths";

import { promoCodeActions } from "../store";
import AddCampaignBudgetModal from "./AddCampaignBudgetModal";
import { campaignEventTypes } from "../data/campaignEventTypesEnums";

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

const StyleImageWrapper = styled(Grid)(({ theme }) => ({
    maxHeight: "100%",
    minWidth: "20rem",
    overflowY: "auto",
    textAlign: "left",
    [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
    },
}));

export default function ViewPromoCode() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const toggleButton = () => !setOpen(true);

    const handleClose = () => setOpen(false);

    const { response, loading } = useSelector((state) => state.get_promo_code_by_id);

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

    const data = response?.data;

    const promoCodeData = data?.promoCodeThresholds ?? [];

    const attributeFamilyData = data?.attributeFamilyCampaigns ?? [];

    const referralFamilyCampaignsData = data?.referralFamilyCampaigns ?? [];

    const promoCodeId = data?.id;

    const onSubmit = (data) => {
        dispatch(promoCodeActions.add_promo_code_budget(data));
    };

    const handleModalClose = useCallback(() => {
        dispatch(promoCodeActions.close_add_promo_code_budget_modal());
    });

    useEffect(() => {
        if (isSuccess) {
            dispatch(promoCodeActions.get_promo_code_by_id(id));
            dispatch({
                type: "ADD_PROMO_CODE_BUDGET_RESET",
            });
        }
    }, [dispatch, isSuccess]);

    const PromoImages = [
        {
            label: "Mobile Image",
            src: mobileImage,
        },
        {
            label: "Web Image",
            src: webImage,
        },
        {
            label: "",
            src: null,
            height: 100,
        },
    ];

    const attributeFamilyCampaigns = response?.data?.attributeFamilyCampaigns;

    const attributeValue =
        attributeFamilyCampaigns && Array.isArray(attributeFamilyCampaigns)
            ? attributeFamilyCampaigns.map((item) => item.attributeFamilyType)
            : [];

    const filteredPromoImages = PromoImages.filter((image) => !isEmpty(image.src) && !isEmpty(image.label));

    const CampaignDefinition = useSourceDetail([
        {
            title: "Campaign Information",
            items: [
                {
                    label: "Campaign Name",
                    accessorKey: "campaignName",
                    cell: (data) => (
                        <>
                            <Clipboard
                                label={<Typography fontWeight={600}>{data.campaignName}</Typography>}
                                content={data?.campaignName}
                            />
                        </>
                    ),
                },
                {
                    label: "Campaign Code",
                    accessorKey: "campaignCode",
                    cell: (data) => (
                        <>
                            <Clipboard
                                label={<Typography fontWeight={600}>{data.campaignCode}</Typography>}
                                content={data?.campaignCode}
                            />
                        </>
                    ),
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
                    label: "Campaign Start Date",
                    accessorKey: "startDate",
                    cell: (data) =>
                        data.startDate ? dateUtils.getFormattedDate(data.startDate, "MM/DD/YYYY hh:mm A") : "-",
                },
                {
                    label: "Campaign End Date",
                    accessorKey: "endDate",
                    cell: (data) =>
                        data.endDate ? dateUtils.getFormattedDate(data.endDate, "MM/DD/YYYY hh:mm A") : "-",
                },
            ],
        },
    ]);

    const CampaignBudgetDefinition = useSourceDetail([
        {
            title: "Budget and Limits",
            items: [
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
            header: "SN",
            accessorKey: "f_serial_no",
            cell: (info) => info.row.index + 1,
        },
        {
            header: "Minimum Amount",
            accessorKey: "minimumAmount",
        },
        {
            header: "Maximum Amount",
            accessorKey: "maximumAmount",
        },
        {
            header: "Reward Type",
            accessorKey: "rewardTypeName",
        },
        {
            header: "Reward On",
            accessorKey: "rewardOnName",
        },
        {
            header: "Reward Value",
            accessorKey: "rewardValue",
        },
        {
            header: "Limit",
            accessorKey: "limit",
        },
    ]);

    const referrerColumns = useMemo(() => [
        {
            header: "SN",
            accessorKey: "f_serial_no",
            cell: (info) => info.row.index + 1,
        },
        {
            header: "Referrer Need Kyc ?",
            accessorKey: "referrerneedkyc",
        },
        {
            header: "Least Referrer Transactions",
            accessorKey: "referrerleasttransactions",
        },
        {
            header: "Minimum Referrer",
            accessorKey: "minimumreferrer",
        },
    ]);

    const refereeColumns = useMemo(() => [
        {
            header: "SN",
            accessorKey: "f_serial_no",
            cell: (info) => info.row.index + 1,
        },
        {
            header: "Referee Need Kyc ?",
            accessorKey: "refereeneedkyc",
        },
        {
            header: "Least Referee Transactions",
            accessorKey: "refereeleasttransactions",
        },
        {
            header: "KYC Verifiying Days ",
            accessorKey: "kycverifyingdays",
        },
    ]);

    const Attributecolumns = useMemo(() => [
        {
            header: "SN",
            accessorKey: "f_serial_no",
            cell: (info) => info.row.index + 1,
        },
        {
            header: "Attribute Name",
            accessorKey: "attributeFamilyName",
        },
        {
            header: "Criteria Name",
            accessorKey: "criteriaName",
        },

        ...(attributeValue.includes(campaignEventTypes?.AMOUNT)
            ? [
                  {
                      header: "Currency",
                      accessorKey: "currency",
                      cell: ({ row }) => (row.original.currency ? row.original.currency : "N/A"),
                  },
                  {
                      header: "Amount",
                      accessorKey: "amount",
                  },
              ]
            : []),

        ...(attributeValue.includes(campaignEventTypes?.COUNT) ||
        attributeValue.includes(campaignEventTypes?.BENEFICIARY_COUNTRY)
            ? [
                  {
                      header: "Amount",
                      accessorKey: "amount",
                  },
              ]
            : []),

        ...(attributeValue.includes(campaignEventTypes?.BENEFICIARY_RELATION)
            ? [
                  {
                      header: "Beneficiary Relation",
                      accessorKey: "Value",
                  },
              ]
            : []),
    ]);

    const AdditionalDataDefinition = useSourceDetail([
        {
            title: "Additional Campaign Information",
            items: [
                { label: "Limit Per User", accessorKey: "limitPerUser" },
                { label: "Limit Per Campaign", accessorKey: "limitPerCampaign" },
                ,
                { label: "Display Mechanism", accessorKey: "displayMechanismName" },
                { label: "Promo Code Criteria", accessorKey: "promoCodeCriteriaName" },
                {
                    label: "Created Time",
                    accessorKey: "createdTs",
                    cell: (data) =>
                        data.createdTs ? dateUtils.getFormattedDate(data.createdTs, "MM/DD/YYYY hh:mm A") : "-",
                },
                {
                    label: "Updated Time",
                    accessorKey: "updatedTs",
                    cell: (data) =>
                        data.updatedTs ? dateUtils.getFormattedDate(data.updatedTs, "MM/DD/YYYY hh:mm A") : "-",
                },
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
            <PageContentContainer title="View Promo Code">
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
                            <Wrapper
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <SourceDetails
                                    viewMode="column"
                                    rowMode="row"
                                    definition={CampaignBudgetDefinition}
                                    data={data}
                                />

                                <Box alignItems="flex-end">
                                    <Button
                                        onClick={() => {
                                            dispatch(promoCodeActions.open_update_promo_code_budget_modal(data));
                                        }}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Add Budget
                                    </Button>
                                </Box>
                            </Wrapper>
                        </Grid>

                        <Grid item xs={12} md={12}>
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

                        {attributeFamilyData.length > 0 && (
                            <Grid item>
                                <Typography marginBottom={2} variant="h6">
                                    Attribute Values
                                </Typography>

                                <TanstackReactTable columns={Attributecolumns} data={attributeFamilyData} />
                            </Grid>
                        )}

                        {referralFamilyCampaignsData.length > 0 && (
                            <Grid item>
                                <Typography variant="h6" marginBottom={2}>
                                    Referral Family Campaigns
                                </Typography>

                                <Grid item>
                                    <Typography variant="body1" fontWeight={600} marginBottom={2}>
                                        Referrer
                                    </Typography>

                                    <TanstackReactTable columns={referrerColumns} data={referralFamilyCampaignsData} />
                                </Grid>

                                <Grid item marginTop={2}>
                                    <Typography variant="body1" fontWeight={600}>
                                        Referrer
                                    </Typography>

                                    <TanstackReactTable columns={refereeColumns} data={referralFamilyCampaignsData} />
                                </Grid>
                            </Grid>
                        )}

                        {promoCodeData.length > 0 && (
                            <Grid item>
                                <Typography marginBottom={2} variant="h6">
                                    Discount Details
                                </Typography>

                                <TanstackReactTable columns={columns} data={promoCodeData} />
                            </Grid>
                        )}
                    </Grid>

                    <StyleImageWrapper>
                        <Wrapper>
                            <Typography variant="h6">Campaign Images</Typography>

                            <Box display="flex" flexDirection="column" gap={4}>
                                {filteredPromoImages.length > 0 ? (
                                    filteredPromoImages.map((image, index) => (
                                        <Card key={index}>
                                            <CardActionArea>
                                                <Typography variant="body2" sx={{ p: 1 }}>
                                                    {image.label}
                                                </Typography>
                                                <CardMedia
                                                    sx={{
                                                        objectFit: "contain",
                                                        height: image.height,
                                                    }}
                                                    component="img"
                                                    image={image.src}
                                                    alt={image.label}
                                                />
                                            </CardActionArea>
                                        </Card>
                                    ))
                                ) : (
                                    <Typography alignItems="center" textAlign="center">
                                        No images available
                                    </Typography>
                                )}
                            </Box>
                        </Wrapper>
                    </StyleImageWrapper>
                </ResponsiveBox>

                <Grid item xs={12} gap={"10px"} display={"flex"}>
                    <Button onClick={toggleButton} size="medium" variant="outlined" disableElevation disableRipple>
                        Terms & Conditions
                    </Button>

                    <Button
                        onClick={() => navigate(buildRoute(routePaths.ListCampaignUsageReport, promoCodeId))}
                        size="medium"
                        variant="outlined"
                        disableElevation
                        disableRipple
                    >
                        View Usage Report
                    </Button>
                </Grid>

                <Modal title=" " open={open} onClose={handleClose}>
                    <Box component="span" dangerouslySetInnerHTML={{ __html: termsAndConditionInformation }} />
                </Modal>
            </PageContentContainer>
        </PageContent>
    );
}
