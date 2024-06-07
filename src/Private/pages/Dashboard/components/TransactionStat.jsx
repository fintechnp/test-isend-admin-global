import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import Row from "App/components/Row/Row";
import Paper from "App/components/Paper/Paper";

export default function TransactionStat() {
    const state = useSelector((state) => state.get_transaction_count_by_status);

    const theme = useTheme();

    const statsData = [
        {
            name: "Total Transaction",
            amount: 0,
            color: theme.palette.cyan[300],
        },
        {
            name: "Total Payout",
            amount: theme.palette.indigo[300],
        },
    ];

    return (
        <Paper sx={{ p: "16px", position: "relative" }}>
            <Row>
                <Box>
                    <Typography variant="h6">Transaction Forecast</Typography>
                </Box>
                <Row flex={1} justifyContent="flex-end" gap="16px">
                    {statsData.map((stat) => (
                        <Box key={stat.name} display="flex" flexDirection="row">
                            <FiberManualRecordIcon sx={{ fill: stat.color }} />
                            <Typography>{stat.name}</Typography>
                        </Box>
                    ))}
                </Row>
            </Row>
            <Skeleton
                height="100px"
                sx={{
                    transform: "scale(1)",
                    mt: "16px",
                }}
            />
            <Typography color="grey.500" sx={{ position: "absolute", top: "60%", left: "calc(50% - 100px)" }}>
                Coming Soon
            </Typography>
        </Paper>
    );
}
