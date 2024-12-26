import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import TooltipMUI from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import SquareIcon from "@mui/icons-material/Square";

import Row from "App/components/Row/Row";
import Paper from "App/components/Paper/Paper";
import { Skeleton } from "@mui/material";

export default function UserRegistrationHistoryStat() {
    const theme = useTheme();

    const isLoading = false;

    const overallTransactionData = [
        {
            day: "Mon",
            pendingAmount: 4000,
        },
        {
            day: "Tue",
            pendingAmount: 2000,
        },
        {
            day: "Wed",
            pendingAmount: 3000,
        },
        {
            day: "Thu",
            pendingAmount: 1000,
        },
        {
            day: "Fri",
            pendingAmount: 5000,
        },
        {
            day: "Sat",
            pendingAmount: 2000,
        },
        {
            day: "Sun",
            pendingAmount: 7000,
        },
    ];

    return (
        <Paper sx={{ p: "16px", position: "relative" }}>
            <Row gap={1}>
                <Box>
                    <Typography variant="h6">User Registration History</Typography>
                </Box>
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
                        </AreaChart>
                    )}
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
}
