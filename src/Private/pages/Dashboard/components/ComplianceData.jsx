import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Row from "App/components/Row/Row";
import Column from "App/components/Column/Column";
import DashBoardSendIcon from "App/components/Icon/DashBoardSendIcon";
import DashboardReceiveIcon from "App/components/Icon/DashboardReceiveIcon";

const complianceData = [
    {
        label: "Suspicious",
        value: 254,
        change: "12.22%",
        isDropped: true,
    },
    {
        label: "Hold",
        value: 54,
        change: "12.22%",
        isDropped: true,
    },
    {
        label: "Blocked",
        value: 4,
        change: "12.22%",
        isDropped: false,
    },
];

export default function ComplianceData() {
    const theme = useTheme();
    return (
        <Box>
            <Typography fontWeight={700} fontSize={16}>
                Compliance
            </Typography>
            <Column gap={"6px"}>
                {complianceData.map((data, index) => (
                    <Column key={index} mt={1} gap={1}>
                        <Typography
                            sx={{
                                color: theme.palette.text.secondary,
                            }}
                        >
                            {data.label}
                        </Typography>
                        <Row gap={1} alignItems="center">
                            <Typography fontSize={16} fontWeight={700}>
                                {data.value}
                            </Typography>
                            <Box>{data.isDropped ? <DashboardReceiveIcon /> : <DashBoardSendIcon />}</Box>
                            <Typography
                                sx={{
                                    color: data.isDropped ? theme.palette.error.main : theme.palette.success.main,
                                }}
                            >
                                {data.change}
                            </Typography>
                        </Row>
                    </Column>
                ))}
            </Column>
        </Box>
    );
}
