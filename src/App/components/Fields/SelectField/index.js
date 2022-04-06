import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import MuiFormControl from "@mui/material/FormControl";
import MuiSelect from "@mui/material/Select";
import { renderFromHelper } from "../helpers";

const Wrapper = styled(Grid)(({ theme }) => ({
    width: "100%",
    paddingTop: "4px",
}));

const Label = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    verticalAlign: "middle",
    paddingTop: "2px",
    paddingBottom: "2px",
    textAlign: "left",
    color: theme.palette.secondary.contrastText,
}));

const FormControl = styled(MuiFormControl)(({ theme }) => ({
    width: "100%",
    "& > div": {
        border: "none",
    },
    "& .MuiFormHelperText-root": {
        background: "transparent",
    },
}));

const Select = styled(MuiSelect)(({ theme }) => ({
    width: "100%",
    "& .MuiNativeSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
        opacity: 0.7,
        padding: "9px 10px",
        fontSize: "15px",
    },
    "&:focus": {
        border: "1px solid #D0D3D5",
    },
    "&:before": {
        border: "1px solid #D0D3D5",
    },
    "&:after": {
        border: "1px solid #D0D3D5",
    },
}));

const SelectField = ({
    label,
    input,
    small,
    meta: { touched, invalid, error },
    children,
    ...rest
}) => {
    return (
        <Wrapper container>
            {label && (
                <Grid item xs={12} md={small ? 12 - small : 4}>
                    <Label>{label}</Label>
                </Grid>
            )}
            <Grid item xs={12} md={small ? small : 8}>
                <FormControl error={touched && invalid}>
                    <Select native {...input} {...rest} variant="outlined">
                        {children}
                    </Select>
                    {renderFromHelper({ touched, error })}
                </FormControl>
            </Grid>
        </Wrapper>
    );
};

export default SelectField;
