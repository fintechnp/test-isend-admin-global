import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Row from "App/components/Row/Row";
import Column from "App/components/Column/Column";
import DashboardCardChart from "./DashboardCardChart";
import DashBoardSendIcon from "App/components/Icon/DashBoardSendIcon";
import DashboardReceiveIcon from "App/components/Icon/DashboardReceiveIcon";
import { useSelector } from "react-redux";
import numberUtils from "App/utils/numberUtils";
import calculatePercentageDifference from "App/helpers/calculatePercentageDifference";
import { Skeleton } from "@mui/material";

export default function OverallTransactionAndCustomer() {
    const theme = useTheme();

    const { response: getTransactionCountResponse, loading: isTransactionCountLoading } = useSelector(
        (state) => state.get_transaction_count_by_status,
    );

    const { response: getPreviousTransactionCountResponse, loading: isPreviousTransactionCountLoading } = useSelector(
        (state) => state.get_compliance_count_by_status_previous,
    );

    const { loading: isLoadingCustomerKycStatByStatus, response: customerKycCountByStatusResponse } = useSelector(
        (state) => state.get_customer_kyc_count_by_status,
    );

    const { loading: customerCountByStatusPreviousLoading, response: previousCustomerKycCountByStatusResponse } =
        useSelector((state) => state.get_customer_kyc_count_by_status_previous);

    const customerCountByStatusData = customerKycCountByStatusResponse?.data;

    const customerCountByStatusPreviousData = previousCustomerKycCountByStatusResponse?.data;

    const transactionCountByStatusData = getTransactionCountResponse?.data;

    const previousTransactionCountByStatusData = getPreviousTransactionCountResponse?.data;

    const overallTransactionData = {
        transaction: {
            totalTransaction: numberUtils.format(transactionCountByStatusData?.totalTxnAmount),
            differenceInPercentage: calculatePercentageDifference(
                transactionCountByStatusData?.totalTxnAmount ?? 0,
                previousTransactionCountByStatusData?.totalTxnAmount ?? 0,
            ),
            isDropped: false,
            childrenData: [
                {
                    title: "Pending",
                    total: numberUtils.format(transactionCountByStatusData?.paymentPendingCount),
                    differenceInPercentage: calculatePercentageDifference(
                        transactionCountByStatusData?.paymentPendingCount ?? 0,
                        previousTransactionCountByStatusData?.paymentPendingCount ?? 0,
                    ),
                    isDropped: true,
                },
                {
                    title: "Payout",
                    total: numberUtils.format(transactionCountByStatusData?.completedStatusCount),
                    differenceInPercentage: calculatePercentageDifference(
                        transactionCountByStatusData?.completedStatusCount ?? 0,
                        previousTransactionCountByStatusData?.completedStatusCount ?? 0,
                    ),
                    isDropped: true,
                },
                {
                    title: "Cancelled",
                    total: numberUtils.format(transactionCountByStatusData?.rejectedRefundedCount),
                    differenceInPercentage: calculatePercentageDifference(
                        transactionCountByStatusData?.rejectedRefundedCount ?? 0,
                        previousTransactionCountByStatusData?.rejectedRefundedCount ?? 0,
                    ),
                    isDropped: false,
                },
            ],
        },
        customer: {
            totalCustomer: numberUtils.format(customerCountByStatusData?.totalCustomer ?? 0),
            differenceInPercentage: calculatePercentageDifference(
                customerCountByStatusData?.totalCustomer ?? 0,
                customerCountByStatusPreviousData?.totalCustomer ?? 0,
            ),
            isDropped: false,
            childrenData: [
                {
                    title: "Verified",
                    total: numberUtils.format(customerCountByStatusData?.kycVerifiedCount ?? 0),
                    differenceInPercentage: calculatePercentageDifference(
                        customerCountByStatusData?.kycVerifiedCount ?? 0,
                        customerCountByStatusPreviousData?.kycVerifiedCount ?? 0,
                    ),
                    isDropped: true,
                },
                {
                    title: "Rejected",
                    total: numberUtils.format(customerCountByStatusData?.kycRejectCount ?? 0),
                    differenceInPercentage: calculatePercentageDifference(
                        customerCountByStatusData?.kycRejectCount ?? 0,
                        customerCountByStatusPreviousData?.kycRejectCount ?? 0,
                    ),
                    isDropped: true,
                },
                {
                    title: "Expired",
                    total: numberUtils.format(customerCountByStatusData?.kycExpiredCount ?? 0),
                    differenceInPercentage: calculatePercentageDifference(
                        customerCountByStatusData?.kycExpiredCount ?? 0,
                        customerCountByStatusPreviousData?.kycExpiredCount ?? 0,
                    ),
                    isDropped: false,
                },
                {
                    title: "Not Started",
                    total: numberUtils.format(customerCountByStatusData?.customerWithNoKycCount ?? 0),
                    differenceInPercentage: calculatePercentageDifference(
                        customerCountByStatusData?.customerWithNoKycCount ?? 0,
                        customerCountByStatusPreviousData?.customerWithNoKycCount ?? 0,
                    ),
                    isDropped: false,
                },
                {
                    title: "Blocked",
                    total: numberUtils.format(customerCountByStatusData?.totalCustomerBlocked ?? 0),
                    differenceInPercentage: calculatePercentageDifference(
                        customerCountByStatusData?.totalCustomerBlocked ?? 0,
                        customerCountByStatusPreviousData?.totalCustomerBlocked ?? 0,
                    ),
                    isDropped: false,
                },
            ],
        },
    };

    const isTotalTransactionLoading = isTransactionCountLoading;

    const isTotalTransactionDataLoading = isTransactionCountLoading || isPreviousTransactionCountLoading;

    const isTotalCustomerKycLoading = isLoadingCustomerKycStatByStatus;

    const isTotalCustomerKycDataLoading = isLoadingCustomerKycStatByStatus || customerCountByStatusPreviousLoading;

    return (
        <Column gap={2}>
            <Typography fontWeight={700} fontSize={16}>
                Overall report
            </Typography>

            <Column
                sx={{
                    marginTop: "16px",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    paddingBottom: "16px",
                }}
            >
                <Typography fontWeight={700} fontSize={14}>
                    Overall Transaction
                </Typography>

                <Column mt={1} gap={1}>
                    <Typography
                        sx={{
                            color: theme.palette.text.secondary,
                        }}
                    >
                        Total Transactions
                    </Typography>

                    {isTotalTransactionLoading ? (
                        <>
                            <Skeleton variant="text" width={130} />
                            <Skeleton variant="rectangular" height={50} width="100%" />
                        </>
                    ) : (
                        <>
                            <Row gap={1} alignItems="center">
                                <Typography fontSize={16} fontWeight={700}>
                                    {overallTransactionData.transaction.totalTransaction}
                                </Typography>
                                <Box>
                                    {overallTransactionData.transaction.isDropped ? (
                                        <DashboardReceiveIcon />
                                    ) : (
                                        <DashBoardSendIcon />
                                    )}
                                </Box>
                                <Typography
                                    sx={{
                                        color: overallTransactionData.transaction.isDropped
                                            ? theme.palette.error.main
                                            : theme.palette.success.main,
                                    }}
                                >
                                    {overallTransactionData.transaction.differenceInPercentage}
                                </Typography>
                            </Row>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 50,
                                }}
                            >
                                <DashboardCardChart />
                            </Box>
                        </>
                    )}

                    <Column gap={"6px"}>
                        {overallTransactionData.transaction.childrenData.map((data, index) => (
                            <Column key={index} mt={1} gap={1}>
                                <Typography
                                    sx={{
                                        color: theme.palette.text.secondary,
                                    }}
                                >
                                    {data.title}
                                </Typography>
                                {isTotalTransactionDataLoading ? (
                                    <Skeleton variant="text" width={130} />
                                ) : (
                                    <Row gap={1} alignItems="center">
                                        <Typography fontSize={16} fontWeight={700}>
                                            $ {data.total}
                                        </Typography>
                                        <Box>{data.isDropped ? <DashboardReceiveIcon /> : <DashBoardSendIcon />}</Box>
                                        <Typography
                                            sx={{
                                                color: data.isDropped
                                                    ? theme.palette.error.main
                                                    : theme.palette.success.main,
                                            }}
                                        >
                                            {data.differenceInPercentage}
                                        </Typography>
                                    </Row>
                                )}
                            </Column>
                        ))}
                    </Column>
                </Column>
            </Column>
            <Column>
                <Typography fontWeight={700} fontSize={14}>
                    Overall Customer
                </Typography>

                <Column mt={1} gap={1}>
                    <Typography
                        sx={{
                            color: theme.palette.text.secondary,
                        }}
                    >
                        Total Customer
                    </Typography>

                    {isTotalCustomerKycLoading ? (
                        <>
                            <Skeleton variant="text" width={130} />
                            <Skeleton variant="rectangular" height={50} width="100%" />
                        </>
                    ) : (
                        <>
                            <Row gap={1} alignItems="center">
                                <Typography fontSize={16} fontWeight={700}>
                                    {overallTransactionData.customer.totalTransaction}
                                </Typography>
                                <Box>
                                    {overallTransactionData.customer.isDropped ? (
                                        <DashboardReceiveIcon />
                                    ) : (
                                        <DashBoardSendIcon />
                                    )}
                                </Box>
                                <Typography
                                    sx={{
                                        color: overallTransactionData.customer.isDropped
                                            ? theme.palette.error.main
                                            : theme.palette.success.main,
                                    }}
                                >
                                    {overallTransactionData.customer.differenceInPercentage}
                                </Typography>
                            </Row>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 50,
                                }}
                            >
                                <DashboardCardChart />
                            </Box>
                        </>
                    )}

                    <Column gap={"6px"}>
                        {overallTransactionData.customer.childrenData.map((data, index) => (
                            <Column key={index} mt={1} gap={1}>
                                <Typography
                                    sx={{
                                        color: theme.palette.text.secondary,
                                    }}
                                >
                                    {data.title}
                                </Typography>

                                {isTotalCustomerKycDataLoading ? (
                                    <>
                                        <Skeleton variant="text" width={130} />
                                    </>
                                ) : (
                                    <Row gap={1} alignItems="center">
                                        <Typography fontSize={16} fontWeight={700}>
                                            {data.total}
                                        </Typography>
                                        <Box>{data.isDropped ? <DashboardReceiveIcon /> : <DashBoardSendIcon />}</Box>
                                        <Typography
                                            sx={{
                                                color: data.isDropped
                                                    ? theme.palette.error.main
                                                    : theme.palette.success.main,
                                            }}
                                        >
                                            {data.differenceInPercentage}
                                        </Typography>
                                    </Row>
                                )}
                            </Column>
                        ))}
                    </Column>
                </Column>
            </Column>
        </Column>
    );
}
