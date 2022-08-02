import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import MuiFormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
        padding: "9px 10px",
        color: theme.palette.secondary.contrastText,
        fontSize: "14px",
    },
}));

const DatePickerField = ({
    label,
    input,
    placeholder,
    small,
    customClass,
    defaultValue,
    inputProps,
    InputProps,
    showLabel,
    meta: { touched, invalid },
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
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            label={showLabel ? placeholder : ""}
                            placeholder={placeholder ? placeholder : label}
                            renderInput={(params) => <TextField {...params} />}
                            {...input}
                            {...rest}
                        />
                    </LocalizationProvider>
                </FormControl>
            </Grid>
        </Wrapper>
    );
};

export default DatePickerField;
