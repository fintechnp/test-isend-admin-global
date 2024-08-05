import { useEffect } from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import Grid from "@mui/material/Grid";

import dateUtils from "App/utils/dateUtils";
import getFlagUrl from "App/helpers/getFlagUrl";
import Column from "App/components/Column/Column";
import Loader from "App/components/Loader/Loader";
import BadgeAvatar from "App/components/Avatar/BadgeAvatar";
import PageContent from "App/components/Container/PageContent";
import PageContentContainer from "App/components/Container/PageContentContainer";
import KycStatusBadge from "Private/pages/Customers/Search/components/KycStatusBadge";

import ReportActions from "../store/actions";
import routePaths from "Private/config/routePaths";
import ReferralCode from "./components/ReferralCodeBadge";
import Center from "App/components/Center/Center";

const ReferralContentWrapper = styled(Box)(({ theme }) => ({
    border: `1px solid ${theme.palette.stroke.base}`,
    padding: "1.143rem",
    borderRadius: "0.571rem",
    display: "flex",
    flexDirection: "column",
    gap: 8,
}));

const CustomerDetailsWrapper = styled("Typography")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    color: theme.palette.text.secondary,
}));

export default function ViewReferralReport() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { response, loading: isLoading } = useSelector((state) => state.get_referral_report_by_id);

    const ReferralDetails = response?.data;

    useEffect(() => {
        dispatch(ReportActions.get_referral_report_by_id(id));
    }, [dispatch, id]);

    return (
        <PageContent
            breadcrumbs={[
                {
                    label: "Generate Reports",
                },
                {
                    label: "Referral Report",
                    link: routePaths.reports.referralReports,
                },
                {
                    label: "View",
                },
            ]}
        >
            <PageContentContainer title="Referral Report Details">
                {isLoading ? (
                    <Loader />
                ) : (
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item lg={6} md={12}>
                                <ReferralContentWrapper>
                                    <Typography fontWeight={600}>Referral Details</Typography>

                                    <Center
                                        sx={{
                                            justifyContent: "flex-start",
                                            gap: 2,
                                        }}
                                    >
                                        <BadgeAvatar
                                            avatarUrl={getFlagUrl(ReferralDetails?.iso2)}
                                            avatarDimension={30}
                                            smallAvatarDimension={0}
                                        />
                                        <Column>
                                            <Typography variant="body1">
                                                {ReferralDetails?.customer_name} ({ReferralDetails?.customer_id})
                                            </Typography>
                                            <CustomerDetailsWrapper>
                                                <PhoneOutlinedIcon sx={{ marginRight: 1 }} fontSize="12px" />
                                                {ReferralDetails?.mobile_number}
                                            </CustomerDetailsWrapper>
                                        </Column>
                                    </Center>

                                    <Box display="flex" gap={4}>
                                        <Column>
                                            <Typography color="text.secondary">Referral Code</Typography>
                                            <ReferralCode code={ReferralDetails?.referral_code} />
                                        </Column>

                                        <Column>
                                            <Typography color="text.secondary">Referral Code</Typography>
                                            <Typography fontWeight={600}>{ReferralDetails?.total_used}</Typography>
                                        </Column>
                                    </Box>
                                </ReferralContentWrapper>
                            </Grid>

                            <Grid item md={12} lg={6}>
                                <ReferralContentWrapper>
                                    <Typography fontSize={16} fontWeight={600}>
                                        Referral Details
                                    </Typography>

                                    <Center
                                        sx={{
                                            justifyContent: "flex-start",
                                            gap: 2,
                                        }}
                                    >
                                        <BadgeAvatar
                                            avatarUrl={getFlagUrl(ReferralDetails?.referreriso2)}
                                            avatarDimension={30}
                                            smallAvatarDimension={0}
                                        />
                                        <Column>
                                            <Typography variant="body1">
                                                {ReferralDetails?.referred_by ?? "n/a"} (
                                                {ReferralDetails?.referred_by_customer_id ?? "-"})
                                            </Typography>
                                            <CustomerDetailsWrapper>
                                                <PhoneOutlinedIcon sx={{ marginRight: 1 }} fontSize="12px" />
                                                {ReferralDetails?.referred_by_mobilenumber ?? "n/a"}
                                            </CustomerDetailsWrapper>
                                        </Column>
                                    </Center>

                                    <Box display="flex" gap={4}>
                                        <Column>
                                            <Typography color="text.secondary">Registration Date</Typography>
                                            <Typography>
                                                {dateUtils.getLocalDateTimeFromUTC(ReferralDetails?.created_ts)}
                                            </Typography>
                                        </Column>

                                        <Column>
                                            <Typography color="text.secondary">KYC Status</Typography>
                                            <Typography>
                                                <KycStatusBadge
                                                    status={ReferralDetails?.kyc_status}
                                                    label={ReferralDetails?.kyc_status_name}
                                                />
                                            </Typography>
                                        </Column>
                                    </Box>
                                </ReferralContentWrapper>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </PageContentContainer>
        </PageContent>
    );
}
