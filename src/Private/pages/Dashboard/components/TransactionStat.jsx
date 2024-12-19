import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import Row from "App/components/Row/Row";
import Paper from "App/components/Paper/Paper";

export default function TransactionStat() {
    const state = useSelector((state) => state.get_transaction_count_by_status);

    const theme = useTheme();

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

    const data = [
        { day: "Sun", pending: 400, payout: 300, cancelled: 100 },
        { day: "Mon", pending: 300, payout: 500, cancelled: 150 },
        { day: "Tue", pending: 700, payout: 500, cancelled: 200 },
        { day: "Wed", pending: 600, payout: 650, cancelled: 350 },
        { day: "Thu", pending: 800, payout: 700, cancelled: 300 },
        { day: "Fri", pending: 750, payout: 800, cancelled: 400 },
        { day: "Sat", pending: 600, payout: 650, cancelled: 350 },
    ];

    return (
        <Paper sx={{ p: "16px", position: "relative" }}>
            <Row gap={1}>
                <Box>
                    <Typography variant="h6">Overall Transaction</Typography>
                </Box>
                <Row flex={1} justifyContent="flex-end" gap="16px" flexWrap="wrap">
                    {statsData.map((stat) => (
                        <Box key={stat.name} display="flex" flexDirection="row">
                            <FiberManualRecordIcon sx={{ fill: stat.color }} />
                            <Typography>{stat.name}</Typography>
                        </Box>
                    ))}
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
                    <AreaChart data={data}>
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
                        <XAxis dataKey="day" />
                        <YAxis
                            label={{
                                value: "Amount",
                                angle: -90,
                                position: "insideLeft",
                                fontSize: 12,
                            }}
                        />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="pending"
                            stroke="#105BB7"
                            fill="url(#gradientPending)"
                            dot={false}
                        />
                        <Area
                            type="monotone"
                            dataKey="payout"
                            stroke="#4C96EF"
                            fill="url(#gradientPayout)"
                            dot={false}
                        />
                        <Area
                            type="monotone"
                            dataKey="cancelled"
                            stroke="#136FE0"
                            fill="url(#gradientCancelled)"
                            dot={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
}
