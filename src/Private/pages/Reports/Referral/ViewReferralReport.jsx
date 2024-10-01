import { useEffect } from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

import dateUtils from "App/utils/dateUtils";
import getFlagUrl from "App/helpers/getFlagUrl";
import Column from "App/components/Column/Column";
import BadgeAvatar from "App/components/Avatar/BadgeAvatar";
import PageContent from "App/components/Container/PageContent";
import PageContentContainer from "App/components/Container/PageContentContainer";

import isEmpty from "App/helpers/isEmpty";
import ReportActions from "../store/actions";
import Center from "App/components/Center/Center";
import routePaths from "Private/config/routePaths";
import ReferralCode from "./components/ReferralCodeBadge";
import ReferralStatusBadge from "./components/ReferralStatusBadge";

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
                    link: routePaths.ListReferralReport,
                },
                {
                    label: "View",
                },
            ]}
        >
            <PageContentContainer title="Referral Report Details">
                {isLoading ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Skeleton
                                sx={{
                                    borderRadius: "0.571rem",
                                }}
                                variant="rectangular"
                                height={160}
                                width="100%"
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Skeleton
                                sx={{
                                    borderRadius: "0.571rem",
                                }}
                                variant="rectangular"
                                height={160}
                                width="100%"
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
                                        avatarUrl={getFlagUrl(ReferralDetails?.referrer_iso2)}
                                        avatarDimension={30}
                                        smallAvatarDimension={0}
                                    />
                                    <Column>
                                        <Typography variant="body1">
                                            {ReferralDetails?.referrer_name ?? ""}
                                            &nbsp; (
                                            {!isEmpty(ReferralDetails?.referrer_customer_id)
                                                ? ReferralDetails?.referrer_customer_id
                                                : ""}
                                            )
                                        </Typography>
                                        <CustomerDetailsWrapper>
                                            <PhoneOutlinedIcon sx={{ marginRight: 1 }} fontSize="12px" />

                                            {!isEmpty(ReferralDetails?.referrer_mobile_no)
                                                ? ReferralDetails?.referrer_mobile_no
                                                : "N/A"}
                                        </CustomerDetailsWrapper>
                                    </Column>
                                </Center>

                                <Box display="flex" gap={4}>
                                    <Column>
                                        <Typography color="text.secondary">Referral Code</Typography>
                                        <ReferralCode code={ReferralDetails?.referrer_referral_code} />
                                    </Column>

                                    <Column>
                                        <Typography color="text.secondary">Total Used</Typography>
                                        <Typography fontWeight={600}>
                                            {!isEmpty(ReferralDetails?.total_referrals)
                                                ? ReferralDetails?.total_referrals
                                                : "N/A"}
                                        </Typography>
                                    </Column>
                                </Box>
                            </ReferralContentWrapper>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <ReferralContentWrapper>
                                <Typography fontSize={16} fontWeight={600}>
                                    Referee Details
                                </Typography>

                                <Center
                                    sx={{
                                        justifyContent: "flex-start",
                                        gap: 2,
                                    }}
                                >
                                    <BadgeAvatar
                                        avatarUrl={getFlagUrl(ReferralDetails?.referee_iso2)}
                                        avatarDimension={30}
                                        smallAvatarDimension={0}
                                    />
                                    <Column>
                                        <Typography variant="body1">
                                            {!isEmpty(ReferralDetails?.referee_name)
                                                ? ReferralDetails?.referee_name
                                                : "N/A"}
                                            (
                                            {!isEmpty(ReferralDetails?.referee_customer_id)
                                                ? ReferralDetails?.referee_customer_id
                                                : "-"}
                                            )
                                        </Typography>
                                        <CustomerDetailsWrapper>
                                            <PhoneOutlinedIcon sx={{ marginRight: 1 }} fontSize="12px" />

                                            {!isEmpty(ReferralDetails?.referee_mobile_no)
                                                ? ReferralDetails?.referee_mobile_no
                                                : "N/A"}
                                        </CustomerDetailsWrapper>
                                    </Column>
                                </Center>

                                <Box display="flex" gap={4}>
                                    <Column>
                                        <Typography color="text.secondary">Registration Date</Typography>
                                        <Typography>
                                            {dateUtils.getLocalDateTimeFromUTC(
                                                ReferralDetails?.referee_registered_date,
                                            )}
                                        </Typography>
                                    </Column>

                                    <Column>
                                        <Typography color="text.secondary">KYC Status</Typography>
                                        <Typography>
                                            <ReferralStatusBadge status={ReferralDetails?.referee_kyc_status} />
                                        </Typography>
                                    </Column>
                                </Box>
                            </ReferralContentWrapper>
                        </Grid>
                    </Grid>
                )}
            </PageContentContainer>
        </PageContent>
    );
}
