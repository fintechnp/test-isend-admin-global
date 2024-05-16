import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const Container = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.background.main,
    padding: "6px 16px",
    margin: 0,
}));

const LoadContainer = styled(Grid)(({ theme }) => ({
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

const ValueWrapper = styled(Box)(({ theme }) => ({
    opacitLy: 0.8,
    paddingLeft: "8px",
    fontSize: "15px",

    color: theme.palette.text.main,
}));

function Details({ data, loading }) {
    if (loading) {
        return (
            <LoadContainer>
                <Typography>Loading...</Typography>
            </LoadContainer>
        );
    }

    return (
        <Container container rowSpacing={1}>
            <Grid item xs={12}>
                <Grid item xs={12} display="flex" justifyContent="flex-start" alignItems="center">
                    The balance of the <ValueWrapper> {data?.customerName ? data?.customerName : "N/A"} </ValueWrapper>
                    in Zai Account is
                    <ValueWrapper> {data?.balance ? data?.balance : "N/A"}</ValueWrapper>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={12} display="flex" justifyContent="flex-start" alignItems="center">
                    Wallet ID:
                    <ValueWrapper>{data?.walletId ? data?.walletId : "N/A"} </ValueWrapper>
                </Grid>
            </Grid>

            <Grid item XS={12}>
                <Grid item xs={12} display="flex" justifyContent="flex-start" alignItems="center">
                    Status :<ValueWrapper>{data?.status ? data?.status : "N/A"}</ValueWrapper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default React.memo(Details);
