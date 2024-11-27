import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Row from "App/components/Row/Row";
import Column from "App/components/Column/Column";
import DashboardCardChart from "./DashboardCardChart";
import DashBoardSendIcon from "App/components/Icon/DashBoardSendIcon";
import DashboardReceiveIcon from "App/components/Icon/DashboardReceiveIcon";

const overallTransactionData = {
    transaction: {
        totalTransaction: 1254,
        change: "12.22%",
        isDropped: false,
        childrenData: [
            {
                title: "Pending",
                total: 254,
                change: "12.22%",
                isDropped: true,
            },
            {
                title: "Payout",
                total: 2254,
                change: "12.22%",
                isDropped: true,
            },
            {
                title: "Cancelled",
                total: 54,
                change: "12.22%",
                isDropped: false,
            },
        ],
    },
    customer: {
        totalCustomer: 1254,
        change: "12.22%",
        isDropped: false,
        childrenData: [
            {
                title: "Verified",
                total: 254,
                change: "12.22%",
                isDropped: true,
            },
            {
                title: "Rejected",
                total: 2254,
                change: "12.22%",
                isDropped: true,
            },
            {
                title: "Expired",
                total: 54,
                change: "12.22%",
                isDropped: false,
            },
            {
                title: "Not Started",
                total: 54,
                change: "12.22%",
                isDropped: false,
            },
            {
                title: "Nearly Expired",
                total: 54,
                change: "12.22%",
                isDropped: false,
            },
        ],
    },
};

export default function OverallTransactionAndCustomer() {
    const theme = useTheme();
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
                            {overallTransactionData.transaction.change}
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
                                        {data.change}
                                    </Typography>
                                </Row>
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
                            {overallTransactionData.customer.change}
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
                                        {data.change}
                                    </Typography>
                                </Row>
                            </Column>
                        ))}
                    </Column>
                </Column>
            </Column>
        </Column>
    );
}
