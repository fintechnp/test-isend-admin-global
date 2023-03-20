import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const Message = styled(Box)(({ theme }) => ({
    width: "100%",
    marginTop: "4px",
    padding: "8px",
    height: "120px",
    border: `1px solid ${theme.palette.border.light}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const Text = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    fontSize: "20px",
    color: theme.palette.border.main,
}));

function NoResults({ text }) {
    return (
        <Grid container sx={{ pb: "24px" }}>
            <Grid item xs={12}>
                <Message>
                    <Text>{text}</Text>
                </Message>
            </Grid>
        </Grid>
    );
}

export default NoResults;
