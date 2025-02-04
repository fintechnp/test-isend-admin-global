import React from "react";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";

import Paper from "App/components/Paper/Paper";
import Row from "App/components/Row/Row";
import Column from "App/components/Column/Column";
import AgentIcon from "App/components/Icon/AgentIcon";
import BusinessIcon from "App/components/Icon/BusinessIcon";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";

const Container = styled(Paper)(({ theme }) => ({
    padding: "16px",
}));

export default function AllOverallDataChip() {
    const theme = useTheme();

    const { response: getSummaryResponse, loading: isSummaryLoading } = useSelector((state) => state.get_summary_data);

    const getSummaryData = getSummaryResponse?.data;

    const data = [
        {
            label: "Total Agents",
            value: getSummaryData?.totalAgents,
            icon: <AgentIcon />,
        },
        {
            label: "Total Business",
            value: getSummaryData?.totalBusiness,
            icon: <BusinessIcon />,
        },
        {
            label: "Total P2P Transactions",
            value: getSummaryData?.totalP2PTransactions,
            icon: <BusinessIcon />,
        },
        {
            label: "Total B2B Transactions",
            value: getSummaryData?.totalB2BTransactions,
            icon: <BusinessIcon />,
        },
        {
            label: "Total Service Charge",
            value: getSummaryData?.totalServiceCharge,
            icon: <BusinessIcon />,
        },
        {
            label: "Total Additional Charge",
            value: getSummaryData?.totalAdditionalCharge,
            icon: <BusinessIcon />,
        },
    ];

    return (
        <Grid container spacing={"16px"}>
            {data.map((item, index) => {
                return (
                    <Grid
                        item
                        xs={12}
                        lg={6}
                        key={item.label}
                        sx={{
                            display: "grid",
                            gridTemplateRows: "subgrid",
                            gridRow: "span 4",
                        }}
                    >
                        <Container>
                            <Row gap="10px" alignItems="center">
                                <Box
                                    sx={{
                                        background: "linear-gradient(116.82deg, #4980FF 0%, #00D4FF 100%)",
                                        padding: "8px",
                                        borderRadius: "8px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {item.icon}
                                </Box>
                                <Column>
                                    <Typography
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item.label}
                                    </Typography>

                                    {isSummaryLoading ? (
                                        <Skeleton variant="text" width={80} />
                                    ) : (
                                        <Typography fontSize={16} fontWeight={700}>
                                            $ {item.value}
                                        </Typography>
                                    )}
                                </Column>
                            </Row>
                        </Container>
                    </Grid>
                );
            })}
        </Grid>
    );
}
