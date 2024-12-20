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

const data = [
    {
        label: "Total Agents",
        value: 10245,
        icon: <AgentIcon />,
    },
    {
        label: "Total Business",
        value: 10245,
        icon: <BusinessIcon />,
    },
    {
        label: "Total P2P Transactions",
        value: 10245,
        icon: <BusinessIcon />,
    },
    {
        label: "Total B2B Transactions",
        value: 10245,
        icon: <BusinessIcon />,
    },
    {
        label: "Total Service Charge",
        value: 10245,
        icon: <BusinessIcon />,
    },
    {
        label: "Total Additional Charge",
        value: 10245,
        icon: <BusinessIcon />,
    },
];

const Container = styled(Paper)(({ theme }) => ({
    padding: "16px",
}));

export default function AllOverallDataChip() {
    const theme = useTheme();
    return (
        <Grid container spacing={"16px"}>
            {data.map((item, index) => {
                return (
                    <Grid
                        item
                        xs={12}
                        lg={4}
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
                                    <Typography fontSize={16} fontWeight={700}>
                                        $ {item.value}
                                    </Typography>
                                </Column>
                            </Row>
                        </Container>
                    </Grid>
                );
            })}
        </Grid>
    );
}
