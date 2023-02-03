import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import MuiFormControl from "@mui/material/FormControl";

const Wrapper = styled(Grid)(({ theme }) => ({
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

const Input = styled(MuiTextField)(({ theme }) => ({
    // border: "1px solid #D0D3D5",
    width: "100%",
    "& .MuiOutlinedInput-multiline": {
        padding: "0px",
    },
    "& .MuiInputBase-input": {
        padding: "9px 10px",
        color: theme.palette.secondary.contrastText,
        fontSize: "14px",
    },
    " & .MuiInputBase-root.MuiOutlinedInput-root": {
        padding: 0,
    },
    "& .MuiFormHelperText-contained": {
        marginLeft: "0px",
    },
    "& .MuiInputBase-root.Mui-disabled::placeholder": {
        color: "#000",
    },
    "&:focus": {
        border: "1px solid #D0D3D5",
    },
    "&:before": {
        // border: "1px solid #D0D3D5",
    },
    "&:after": {
        border: "1px solid #D0D3D5",
    },
}));

const TextField = ({
    label,
    input,
    showLabel,
    placeholder,
    small,
    customClass,
    defaultValue,
    inputProps,
    InputProps,
    meta: { touched, invalid, error },
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
                    <Input
                        variant="outlined"
                        label={showLabel ? placeholder : ""}
                        placeholder={placeholder ? placeholder : label}
                        error={touched && invalid}
                        helperText={touched && error}
                        inputProps={inputProps}
                        InputProps={InputProps}
                        defaultValue={defaultValue}
                        {...input}
                        {...rest}
                    />
                </FormControl>
            </Grid>
        </Wrapper>
    );
};

export default TextField;
