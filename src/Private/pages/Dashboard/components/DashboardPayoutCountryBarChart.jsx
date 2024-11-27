import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

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

export default function DashboardPayoutCountryBarChart() {
    return (
        <Box>
            <Typography fontWeight={700} fontSize={16}>
                Top Payout Country
            </Typography>

            <Box
                sx={{
                    height: 350,
                    mt: 2,
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={DUMMY_DATA}
                        // margin={{ top: 10, right: 10, left: 0, bottom: 0 }} // Adjust margins
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="country" tick={{ fontSize: 12 }} padding={{ left: 0, right: 0 }} />
                        <YAxis
                            tick={{ fontSize: 12 }}
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
                        <Tooltip />
                        <Bar dataKey="amount" fill="#105BB7" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
}
