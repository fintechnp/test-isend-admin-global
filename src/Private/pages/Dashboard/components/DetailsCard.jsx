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

const Container = styled(Paper)(({ theme }) => ({
    padding: "16px",
}));

export default function DetailsCard() {
    const theme = useTheme();

    const totalTransactionsData = {
        icon: <DashboardTransactionIcon />,
        totalTransactions: 1254,
        backgroundColor: theme.palette.surface.successSecond,
        change: "12.22%",
        isDropped: false,
        pendingData: {
            total: 254,
            change: "12.22%",
            isDropped: true,
        },
        payoutData: {
            total: 1000,
            change: "12.22%",
            isDropped: true,
        },
        cancelledData: {
            total: 169,
            change: "12.22%",
            isDropped: false,
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
                                    <Row gap="8px" alignItems="center">
                                        <Typography fontWeight={700} fontSize={16}>
                                            $ {totalTransactionsData.totalTransactions}
                                        </Typography>
                                        <Row
                                            gap="4px"
                                            sx={{
                                                backgroundColor: totalTransactionsData.backgroundColor,
                                                padding: "6px",
                                                borderRadius: "16px",
                                            }}
                                            alignItems="center"
                                        >
                                            <Typography>
                                                {!totalTransactionsData.isDropped ? (
                                                    <DashBoardSendIcon />
                                                ) : (
                                                    <DashboardReceiveIcon />
                                                )}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: theme.palette.success.main,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {totalTransactionsData.change}
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
                                                <DashBoardSendIcon />
                                            ) : (
                                                <DashboardReceiveIcon />
                                            )}

                                            <Typography
                                                fontWeight={500}
                                                sx={{
                                                    color: !totalTransactionsData.pendingData.isDropped
                                                        ? theme.palette.error.main
                                                        : theme.palette.success.main,
                                                }}
                                            >
                                                {totalTransactionsData.pendingData.change}
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
                                                <DashBoardSendIcon />
                                            ) : (
                                                <DashboardReceiveIcon />
                                            )}

                                            <Typography
                                                fontWeight={500}
                                                sx={{
                                                    color: !totalTransactionsData.payoutData.isDropped
                                                        ? theme.palette.error.main
                                                        : theme.palette.success.main,
                                                }}
                                            >
                                                {totalTransactionsData.payoutData.change}
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
                                                <DashBoardSendIcon />
                                            ) : (
                                                <DashboardReceiveIcon />
                                            )}

                                            <Typography
                                                fontWeight={500}
                                                sx={{
                                                    color: !totalTransactionsData.cancelledData.isDropped
                                                        ? theme.palette.error.main
                                                        : theme.palette.success.main,
                                                }}
                                            >
                                                {totalTransactionsData.cancelledData.change}
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
                                            $ {totalTransactionsData.totalTransactions}
                                        </Typography>
                                        <Row
                                            gap="4px"
                                            sx={{
                                                backgroundColor: totalTransactionsData.backgroundColor,
                                                padding: "6px",
                                                borderRadius: "16px",
                                            }}
                                            alignItems="center"
                                        >
                                            <Typography>
                                                {!totalTransactionsData.isDropped ? (
                                                    <DashBoardSendIcon />
                                                ) : (
                                                    <DashboardReceiveIcon />
                                                )}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: theme.palette.success.main,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {totalTransactionsData.change}
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
                                                <DashBoardSendIcon />
                                            ) : (
                                                <DashboardReceiveIcon />
                                            )}

                                            <Typography
                                                fontWeight={500}
                                                sx={{
                                                    color: !totalTransactionsData.pendingData.isDropped
                                                        ? theme.palette.error.main
                                                        : theme.palette.success.main,
                                                }}
                                            >
                                                {totalTransactionsData.pendingData.change}
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
                                                <DashBoardSendIcon />
                                            ) : (
                                                <DashboardReceiveIcon />
                                            )}

                                            <Typography
                                                fontWeight={500}
                                                sx={{
                                                    color: !totalTransactionsData.payoutData.isDropped
                                                        ? theme.palette.error.main
                                                        : theme.palette.success.main,
                                                }}
                                            >
                                                {totalTransactionsData.payoutData.change}
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
                                                <DashBoardSendIcon />
                                            ) : (
                                                <DashboardReceiveIcon />
                                            )}

                                            <Typography
                                                fontWeight={500}
                                                sx={{
                                                    color: !totalTransactionsData.cancelledData.isDropped
                                                        ? theme.palette.error.main
                                                        : theme.palette.success.main,
                                                }}
                                            >
                                                {totalTransactionsData.cancelledData.change}
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
