import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "App/components/Paper/Paper";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";

import Row from "App/components/Row/Row";
import TransactionStat from "./TransactionStat";
import Column from "App/components/Column/Column";
import TotalCustomerCard from "./TotalCustomerCard";
import DashboardCardChart from "./DashboardCardChart";
import AllOverallDataChip from "./AllOverallDataChip";
import DashboardPartnerBarChart from "./DashboardPartnerBarChart";
import DashBoardSendIcon from "App/components/Icon/DashBoardSendIcon";
import DashboardReceiveIcon from "App/components/Icon/DashboardReceiveIcon";
import DashboardPayoutCountryBarChart from "./DashboardPayoutCountryBarChart";
import DashboardTransactionIcon from "App/components/Icon/DashboardTransactionIcon";
import { useSelector } from "react-redux";
import numberUtils from "App/utils/numberUtils";
import calculatePercentageDifference from "App/helpers/calculatePercentageDifference";
import { Skeleton } from "@mui/material";

const Container = styled(Paper)(({ theme }) => ({
    padding: "16px",
}));

export default function DetailsCard() {
    const theme = useTheme();

    const { loading: isLoadingTransactionStat, response: transactionCountByStatusResponse } = useSelector(
        (state) => state.get_transaction_count_by_status,
    );

    const { loading: isLoadingTransactionStatPrevious, response: transactionCountByStatusResponsePrevious } =
        useSelector((state) => state.get_transaction_count_by_status_previous);

    const transactionCountByStatusData = transactionCountByStatusResponse?.data;

    const previousTransactionCountByStatusData = transactionCountByStatusResponsePrevious?.data;

    const totalTransactionsData = {
        isLoading: isLoadingTransactionStat,
        isSubDataLoading: isLoadingTransactionStat || isLoadingTransactionStatPrevious,
        icon: <DashboardTransactionIcon />,
        totalTransactions: numberUtils.format(transactionCountByStatusData?.totalTxnAmount),
        backgroundColor: theme.palette.surface.primarySecond,
        totalDifferenceInPercentage: calculatePercentageDifference(
            transactionCountByStatusData?.totalTxnAmount ?? 0,
            previousTransactionCountByStatusData?.totalTxnAmount ?? 0,
        ),
        isDropped:
            (transactionCountByStatusData?.totalTxnAmount ?? 0) <
            (previousTransactionCountByStatusData?.totalTxnAmount ?? 0),
        pendingData: {
            total: numberUtils.format(transactionCountByStatusData?.paymentPendingCount),
            totalDifferenceInPercentage: calculatePercentageDifference(
                transactionCountByStatusData?.paymentPendingCount ?? 0,
                previousTransactionCountByStatusData?.paymentPendingCount ?? 0,
            ),
            isDropped:
                (transactionCountByStatusData?.paymentPendingCount ?? 0) <
                (previousTransactionCountByStatusData?.paymentPendingCount ?? 0),
        },
        payoutData: {
            total: numberUtils.format(transactionCountByStatusData?.completedStatusCount),
            totalDifferenceInPercentage: calculatePercentageDifference(
                transactionCountByStatusData?.completedStatusCount ?? 0,
                previousTransactionCountByStatusData?.completedStatusCount ?? 0,
            ),
            isDropped:
                (transactionCountByStatusData?.completedStatusCount ?? 0) <
                (previousTransactionCountByStatusData?.completedStatusCount ?? 0),
        },
        cancelledData: {
            total: numberUtils.format(transactionCountByStatusData?.rejectedRefundedCount),
            totalDifferenceInPercentage: calculatePercentageDifference(
                transactionCountByStatusData?.rejectedRefundedCount ?? 0,
                previousTransactionCountByStatusData?.rejectedRefundedCount ?? 0,
            ),
            isDropped:
                (transactionCountByStatusData?.rejectedRefundedCount ?? 0) <
                (previousTransactionCountByStatusData?.rejectedRefundedCount ?? 0),
        },
    };

    return (
        <Grid container spacing={"16px"}>
            <Grid item xs={12} lg={6}>
                <Container>
                    <Column gap={2}>
                        <Row alignItems="flex-end" justifyContent="space-between">
                            <Row gap="10px" alignItems="center">
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
                                    {totalTransactionsData.icon}
                                </Box>
                                <Column gap="3px">
                                    <Typography
                                        sx={(theme) => ({
                                            color: theme.palette.text.secondary,
                                        })}
                                    >
                                        Total Transactions
                                    </Typography>
                                    {totalTransactionsData.isLoading ? (
                                        <Skeleton variant="text" width={100} />
                                    ) : (
                                        <Row gap="8px" alignItems="center">
                                            <Typography fontWeight={700} fontSize={16}>
                                                {totalTransactionsData.totalTransactions}
                                            </Typography>
                                            <Row
                                                gap="4px"
                                                sx={{
                                                    backgroundColor: totalTransactionsData.isDropped
                                                        ? theme.palette.surface.dangerSecond
                                                        : theme.palette.surface.primarySecond,
                                                    padding: "6px",
                                                    borderRadius: "16px",
                                                }}
                                                alignItems="center"
                                            >
                                                <Typography>
                                                    {totalTransactionsData.isDropped ? (
                                                        <DashboardReceiveIcon />
                                                    ) : (
                                                        <DashBoardSendIcon />
                                                    )}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        color: totalTransactionsData.isDropped
                                                            ? theme.palette.error.main
                                                            : theme.palette.success.main,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {totalTransactionsData.totalDifferenceInPercentage}%
                                                </Typography>
                                            </Row>
                                        </Row>
                                    )}
                                </Column>
                            </Row>
                            <Box
                                sx={{
                                    width: 150,
                                    height: 50,
                                }}
                            >
                                {totalTransactionsData.isLoading ? (
                                    <Skeleton variant="rectangular" height="80%" width={150} />
                                ) : (
                                    <DashboardCardChart />
                                )}
                            </Box>
                        </Row>
                        <Grid
                            container
                            spacing={2}
                            sx={{
                                marginTop: "4px",
                            }}
                        >
                            <Grid item xs={12} lg={4}>
                                <Column gap="4px">
                                    <Typography
                                        sx={(theme) => ({
                                            color: theme.palette.text.secondary,
                                        })}
                                    >
                                        Pending
                                    </Typography>

                                    {totalTransactionsData.isSubDataLoading ? (
                                        <Skeleton variant="text" width={80} />
                                    ) : (
                                        <Row gap={1}>
                                            <Typography fontWeight={700} fontSize={16}>
                                                {totalTransactionsData.pendingData.total}
                                            </Typography>
                                            <Row alignItems="center" gap="4px">
                                                {totalTransactionsData.pendingData.isDropped ? (
                                                    <DashboardReceiveIcon />
                                                ) : (
                                                    <DashBoardSendIcon />
                                                )}

                                                <Typography
                                                    fontWeight={500}
                                                    sx={{
                                                        color: totalTransactionsData.pendingData.isDropped
                                                            ? theme.palette.error.main
                                                            : theme.palette.success.main,
                                                    }}
                                                >
                                                    {totalTransactionsData.pendingData.totalDifferenceInPercentage}%{" "}
                                                </Typography>
                                            </Row>
                                        </Row>
                                    )}
                                </Column>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                lg={4}
                                // sx={(theme) => ({
                                //     borderLeft: `1px solid ${theme.palette.divider}`,
                                //     borderRight: `1px solid ${theme.palette.divider}`,
                                // })}
                            >
                                <Column gap="4px">
                                    <Typography
                                        sx={(theme) => ({
                                            color: theme.palette.text.secondary,
                                        })}
                                    >
                                        Payout
                                    </Typography>

                                    {totalTransactionsData.isSubDataLoading ? (
                                        <Skeleton variant="text" width={80} />
                                    ) : (
                                        <Row gap={1}>
                                            <Typography fontWeight={700} fontSize={16}>
                                                {totalTransactionsData.payoutData.total}
                                            </Typography>
                                            <Row alignItems="center" gap="4px">
                                                {totalTransactionsData.payoutData.isDropped ? (
                                                    <DashboardReceiveIcon />
                                                ) : (
                                                    <DashBoardSendIcon />
                                                )}

                                                <Typography
                                                    fontWeight={500}
                                                    sx={{
                                                        color: totalTransactionsData.payoutData.isDropped
                                                            ? theme.palette.error.main
                                                            : theme.palette.success.main,
                                                    }}
                                                >
                                                    {totalTransactionsData.payoutData.totalDifferenceInPercentage}%{" "}
                                                </Typography>
                                            </Row>
                                        </Row>
                                    )}
                                </Column>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Column gap="4px">
                                    <Typography
                                        sx={(theme) => ({
                                            color: theme.palette.text.secondary,
                                        })}
                                    >
                                        Cancelled
                                    </Typography>
                                    {totalTransactionsData.isSubDataLoading ? (
                                        <Skeleton variant="text" width={80} />
                                    ) : (
                                        <Row gap={1}>
                                            <Typography fontWeight={700} fontSize={16}>
                                                {totalTransactionsData.cancelledData.total}
                                            </Typography>
                                            <Row alignItems="center" gap="4px">
                                                {totalTransactionsData.cancelledData.isDropped ? (
                                                    <DashboardReceiveIcon />
                                                ) : (
                                                    <DashBoardSendIcon />
                                                )}

                                                <Typography
                                                    fontWeight={500}
                                                    sx={{
                                                        color: totalTransactionsData.cancelledData.isDropped
                                                            ? theme.palette.error.main
                                                            : theme.palette.success.main,
                                                    }}
                                                >
                                                    {totalTransactionsData.cancelledData.totalDifferenceInPercentage}%{" "}
                                                </Typography>
                                            </Row>
                                        </Row>
                                    )}
                                </Column>
                            </Grid>
                        </Grid>
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
                </Container>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Container>
                    <Column gap={2}>
                        <Row alignItems="flex-end" justifyContent="space-between">
                            <Row gap="10px" alignItems="center">
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
                                    {totalTransactionsData.icon}
                                </Box>
                                <Column gap="3px">
                                    <Typography
                                        sx={(theme) => ({
                                            color: theme.palette.text.secondary,
                                        })}
                                    >
                                        Total Transactions
                                    </Typography>
                                    <Row gap="8px" alignItems="center">
                                        <Typography fontWeight={700} fontSize={16}>
                                            {totalTransactionsData.totalTransactions}
                                        </Typography>
                                        <Row
                                            gap="4px"
                                            sx={{
                                                backgroundColor: totalTransactionsData.isDropped
                                                    ? theme.palette.surface.dangerSecond
                                                    : theme.palette.surface.primarySecond,
                                                padding: "6px",
                                                borderRadius: "16px",
                                            }}
                                            alignItems="center"
                                        >
                                            <Typography>
                                                {totalTransactionsData.isDropped ? (
                                                    <DashboardReceiveIcon />
                                                ) : (
                                                    <DashBoardSendIcon />
                                                )}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: totalTransactionsData.isDropped
                                                        ? theme.palette.error.main
                                                        : theme.palette.success.main,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {totalTransactionsData.totalDifferenceInPercentage}
                                            </Typography>
                                        </Row>
                                    </Row>
                                </Column>
                            </Row>
                            <Box
                                sx={{
                                    width: 150,
                                    height: 50,
                                }}
                            >
                                <DashboardCardChart />
                            </Box>
                        </Row>
                        <Grid
                            container
                            spacing={2}
                            sx={{
                                marginTop: "4px",
                            }}
                        >
                            <Grid item xs={12} lg={4}>
                                <Column gap="4px">
                                    <Typography
                                        sx={(theme) => ({
                                            color: theme.palette.text.secondary,
                                        })}
                                    >
                                        Pending
                                    </Typography>
                                    <Row gap={1}>
                                        <Typography fontWeight={700} fontSize={16}>
                                            {totalTransactionsData.pendingData.total}
                                        </Typography>
                                        <Row alignItems="center" gap="4px">
                                            {totalTransactionsData.pendingData.isDropped ? (
                                                <DashboardReceiveIcon />
                                            ) : (
                                                <DashBoardSendIcon />
                                            )}

                                            <Typography
                                                fontWeight={500}
                                                sx={{
                                                    color: totalTransactionsData.pendingData.isDropped
                                                        ? theme.palette.error.main
                                                        : theme.palette.success.main,
                                                }}
                                            >
                                                {totalTransactionsData.pendingData.totalDifferenceInPercentage}%{""}
                                            </Typography>
                                        </Row>
                                    </Row>
                                </Column>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                lg={4}
                                // sx={(theme) => ({
                                //     borderLeft: `1px solid ${theme.palette.divider}`,
                                //     borderRight: `1px solid ${theme.palette.divider}`,
                                // })}
                            >
                                <Column gap="4px">
                                    <Typography
                                        sx={(theme) => ({
                                            color: theme.palette.text.secondary,
                                        })}
                                    >
                                        Payout
                                    </Typography>
                                    <Row gap={1}>
                                        <Typography fontWeight={700} fontSize={16}>
                                            {totalTransactionsData.payoutData.total}
                                        </Typography>
                                        <Row alignItems="center" gap="4px">
                                            {totalTransactionsData.payoutData.isDropped ? (
                                                <DashboardReceiveIcon />
                                            ) : (
                                                <DashBoardSendIcon />
                                            )}

                                            <Typography
                                                fontWeight={500}
                                                sx={{
                                                    color: totalTransactionsData.payoutData.isDropped
                                                        ? theme.palette.error.main
                                                        : theme.palette.success.main,
                                                }}
                                            >
                                                {totalTransactionsData.payoutData.totalDifferenceInPercentage}%{""}
                                            </Typography>
                                        </Row>
                                    </Row>
                                </Column>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Column gap="4px">
                                    <Typography
                                        sx={(theme) => ({
                                            color: theme.palette.text.secondary,
                                        })}
                                    >
                                        Cancelled
                                    </Typography>
                                    <Row gap={1}>
                                        <Typography fontWeight={700} fontSize={16}>
                                            {totalTransactionsData.cancelledData.total}
                                        </Typography>
                                        <Row alignItems="center" gap="4px">
                                            {totalTransactionsData.cancelledData.isDropped ? (
                                                <DashboardReceiveIcon />
                                            ) : (
                                                <DashBoardSendIcon />
                                            )}

                                            <Typography
                                                fontWeight={500}
                                                sx={{
                                                    color: totalTransactionsData.cancelledData.isDropped
                                                        ? theme.palette.error.main
                                                        : theme.palette.success.main,
                                                }}
                                            >
                                                {totalTransactionsData.cancelledData.totalDifferenceInPercentage}%{""}
                                            </Typography>
                                        </Row>
                                    </Row>
                                </Column>
                            </Grid>
                        </Grid>
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
                </Container>
            </Grid>
            <Grid item xs={12}>
                <Container>
                    <TotalCustomerCard />
                </Container>
            </Grid>
            <Grid item xs={12}>
                <TransactionStat />
            </Grid>

            <Grid
                item
                xs={12}
                lg={6}
                sx={{
                    display: "grid",
                    gridTemplateRows: "subgrid",
                    gridRow: "span 4",
                }}
            >
                <Container>
                    <DashboardPayoutCountryBarChart />
                </Container>
            </Grid>
            <Grid
                item
                xs={12}
                lg={6}
                sx={{
                    display: "grid",
                    gridTemplateRows: "subgrid",
                    gridRow: "span 4",
                }}
            >
                <Container>
                    <DashboardPartnerBarChart />
                </Container>
            </Grid>
            <Grid item xs={12}>
                <AllOverallDataChip />
            </Grid>
        </Grid>
    );
}
