import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Row from "App/components/Row/Row";
import { useSelector } from "react-redux";
import numberUtils from "App/utils/numberUtils";
import Column from "App/components/Column/Column";
import DashboardCardChart from "./DashboardCardChart";
import DashBoardSendIcon from "App/components/Icon/DashBoardSendIcon";
import DashboardReceiveIcon from "App/components/Icon/DashboardReceiveIcon";
import DashboardCustomerIcon from "App/components/Icon/DashboardCustomerIcon";
import calculatePercentageDifference from "App/helpers/calculatePercentageDifference";

export default function TotalCustomerCard() {
    const theme = useTheme();

    const { loading: isLoadingCustomerKycStatByStatus, response: customerKycCountByStatusResponse } = useSelector(
        (state) => state.get_customer_kyc_count_by_status,
    );

    const { loading: isLoadingPrevious, response: previousCustomerKycCountByStatusResponse } = useSelector(
        (state) => state.get_customer_kyc_count_by_status_previous,
    );

    const customerKycCountByStatusData = customerKycCountByStatusResponse?.data;

    const previousCustomerKycCountByStatusData = previousCustomerKycCountByStatusResponse?.data;

    const customerDetails = {
        isLoading: isLoadingCustomerKycStatByStatus,
        totalCustomers: numberUtils.format(customerKycCountByStatusData?.totalCustomer ?? 0),
        icon: <DashboardCustomerIcon />,
        backgroundColor: theme.palette.surface.successSecond,
        isDropped:
            (customerKycCountByStatusData?.totalCustomer ?? 0) <
            (previousCustomerKycCountByStatusData?.totalCustomer ?? 0),
        differenceInPercentage: calculatePercentageDifference(
            customerKycCountByStatusData?.totalCustomer ?? 0,
            previousCustomerKycCountByStatusData?.totalCustomer ?? 0,
        ),
        childrenData: [
            {
                title: "Verified",
                total: numberUtils.format(customerKycCountByStatusData?.kycVerifiedCount ?? 0),
                differenceInPercentage: calculatePercentageDifference(
                    customerKycCountByStatusData?.kycVerifiedCount ?? 0,
                    previousCustomerKycCountByStatusData?.kycVerifiedCount ?? 0,
                ),
                isDropped:
                    (customerKycCountByStatusData?.kycVerifiedCount ?? 0) <
                    (previousCustomerKycCountByStatusData?.kycVerifiedCount ?? 0),
            },
            {
                title: "Rejected",
                total: numberUtils.format(customerKycCountByStatusData?.kycRejectCount ?? 0),
                differenceInPercentage: calculatePercentageDifference(
                    customerKycCountByStatusData?.kycRejectCount ?? 0,
                    previousCustomerKycCountByStatusData?.kycRejectCount ?? 0,
                ),
                isDropped:
                    (customerKycCountByStatusData?.kycRejectCount ?? 0) <
                    (previousCustomerKycCountByStatusData?.kycRejectCount ?? 0),
            },
            {
                title: "Expired",
                total: numberUtils.format(customerKycCountByStatusData?.kycExpiredCount ?? 0),
                differenceInPercentage: calculatePercentageDifference(
                    customerKycCountByStatusData?.kycExpiredCount ?? 0,
                    previousCustomerKycCountByStatusData?.kycExpiredCount ?? 0,
                ),
                isDropped:
                    (customerKycCountByStatusData?.kycExpiredCount ?? 0) <
                    (previousCustomerKycCountByStatusData?.kycExpiredCount ?? 0),
            },
            {
                title: "Not Started",
                total: numberUtils.format(customerKycCountByStatusData?.customerWithNoKycCount ?? 0),
                differenceInPercentage: calculatePercentageDifference(
                    customerKycCountByStatusData?.customerWithNoKycCount ?? 0,
                    previousCustomerKycCountByStatusData?.customerWithNoKycCount ?? 0,
                ),
                isDropped:
                    (customerKycCountByStatusData?.customerWithNoKycCount ?? 0) <
                    (previousCustomerKycCountByStatusData?.customerWithNoKycCount ?? 0),
            },
            {
                title: "Blocked",
                total: numberUtils.format(customerKycCountByStatusData?.totalCustomerBlocked ?? 0),
                differenceInPercentage: calculatePercentageDifference(
                    customerKycCountByStatusData?.totalCustomerBlocked ?? 0,
                    previousCustomerKycCountByStatusData?.totalCustomerBlocked ?? 0,
                ),
                isDropped:
                    (customerKycCountByStatusData?.totalCustomerBlocked ?? 0) <
                    (previousCustomerKycCountByStatusData?.totalCustomerBlocked ?? 0),
            },
        ],
    };
    return (
        <Column gap={2}>
            <Row alignItems="flex-end" justifyContent="space-between">
                <Row alignItems="center" gap="10px">
                    <Box
                        sx={{
                            padding: "8px",
                            backgroundColor: "#F1F7FE",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {customerDetails.icon}
                    </Box>
                    <Column gap="3px">
                        <Typography
                            sx={(theme) => ({
                                color: theme.palette.text.secondary,
                            })}
                        >
                            Total Customer
                        </Typography>

                        {isLoadingCustomerKycStatByStatus ? (
                            <Skeleton variant="text" width={100} />
                        ) : (
                            <Row gap="8px" alignItems="center">
                                <Typography fontWeight={700} fontSize={16}>
                                    {customerDetails.totalCustomers}
                                </Typography>
                                <Row
                                    gap="4px"
                                    sx={{
                                        backgroundColor: customerDetails.isDropped
                                            ? theme.palette.surface.dangerSecond
                                            : theme.palette.surface.successSecond,
                                        padding: "6px",
                                        borderRadius: "16px",
                                    }}
                                    alignItems="center"
                                >
                                    <Typography>
                                        {customerDetails.isDropped ? <DashboardReceiveIcon /> : <DashBoardSendIcon />}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: customerDetails.isDropped
                                                ? theme.palette.error.main
                                                : theme.palette.success.main,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {customerDetails.differenceInPercentage}%{""}
                                    </Typography>
                                </Row>
                            </Row>
                        )}
                    </Column>
                </Row>
                <Box
                    sx={{
                        width: 200,
                        height: 50,
                    }}
                >
                    {isLoadingCustomerKycStatByStatus ? (
                        <Skeleton variant="rectangular" width={200} height={50} />
                    ) : (
                        <DashboardCardChart />
                    )}
                </Box>
            </Row>
            <Row
                sx={{
                    [theme.breakpoints.down("lg")]: {
                        flexWrap: "wrap",
                    },
                }}
            >
                {customerDetails.childrenData.map((data, index) => {
                    const containsBorder = index !== 0;
                    return (
                        <Column
                            key={index}
                            gap={1}
                            sx={{
                                [theme.breakpoints.up("lg")]: {
                                    borderLeft: containsBorder ? `1px solid ${theme.palette.divider}` : "none",
                                    paddingLeft: "10px",
                                },
                            }}
                        >
                            <Typography
                                sx={(theme) => ({
                                    color: theme.palette.text.secondary,
                                })}
                            >
                                {data.title}
                            </Typography>
                            {isLoadingCustomerKycStatByStatus ? (
                                <Skeleton variant="text" width={100} />
                            ) : (
                                <Row alignItems="center" gap="5px">
                                    <Typography fontSize={16} fontWeight={700}>
                                        {data.total}
                                    </Typography>
                                    <Box>{data.isDropped ? <DashboardReceiveIcon /> : <DashBoardSendIcon />}</Box>
                                    <Typography
                                        sx={{
                                            color: data.isDropped
                                                ? theme.palette.error.main
                                                : theme.palette.success.main,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {data.differenceInPercentage}%{""}
                                    </Typography>
                                </Row>
                            )}
                        </Column>
                    );
                })}
            </Row>

            <Row>
                <Typography
                    sx={{
                        color: theme.palette.primary.main,
                        fontSize: 16,
                        fontWeight: 700,
                        cursor: "pointer",
                    }}
                >
                    View all -{">"}
                </Typography>
            </Row>
        </Column>
    );
}
