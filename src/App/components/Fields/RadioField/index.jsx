import React from "react";
import { FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { renderFromHelper } from "../helpers";
import { makeStyles } from "@mui/styles";

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

export default function RadioField({ label, input, meta: { touched, invalid, error }, small, options, ...rest }) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid container alignitems="center" className={classes.root}>
            {label && (
                <Grid item xs={12} md={small ? small : 4}>
                    <Typography className={classes.label}>{label}</Typography>
                </Grid>
            )}
            <Grid item xs={12} md={small ? small : 8}>
                <RadioGroup row {...input} {...rest} error={touched && invalid}>
                    {options.map((option) => (
                        <FormControlLabel
                            key={option.key}
                            value={option.value}
                            control={
                                <Radio
                                    style={{
                                        color: `${theme.palette.primary.main}`,
                                        padding: "6px",
                                    }}
                                    size="small"
                                    disabled={option.disabled}
                                />
                            }
                            label={option.label}
                        />
                    ))}
                </RadioGroup>
                {renderFromHelper({ touched, error })}
            </Grid>
        </Grid>
    );
}
