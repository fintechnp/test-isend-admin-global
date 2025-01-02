import React, { useState } from "react";
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
import { Skeleton, ToggleButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { inputBorderRadius } from "App/theme/theme";

const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
        fontWeight: 600,
        lineHeight: "20px",
        backgroundColor: theme.palette.common.white,
        color: theme.palette.text.baseMain,
        padding: "10px 26px 10px 26px",
        border: "none",
        width: 140,
        margin: 0,
        "&:first-of-type": {
            borderRadius: 10,
        },
        "&:last-of-type": {
            borderRadius: 10,
        },
    },

    "& .MuiToggleButtonGroup-grouped:not(.Mui-selected)": {
        // marginRight: "-1px",
    },
    "& .MuiToggleButtonGroup-grouped.Mui-selected": {
        backgroundColor: theme.palette.background.primarySecond,
        "&:first-of-type": {
            // borderRight: `1px solid ${theme.palette.stroke.primary}`,
        },
        "&:not(:first-of-type):not(:last-of-type)": {
            //  borderLeft: `1px solid ${theme.palette.stroke.primary}`,
            borderRight: `1px solid ${theme.palette.stroke.primary}`,
        },
        "&:last-of-type": {
            //  borderLeft: `1px solid ${theme.palette.stroke.primary}`,
        },
    },
}));

