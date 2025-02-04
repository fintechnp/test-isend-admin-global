import React, { useEffect } from "react";
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

    const { response, loading: isLoading } = useSelector((state) => state.get_user_registration_history);

    const registrationHistoryData = response?.data?.map((item) => ({
        date: item?.date,
        count: item?.count,
    }));

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
                    height: 280,
                    marginTop: "16px",
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    {isLoading ? (
                        <Skeleton variant="rectangular" width="100%" height="100%" />
                    ) : (
                        <AreaChart data={registrationHistoryData}>
                            <defs>
                                <linearGradient id="gradientPending" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#105BB7" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#105BB7" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tick={{
                                    fontSize: 10,
                                }}
                            />
                            <YAxis
                                label={{
                                    angle: -90,
                                    position: "insideLeft",
                                    fontSize: 12,
                                }}
                                tick={{
                                    fontSize: 12,
                                }}
                            />
                            <Tooltip cursor={true} />

                            <Area
                                type="monotone"
                                dataKey="count"
                                name="count"
                                stroke="#105BB7"
                                strokeLinecap="round"
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
