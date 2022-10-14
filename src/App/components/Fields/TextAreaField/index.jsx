import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MuiTextareaAutosize from "@mui/material/TextareaAutosize";
import MuiFormControl from "@mui/material/FormControl";
import { renderFromHelper } from "../helpers";

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
        marginLeft: "0px",
    },
}));

const Input = styled(MuiTextareaAutosize)(({ theme }) => ({
    width: "100%",
    padding: "9px 10px",
    color: theme.palette.secondary.contrastText,
    fontSize: "14px",
    border: "1px solid #D0D3D5",
    borderRadius: "6px",
    background: "transparent",
}));

const TextAreaField = ({
    label,
    input,
    placeholder,
    small,
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
                        placeholder={placeholder ? placeholder : label}
                        {...input}
                        {...rest}
                    />
                    {renderFromHelper({ touched, error })}
                </FormControl>
            </Grid>
        </Wrapper>
    );
};

export default TextAreaField;
