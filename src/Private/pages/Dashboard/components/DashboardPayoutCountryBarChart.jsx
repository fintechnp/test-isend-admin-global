import React from "react";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import TooltipMUI from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import Paper from "App/components/Paper/Paper";
import styled from "@emotion/styled";

const Container = styled(Paper)(({ theme }) => ({
    padding: "16px",
}));

const DUMMY_DATA = [
    {
        country: "NEP",
        amount: 300,
    },
    {
        country: "IND",
        amount: 600,
    },
    {
        country: "AUS",
        amount: 350,
    },
    {
        country: "USA",
        amount: 200,
    },
    {
        country: "SIG",
        amount: 750,
    },
];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <Paper>
                <Typography>
                    <strong>Country:</strong> {payload[0].payload.country}
                </Typography>
                <Typography>
                    <strong>Payout Amount:</strong> {payload[0].payload.payoutAmount}
                </Typography>
            </Paper>
        );
    }
    return <></>;
};

export default function DashboardPayoutCountryBarChart() {
    const { response, loading: isLoading, success } = useSelector((state) => state.get_top_payout_countries);

    const payoutCountriesData = response?.data?.map((item) => ({
        country: item?.country,
        payoutAmount: item?.payoutAmount,
    }));

    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography fontWeight={700} fontSize={16}>
                    Top Payout Country
                </Typography>

                <TooltipMUI title="Shows the top 5 countries by payout value">
                    <IconButton>
                        <InfoIcon color="disabled" />
                    </IconButton>
                </TooltipMUI>
            </Box>

            <Box
                sx={{
                    height: 400,
                    mt: 2,
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    {isLoading ? (
                        <Skeleton variant="rectangular" width="100%" height="100%" />
                    ) : payoutCountriesData?.length === 0 ? (
                        <Typography>No data found</Typography>
                    ) : (
                        <BarChart data={payoutCountriesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="country" tick={{ fontSize: 12 }} padding={{ left: 0, right: 0 }} />
                            <YAxis
                                tick={{ fontSize: 10 }}
                                padding={{
                                    top: 0,
                                    bottom: 0,
                                }}
                                label={{
                                    value: "Amount",
                                    angle: -90,
                                    position: "insideLeft",
                                    fontSize: 12,
                                }}
                            />
                            <Tooltip content={<CustomTooltip />} />

                            <Bar dataKey="payoutAmount" fill="#105BB7" />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </Box>
        </Container>
    );
}
