import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import TooltipMUI from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import Paper from "App/components/Paper/Paper";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <Paper>
                <Typography>
                    <strong>Business:</strong> {payload[0].payload.business_name}
                </Typography>
                <Typography>
                    <strong>Transaction Amount:</strong> {payload[0].payload.txn_amount}
                </Typography>
            </Paper>
        );
    }
    return <></>;
};

export default function DashboardPartnerBarChart() {
    const { response, loading: isLoading } = useSelector((state) => state.get_top_transaction_by_agent_and_business);

    const getTransactionData = response?.data?.map((item) => ({
        business_id: item.business_id,
        business_name: item?.business_name,
        txn_amount: item?.txn_amount,
    }));

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography fontWeight={700} fontSize={16}>
                    Top Transaction by Agent & Business
                </Typography>

                <TooltipMUI title="Shows the top 5 businesses & Agent by transaction amount">
                    <IconButton>
                        <InfoIcon color="disabled" />
                    </IconButton>
                </TooltipMUI>
            </Box>

            <Box
                sx={{
                    height: 350,
                    mt: 2,
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    {isLoading ? (
                        <Skeleton variant="rectangular" height="100&" width="100&" />
                    ) : getTransactionData?.length === 0 ? (
                        <Typography>No data found</Typography>
                    ) : (
                        <BarChart
                            data={getTransactionData}
                            // margin={{ top: 10, right: 10, left: 0, bottom: 0 }} // Adjust margins
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="business_name" tick={{ fontSize: 10 }} padding={{ left: 0, right: 0 }} />
                            <YAxis
                                tick={{ fontSize: 12 }}
                                label={{
                                    value: "Amount",
                                    angle: -90,
                                    position: "insideLeft",
                                    fontSize: 12,
                                }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="txn_amount" fill="#105BB7" />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </Box>
        </Box>
    );
}
