import React from "react";
import { FormControlLabel, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Switch from "@mui/material/Switch";

const useStyles = makeStyles({
    root: {
        // margin: '8px 0'
    },
    label: {
        verticalAlign: "middle",
        paddingTop: "4px",
        paddingBottom: "-4px",
    },
});

export default function SwitchField({
    label,
    input,
    half,
    meta: { touched, invalid, error },
    small,
    options,
    ...rest
}) {
    const classes = useStyles();

    return (
        <Grid container alignitems="center" className={classes.root}>
            <Grid item xs={6} md={half ? 8 : 4}>
                <Typography className={classes.label}>{label}</Typography>
            </Grid>
            <Grid item xs={6} md={half ? 4 : 8}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={input.value ? true : false}
                            onChange={input.onChange}
                        />
                    }
                />
            </Grid>
        </Grid>
    );
}