export default function OverallTransactionAndCustomer() {
    const theme = useTheme();

    const [transCategory, setTransCategory] = useState("amount");

    const handleTransCategoryChange = (e) => {
        e.target.value === "amount" ? setTransCategory("amount") : setTransCategory("count");
    };

    const { response: getOverallTransaction, loading: isTransactionCountLoading } = useSelector(
        (state) => state.get_overall_transaction_report,
    );

    console.log("The get overall transaction report", getOverallTransaction?.data);

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

    const transactionOverallDataData = getOverallTransaction?.data;

    const previousTransactionCountByStatusData = getPreviousTransactionCountResponse?.data;

    const overallTransactionData = {
        transaction: {
            totalTransactionCount: numberUtils.format(transactionOverallDataData?.totalTxnAmount),
            totalTransactionAmount: `$ 125000`,
            // differenceInPercentage: calculatePercentageDifference(
            //     transactionCountByStatusData?.totalTxnAmount ?? 0,
            //     previousTransactionCountByStatusData?.totalTxnAmount ?? 0,
            // ),
            // isDropped: false,
            childrenData: [
                {
                    title: "Pending",
                    totalCount: numberUtils.format(transactionOverallDataData?.paymentPendingCount),
                    totalAmount: `$ 500`,
                    // differenceInPercentage: calculatePercentageDifference(
                    //     transactionCountByStatusData?.paymentPendingCount ?? 0,
                    //     previousTransactionCountByStatusData?.paymentPendingCount ?? 0,
                    // ),
                    // isDropped: true,
                },
                {
                    title: "Payout",
                    totalCount: numberUtils.format(transactionOverallDataData?.completedStatusCount),
                    totalAmount: `$ 900`,
                    // differenceInPercentage: calculatePercentageDifference(
                    //     transactionCountByStatusData?.completedStatusCount ?? 0,
                    //     previousTransactionCountByStatusData?.completedStatusCount ?? 0,
                    // ),
                    // isDropped: true,
                },
                {
                    title: "Cancelled",
                    totalCount: numberUtils.format(transactionOverallDataData?.rejectedRefundedCount),
                    totalAmount: `$ 12000`,
                    // differenceInPercentage: calculatePercentageDifference(
                    //     transactionCountByStatusData?.rejectedRefundedCount ?? 0,
                    //     previousTransactionCountByStatusData?.rejectedRefundedCount ?? 0,
                    // ),
                    // isDropped: false,
                },
            ],
        },
        customer: {
            totalCustomer: numberUtils.format(customerCountByStatusData?.totalCustomer ?? 0),
            differenceInPercentage: calculatePercentageDifference(
                customerCountByStatusData?.totalCustomer ?? 0,
                customerCountByStatusPreviousData?.totalCustomer ?? 0,
            ),
            isDropped:
                (customerCountByStatusData?.totalCustomer ?? 0) <
                (customerCountByStatusPreviousData?.totalCustomer ?? 0),
            childrenData: [
                {
                    title: "Verified",
                    total: numberUtils.format(customerCountByStatusData?.kycVerifiedCount ?? 0),
                    differenceInPercentage: calculatePercentageDifference(
                        customerCountByStatusData?.kycVerifiedCount ?? 0,
                        customerCountByStatusPreviousData?.kycVerifiedCount ?? 0,
                    ),
                    isDropped:
                        (customerCountByStatusData?.kycVerifiedCount ?? 0) <
                        (customerCountByStatusPreviousData?.kycVerifiedCount ?? 0),
                },
                {
                    title: "Rejected",
                    total: numberUtils.format(customerCountByStatusData?.kycRejectCount ?? 0),
                    differenceInPercentage: calculatePercentageDifference(
                        customerCountByStatusData?.kycRejectCount ?? 0,
                        customerCountByStatusPreviousData?.kycRejectCount ?? 0,
                    ),
                    isDropped:
                        (customerCountByStatusData?.kycRejectCount ?? 0) <
                        (customerCountByStatusPreviousData?.kycRejectCount ?? 0),
                },
                {
                    title: "Expired",
                    total: numberUtils.format(customerCountByStatusData?.kycExpiredCount ?? 0),
                    differenceInPercentage: calculatePercentageDifference(
                        customerCountByStatusData?.kycExpiredCount ?? 0,
                        customerCountByStatusPreviousData?.kycExpiredCount ?? 0,
                    ),
                    isDropped:
                        (customerCountByStatusData?.kycExpiredCount ?? 0) <
                        (customerCountByStatusPreviousData?.kycExpiredCount ?? 0),
                },
                {
                    title: "Not Started",
                    total: numberUtils.format(customerCountByStatusData?.customerWithNoKycCount ?? 0),
                    differenceInPercentage: calculatePercentageDifference(
                        customerCountByStatusData?.customerWithNoKycCount ?? 0,
                        customerCountByStatusPreviousData?.customerWithNoKycCount ?? 0,
                    ),
                    isDropped:
                        (customerCountByStatusData?.customerWithNoKycCount ?? 0) <
                        (customerCountByStatusPreviousData?.customerWithNoKycCount ?? 0),
                },
                {
                    title: "Blocked",
                    total: numberUtils.format(customerCountByStatusData?.totalCustomerBlocked ?? 0),
                    differenceInPercentage: calculatePercentageDifference(
                        customerCountByStatusData?.totalCustomerBlocked ?? 0,
                        customerCountByStatusPreviousData?.totalCustomerBlocked ?? 0,
                    ),
                    isDropped:
                        (customerCountByStatusData?.totalCustomerBlocked ?? 0) <
                        (customerCountByStatusPreviousData?.totalCustomerBlocked ?? 0),
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

                <Box paddingY={1} display="flex" flexDirection="row" justifyContent="center">
                    <ToggleButtonGroup value={transCategory} onChange={handleTransCategoryChange}>
                        <ToggleButton
                            disableRipple
                            // value={isAmount}

                            value="amount"
                        >
                            Amount
                        </ToggleButton>

                        <ToggleButton disableRipple value="count">
                            Count
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

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
                                    {transCategory === "amount"
                                        ? overallTransactionData.transaction.totalTransactionAmount
                                        : overallTransactionData.transaction.totalTransactionCount}

                                    {/* {overallTransactionData.transaction.totalTransactionCount} */}
                                </Typography>
                                {/* <Box>
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
                                </Typography> */}
                            </Row>
                            {/* <Box
                                sx={{
                                    width: "100%",
                                    height: 50,
                                }}
                            >
                                <DashboardCardChart />
                            </Box> */}
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
                                            {transCategory === "amount" ? data.totalAmount : data.totalCount}

                                            {/* {data.totalCount} */}
                                        </Typography>
                                        {/* <Box>{data.isDropped ? <DashboardReceiveIcon /> : <DashBoardSendIcon />}</Box>
                                        <Typography
                                            sx={{
                                                color: data.isDropped
                                                    ? theme.palette.error.main
                                                    : theme.palette.success.main,
                                            }}
                                        >
                                            {data.differenceInPercentage}
                                        </Typography> */}
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
