import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Row from "App/components/Row/Row";
import Column from "App/components/Column/Column";
import DashboardCardChart from "./DashboardCardChart";
import DashBoardSendIcon from "App/components/Icon/DashBoardSendIcon";
import DashboardReceiveIcon from "App/components/Icon/DashboardReceiveIcon";
import DashboardCustomerIcon from "App/components/Icon/DashboardCustomerIcon";

export default function TotalCustomerCard() {
    const theme = useTheme();
    const customerDetails = {
        totalCustomers: 100,
        icon: <DashboardCustomerIcon />,
        backgroundColor: theme.palette.surface.successSecond,
        isDropped: false,
        change: "12.22%",
        childrenData: [
            {
                title: "Verified",
                total: 2254,
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
                total: 2254,
                change: "12.22%",
                isDropped: false,
            },
            {
                title: "Not Started",
                total: 2254,
                change: "12.22%",
                isDropped: false,
            },
            {
                title: "Nearly Expired",
                total: 254,
                change: "12.22%",
                isDropped: false,
            },
        ],
    };
    return (
        <Column gap={2}>
            <Row alignItems="flex-end" justifyContent="space-between">
                <Row alignItems="center" gap="10px">
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
                        {customerDetails.icon}
                    </Box>
                    <Column gap="3px">
                        <Typography
                            sx={(theme) => ({
                                color: theme.palette.text.secondary,
                            })}
                        >
                            Total Customer
                        </Typography>
                        <Row gap="8px" alignItems="center">
                            <Typography fontWeight={700} fontSize={16}>
                                {customerDetails.totalCustomers}
                            </Typography>
                            <Row
                                gap="4px"
                                sx={{
                                    backgroundColor: customerDetails.backgroundColor,
                                    padding: "6px",
                                    borderRadius: "16px",
                                }}
                                alignItems="center"
                            >
                                <Typography>
                                    {!customerDetails.isDropped ? <DashBoardSendIcon /> : <DashboardReceiveIcon />}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: theme.palette.success.main,
                                        fontWeight: 600,
                                    }}
                                >
                                    {customerDetails.change}
                                </Typography>
                            </Row>
                        </Row>
                    </Column>
                </Row>
                <Box
                    sx={{
                        width: 200,
                        height: 50,
                    }}
                >
                    <DashboardCardChart />
                </Box>
            </Row>
            <Row
                sx={{
                    [theme.breakpoints.down("lg")]: {
                        flexWrap: "wrap",
                    },
                }}
            >
                {customerDetails.childrenData.map((data, index) => {
                    const containsBorder = index !== 0;
                    return (
                        <Column
                            key={index}
                            gap={1}
                            sx={{
                                [theme.breakpoints.up("lg")]: {
                                    borderLeft: containsBorder ? `1px solid ${theme.palette.divider}` : "none",
                                    paddingLeft: "10px",
                                },
                            }}
                        >
                            <Typography
                                sx={(theme) => ({
                                    color: theme.palette.text.secondary,
                                })}
                            >
                                {data.title}
                            </Typography>
                            <Row alignItems="center" gap="5px">
                                <Typography fontSize={16} fontWeight={700}>
                                    {data.total}
                                </Typography>
                                <Box>{!data.isDropped ? <DashBoardSendIcon /> : <DashboardReceiveIcon />}</Box>
                                <Typography
                                    sx={{
                                        color: !data.isDropped ? theme.palette.success.main : theme.palette.error.main,
                                        fontWeight: 500,
                                    }}
                                >
                                    {data.change}
                                </Typography>
                            </Row>
                        </Column>
                    );
                })}
            </Row>

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
    );
}
