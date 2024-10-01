import React from "react";
import { styled } from "@mui/material/styles";
import { FormControlLabel, Grid, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";

const Label = styled(Typography)(({ theme }) => ({
    verticalAlign: "middle",
    paddingTop: "4px",
    paddingBottom: "-4px",
}));

export default function SwitchField({ label, input, half, small, options, ...rest }) {
    return (
        <Grid container alignitems="center">
            <Grid item xs={6} md={half ? 8 : 4}>
                <Label>{label}</Label>
            </Grid>
            <Grid item xs={6} md={half ? 4 : 8}>
                <FormControlLabel control={<Switch checked={input.value ? true : false} onChange={input.onChange} />} />
            </Grid>
        </Grid>
    );
}
