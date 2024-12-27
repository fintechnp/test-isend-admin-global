import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import TooltipMUI from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SquareIcon from "@mui/icons-material/Square";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import Row from "App/components/Row/Row";
import Paper from "App/components/Paper/Paper";

export default function TransactionStat() {
    const theme = useTheme();

    const { response: getOverallTransactionResponse, loading: isLoading } = useSelector(
        (state) => state.get_overall_transaction_linegraph,
    );

    const statsData = [
        {
            name: "Pending",
            color: "#105BB7",
        },
        {
            name: "Payout",
            color: "#4C96EF",
        },
        {
            name: "Cancelled",
            color: "#136FE0",
        },
    ];

    const overallTransactionData = getOverallTransactionResponse?.data?.map((item) => ({
        day: item?.dayOfWeekName,
        pendingAmount: item?.pendingAmount,
        payoutAmount: item?.payoutAmount,
        cancelledAmount: item?.cancelledAmount,
    }));

    return (
        <Paper sx={{ p: "16px", position: "relative" }}>
            <Row gap={1}>
                <Box>
                    <Typography variant="h6">Overall Transaction</Typography>
                </Box>
                <Row flex={1} justifyContent="flex-end" gap="16px">
                    {statsData.map((stat) => (
                        <Box key={stat.name} display="flex" flexDirection="row" alignItems="center">
                            {isLoading ? (
                                <Skeleton variant="rectangular" width={80} height={25} />
                            ) : (
                                <>
                                    <SquareIcon
                                        style={{
                                            fill: stat.color,
                                            borderRadius: "50%",
                                        }}
                                    />
                                    <Typography>{stat.name}</Typography>
                                </>
                            )}
                        </Box>
                    ))}
                    <TooltipMUI title="Shows the overall transaction data for the last 7 days">
                        <IconButton>
                            <InfoIcon color="disabled" />
                        </IconButton>
                    </TooltipMUI>
                </Row>
            </Row>
            <Box
                sx={{
                    width: "100%",
                    height: 250,
                    marginTop: "16px",
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    {isLoading ? (
                        <Skeleton variant="rectangular" width="100%" height="100%" />
                    ) : (
                        <AreaChart data={overallTransactionData}>
                            <defs>
                                <linearGradient id="gradientPending" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#105BB7" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#105BB7" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="gradientPayout" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4C96EF" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#4C96EF" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="gradientCancelled" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#136FE0" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#136FE0" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="day"
                                tick={{
                                    fontSize: 10,
                                }}
                            />
                            <YAxis
                                label={{
                                    value: "Amount",
                                    angle: -90,
                                    position: "insideLeft",
                                    fontSize: 12,

                                    style: {
                                        textAnchor: "middle",
                                    },
                                }}
                                tick={{
                                    fontSize: 10,
                                }}
                            />
                            <Tooltip cursor={true} />

                            <Area
                                type="monotone"
                                dataKey="pendingAmount"
                                name="Pending"
                                stroke="#105BB7"
                                isAnimationActive="true"
                                animationEasing="ease-in-out"
                                fill="url(#gradientPending)"
                                dot={false}
                            />
                            <Area
                                type="monotone"
                                dataKey="payoutAmount"
                                name="Payout"
                                stroke="#4C96EF"
                                isAnimationActive="true"
                                animationEasing="ease-in-out"
                                fill="url(#gradientPayout)"
                                dot={false}
                            />
                            <Area
                                type="monotone"
                                dataKey="cancelledAmount"
                                name="Cancelled"
                                stroke="#136FE0"
                                isAnimationActive="true"
                                animationEasing="ease-in-out"
                                fill="url(#gradientCancelled)"
                                dot={false}
                            />
                        </AreaChart>
                    )}
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
}
