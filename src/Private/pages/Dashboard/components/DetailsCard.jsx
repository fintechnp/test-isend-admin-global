import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import Paper from "App/components/Paper/Paper";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";

import Row from "App/components/Row/Row";
import numberUtils from "App/utils/numberUtils";
import Column from "App/components/Column/Column";
import DashBoardSendIcon from "App/components/Icon/DashBoardSendIcon";
import DashboardReceiveIcon from "App/components/Icon/DashboardReceiveIcon";
import DashboardTransactionIcon from "App/components/Icon/DashboardTransactionIcon";
import calculatePercentageDifference from "App/helpers/calculatePercentageDifference";

import DashboardCardChart from "./DashboardCardChart";
import HasPermission from "Private/components/shared/HasPermission";
import { permissions } from "Private/data/permissions";

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
        totalTransactionAmount: numberUtils.format(transactionCountByStatusData?.totalTransactionsAmount),
        totalTransactionCount: numberUtils.format(transactionCountByStatusData?.totalTransactionsCount),
        backgroundColor: theme.palette.surface.primarySecond,
        totalDifferenceInPercentageCount: calculatePercentageDifference(
            transactionCountByStatusData?.totalTransactionsCount ?? 0,
            previousTransactionCountByStatusData?.totalTransactionsCount ?? 0,
        ),

        totalDifferenceInPercentageAmount: calculatePercentageDifference(
            transactionCountByStatusData?.totalTransactionsAmount ?? 0,
            previousTransactionCountByStatusData?.totalTransactionsAmount ?? 0,
        ),

        isDropped:
            (transactionCountByStatusData?.totalTransactionsAmount ?? 0) <
            (previousTransactionCountByStatusData?.totalTransactionsAmount ?? 0),

        countData: {
            pendingData: {
                total: numberUtils.format(transactionCountByStatusData?.pendingCount),
                totalDifferenceInPercentage: calculatePercentageDifference(
                    transactionCountByStatusData?.pendingCount ?? 0,
                    previousTransactionCountByStatusData?.pendingCount ?? 0,
                ),
                isDropped:
                    (transactionCountByStatusData?.pendingCount ?? 0) <
                    (previousTransactionCountByStatusData?.pendingCount ?? 0),
            },
            payoutData: {
                total: numberUtils.format(transactionCountByStatusData?.payoutCount),
                totalDifferenceInPercentage: calculatePercentageDifference(
                    transactionCountByStatusData?.payoutCount ?? 0,
                    previousTransactionCountByStatusData?.payoutCount ?? 0,
                ),
                isDropped:
                    (transactionCountByStatusData?.payoutCount ?? 0) <
                    (previousTransactionCountByStatusData?.payoutCount ?? 0),
            },
            cancelledData: {
                total: numberUtils.format(transactionCountByStatusData?.cancelledCount),
                totalDifferenceInPercentage: calculatePercentageDifference(
                    transactionCountByStatusData?.cancelledCount ?? 0,
                    previousTransactionCountByStatusData?.cancelledCount ?? 0,
                ),
                isDropped:
                    (transactionCountByStatusData?.cancelledCount ?? 0) <
                    (previousTransactionCountByStatusData?.cancelledCount ?? 0),
            },
        },

        amountData: {
            pendingData: {
                total: numberUtils.format(transactionCountByStatusData?.pendingAmount),
                totalDifferenceInPercentage: calculatePercentageDifference(
                    transactionCountByStatusData?.pendingAmount ?? 0,
                    previousTransactionCountByStatusData?.pendingAmount ?? 0,
                ),
                isDropped:
                    (transactionCountByStatusData?.pendingAmount ?? 0) <
                    (previousTransactionCountByStatusData?.pendingAmount ?? 0),
            },
            payoutData: {
                total: numberUtils.format(transactionCountByStatusData?.payoutAmount),
                totalDifferenceInPercentage: calculatePercentageDifference(
                    transactionCountByStatusData?.payoutAmount ?? 0,
                    previousTransactionCountByStatusData?.payoutAmount ?? 0,
                ),
                isDropped:
                    (transactionCountByStatusData?.payoutAmount ?? 0) <
                    (previousTransactionCountByStatusData?.payoutAmount ?? 0),
            },
            cancelledData: {
                total: numberUtils.format(transactionCountByStatusData?.cancelledAmount),
                totalDifferenceInPercentage: calculatePercentageDifference(
                    transactionCountByStatusData?.cancelledAmount ?? 0,
                    previousTransactionCountByStatusData?.cancelledAmount ?? 0,
                ),
                isDropped:
                    (transactionCountByStatusData?.cancelledAmount ?? 0) <
                    (previousTransactionCountByStatusData?.cancelledAmount ?? 0),
            },
        },
    };

    return (
        <Grid container spacing="16px">
            <HasPermission permission={permissions.DASH_TXN_COUNT}>
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
                                                    {totalTransactionsData.totalTransactionCount}
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
                                                        {totalTransactionsData.totalDifferenceInPercentageCount}%
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
                                                    {totalTransactionsData.countData.pendingData.total}
                                                </Typography>
                                                <Row alignItems="center" gap="4px">
                                                    {totalTransactionsData.countData.pendingData.isDropped ? (
                                                        <DashboardReceiveIcon />
                                                    ) : (
                                                        <DashBoardSendIcon />
                                                    )}

                                                    <Typography
                                                        fontWeight={500}
                                                        sx={{
                                                            color: totalTransactionsData.countData.pendingData.isDropped
                                                                ? theme.palette.error.main
                                                                : theme.palette.success.main,
                                                        }}
                                                    >
                                                        {
                                                            totalTransactionsData.countData.pendingData
                                                                .totalDifferenceInPercentage
                                                        }
                                                        %{" "}
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
                                                    {totalTransactionsData.countData.payoutData.total}
                                                </Typography>
                                                <Row alignItems="center" gap="4px">
                                                    {totalTransactionsData.countData.payoutData.isDropped ? (
                                                        <DashboardReceiveIcon />
                                                    ) : (
                                                        <DashBoardSendIcon />
                                                    )}

                                                    <Typography
                                                        fontWeight={500}
                                                        sx={{
                                                            color: totalTransactionsData.countData.payoutData.isDropped
                                                                ? theme.palette.error.main
                                                                : theme.palette.success.main,
                                                        }}
                                                    >
                                                        {
                                                            totalTransactionsData.countData.payoutData
                                                                .totalDifferenceInPercentage
                                                        }
                                                        %{" "}
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
                                                    {totalTransactionsData.countData.cancelledData.total}
                                                </Typography>
                                                <Row alignItems="center" gap="4px">
                                                    {totalTransactionsData.countData.cancelledData.isDropped ? (
                                                        <DashboardReceiveIcon />
                                                    ) : (
                                                        <DashBoardSendIcon />
                                                    )}

                                                    <Typography
                                                        fontWeight={500}
                                                        sx={{
                                                            color: totalTransactionsData.countData.cancelledData
                                                                .isDropped
                                                                ? theme.palette.error.main
                                                                : theme.palette.success.main,
                                                        }}
                                                    >
                                                        {
                                                            totalTransactionsData.countData.cancelledData
                                                                .totalDifferenceInPercentage
                                                        }
                                                        %{" "}
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
            </HasPermission>

            <HasPermission permission={permissions.DASH_TXN_AMOUNT}>
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
                                                    {"$"} {totalTransactionsData.totalTransactionAmount}
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
                                                        {totalTransactionsData.totalDifferenceInPercentageAmount}
                                                        {"%"}
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
                                                    {totalTransactionsData.amountData.pendingData.total}
                                                </Typography>
                                                <Row alignItems="center" gap="4px">
                                                    {totalTransactionsData.amountData.pendingData.isDropped ? (
                                                        <DashboardReceiveIcon />
                                                    ) : (
                                                        <DashBoardSendIcon />
                                                    )}

                                                    <Typography
                                                        fontWeight={500}
                                                        sx={{
                                                            color: totalTransactionsData.amountData.pendingData
                                                                .isDropped
                                                                ? theme.palette.error.main
                                                                : theme.palette.success.main,
                                                        }}
                                                    >
                                                        {
                                                            totalTransactionsData.amountData.pendingData
                                                                .totalDifferenceInPercentage
                                                        }
                                                        %{""}
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
                                                    {totalTransactionsData.amountData.payoutData.total}
                                                </Typography>
                                                <Row alignItems="center" gap="4px">
                                                    {totalTransactionsData.amountData.payoutData.isDropped ? (
                                                        <DashboardReceiveIcon />
                                                    ) : (
                                                        <DashBoardSendIcon />
                                                    )}

                                                    <Typography
                                                        fontWeight={500}
                                                        sx={{
                                                            color: totalTransactionsData.amountData.payoutData.isDropped
                                                                ? theme.palette.error.main
                                                                : theme.palette.success.main,
                                                        }}
                                                    >
                                                        {
                                                            totalTransactionsData.amountData.payoutData
                                                                .totalDifferenceInPercentage
                                                        }
                                                        %{""}
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
                                                    {totalTransactionsData.amountData.cancelledData.total}
                                                </Typography>
                                                <Row alignItems="center" gap="4px">
                                                    {totalTransactionsData.amountData.cancelledData.isDropped ? (
                                                        <DashboardReceiveIcon />
                                                    ) : (
                                                        <DashBoardSendIcon />
                                                    )}

                                                    <Typography
                                                        fontWeight={500}
                                                        sx={{
                                                            color: totalTransactionsData.amountData.cancelledData
                                                                .isDropped
                                                                ? theme.palette.error.main
                                                                : theme.palette.success.main,
                                                        }}
                                                    >
                                                        {
                                                            totalTransactionsData.amountData.cancelledData
                                                                .totalDifferenceInPercentage
                                                        }
                                                        %{""}
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
            </HasPermission>
        </Grid>
    );
}
