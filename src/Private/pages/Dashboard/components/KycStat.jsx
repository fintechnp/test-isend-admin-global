import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";

import StatBadge from "./StatBadge";
import Row from "App/components/Row/Row";
import Paper from "App/components/Paper/Paper";
import Column from "App/components/Column/Column";
import Center from "App/components/Center/Center";
import KycExpiredIcon from "App/components/Icon/KycExpiredIcon";
import KycVerifiedIcon from "App/components/Icon/KycVerifiedIcon";
import KycRejectedIcon from "App/components/Icon/KycRejectedIcon";
import KycNotStartedIcon from "App/components/Icon/KycNotStartedIcon";

import numberUtils from "App/utils/numberUtils";
import calculatePercentageDifference from "App/helpers/calculatePercentageDifference";

const Container = styled(Paper)(({ theme }) => ({
    padding: "16px",
    width: "100%",
    "& .recharts-wrapper": {
        maxWidth: "532px",
    },
}));

export default function KycStat() {
    const theme = useTheme();

    const { loading: isLoadingCurrent, response } = useSelector((state) => state.get_customer_kyc_count_by_status);

    const { loading: isLoadingPrevious, response: responsePrevious } = useSelector(
        (state) => state.get_customer_kyc_count_by_status_previous,
    );

    const isLoading = isLoadingCurrent || isLoadingPrevious;

    const data = response?.data;

    const previousData = responsePrevious?.data;

    const statsData = [
        {
            label: "Total Verified",
            icon: <KycVerifiedIcon />,
            currentCount: data?.kycVerifiedCount ?? 0,
            previousCount: previousData?.kycVerifiedCount ?? 0,
            differenceInPercent: calculatePercentageDifference(
                data?.kycVerifiedCount ?? 0,
                previousData?.kycVerifiedCount ?? 0,
            ),
            iconBgColor: theme.palette.surface.successSecond,
        },
        {
            label: "Total Rejected",
            icon: <KycRejectedIcon />,
            currentCount: data?.kycRejectCount ?? 0,
            previousCount: previousData?.kycRejectCount ?? 0,
            differenceInPercent: calculatePercentageDifference(
                data?.kycRejectCount ?? 0,
                previousData?.kycRejectCount ?? 0,
            ),
            iconBgColor: theme.palette.surface.dangerSecond,
        },
        {
            label: "Total Expired",
            icon: <KycExpiredIcon />,
            currentCount: data?.kycExpiredCount ?? 0,
            previousCount: previousData?.kycExpiredCount ?? 0,
            differenceInPercent: calculatePercentageDifference(
                data?.kycExpiredCount ?? 0,
                previousData?.kycExpiredCount ?? 0,
            ),
            iconBgColor: theme.palette.surface.warningSecond,
        },
        {
            label: "Total Not Started",
            icon: <KycNotStartedIcon />,
            currentCount: data?.customerWithNoKycCount ?? 0,
            previousCount: previousData?.customerWithNoKycCount ?? 0,
            differenceInPercent: calculatePercentageDifference(
                data?.customerWithNoKycCount ?? 0,
                previousData?.customerWithNoKycCount ?? 0,
            ),

            iconBgColor: theme.palette.surface.purpleSecond,
        },
    ];

    const differenceInCustomer = calculatePercentageDifference(
        data?.totalCustomer ?? 0,
        previousData?.totalCustomer ?? 0,
    );

    return (
        <Container>
            <Column gap="24px">
                <Typography variant="h6">KYC Report</Typography>

                <Column>
                    <Row gap="4px" alignItems="flex-end">
                        <Typography fontWeight={600} variant="h4" color="text.primary">
                            {numberUtils.format(data?.totalCustomer)}
                        </Typography>
                        <StatBadge
                            label={differenceInCustomer + "%"}
                            circuitType={
                                differenceInCustomer > 0
                                    ? "positive"
                                    : differenceInCustomer < 0
                                      ? "negative"
                                      : "neutral"
                            }
                            sx={{ mb: 1 }}
                        />
                    </Row>
                    <Typography fontSize="1rem" lineHeight="1.429rem" color="text.secondary">
                        Total Customer
                    </Typography>
                </Column>

                {statsData.map((stat, index) => (
                    <Row key={index} justifyContent="center" alignItems="center" gap="4px">
                        <Center
                            sx={{
                                height: "24px",
                                width: "24px",
                                mr: "4px",
                                borderRadius: "4px",
                                background: stat.iconBgColor,
                            }}
                        >
                            {stat.icon}
                        </Center>
                        <Typography color="text.primary">{stat.label}</Typography>
                        <Box>
                            <StatBadge
                                label={stat.differenceInPercent + "%"}
                                circuitType={
                                    stat.differenceInPercent > 0
                                        ? "positive"
                                        : stat.differenceInPercent < 0
                                          ? "negative"
                                          : "neutral"
                                }
                            />
                        </Box>
                        <Box flex={1}></Box>
                        {isLoading ? (
                            <Skeleton width="50px" />
                        ) : (
                            <Typography fontWeight={600}>{stat.currentCount}</Typography>
                        )}
                    </Row>
                ))}
            </Column>
        </Container>
    );
}
