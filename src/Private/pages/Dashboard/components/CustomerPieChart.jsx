import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { styled, useTheme } from "@mui/material/styles";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import Row from "App/components/Row/Row";
import Paper from "App/components/Paper/Paper";
import Center from "App/components/Center/Center";

const DATA_COLORS = ["#4DB6AC", "#7986CB", "#4FC3F7", "#6aadd4"];
const NO_DATA_COLORS = ["#eeeeee"];

const Container = styled(Paper)(({ theme }) => ({
    padding: "16px",
    "& .recharts-wrapper": {
        maxWidth: "352px",
        maxHeight: "270px",
    },
}));

const NO_DATA_LABEL = "NO_DATA_LABEL";

export default function CustomerPieChart() {
    const theme = useTheme();

    const { response, loading: isLoading } = useSelector((state) => state.get_customer_count_by_device_type);

    const data = response?.data;

    const statsData = [
        { name: "iOS", value: data?.iosUsers ?? 0 },
        { name: "Android", value: data?.androidUsers ?? 0 },
        { name: "Web", value: data?.webUsers ?? 0 },
        { name: "Admin", value: data?.otherUsers ?? 0 },
    ];

    const statsNoData = [{ name: NO_DATA_LABEL, value: 1 }];

    const COLORS = data?.totalUsers ? DATA_COLORS : NO_DATA_COLORS;

    const CustomTooltip = ({ payload }) => {
        if (payload?.[0]?.payload?.name === NO_DATA_LABEL) return <></>;

        return (
            <Paper sx={{ padding: "16px" }}>
                <Typography>
                    {payload?.[0]?.payload?.name} : {payload?.[0]?.payload?.value}
                </Typography>
            </Paper>
        );
    };

    return (
        <Container>
            <Row mb="26px" alignItems="center">
                <Typography fontWeight={600} fontSize="1.286rem" lineHeight="1.786rem">
                    Customers
                </Typography>
                <Row flex={1} justifyContent="flex-end" gap="16px" flexWrap="wrap">
                    {statsData.map((stat, index) => (
                        <Box key={stat.name} display="flex" flexDirection="row">
                            {isLoading ? (
                                <Skeleton variant="text" height={30} width={60} />
                            ) : (
                                <>
                                    {" "}
                                    <FiberManualRecordIcon sx={{ fill: DATA_COLORS[index] }} />
                                    <Typography>{stat.name}</Typography>
                                </>
                            )}
                        </Box>
                    ))}
                </Row>
            </Row>
            <Center>
                {isLoading ? (
                    <Skeleton variant="circular" height={250} width={250} />
                ) : (
                    <PieChart width={500} height={400}>
                        <Pie data={data?.totalUsers ? statsData : statsNoData} innerRadius={75} dataKey="value">
                            {statsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <text
                            x="50%"
                            y="48%"
                            fontSize="0.857rem"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill={theme.palette.text.secondary}
                        >
                            Total Customer
                        </text>
                        <text
                            x="50%"
                            y="53%"
                            fontSize="1.286rem"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill={theme.palette.text.primary}
                            fontWeight={600}
                        >
                            {data?.totalUsers ?? 0}
                        </text>
                    </PieChart>
                )}
            </Center>
        </Container>
    );
}
