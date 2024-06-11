import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import dateUtils from "App/utils/dateUtils";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function DatePicker({
    sx,
    name,
    label,
    required,
    size = "small",
    fullWidth,
    disabled,
    variant,
    focused,
    color,
    value,
    dateFormat = "dd/MM/yyyy",
    dateMask,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    placeholder = "DD/MM/YYY",
    onChange,
    withStartDayTimezone,
    withEndDayTimezone,
    error,
    helperText,
}) {
    const [open, setOpen] = useState(false);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiDatePicker
                open={open}
                value={""}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                label={label}
                onChange={(date) => {}}
                disableOpenPicker
                inputFormat={dateFormat}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        error={error}
                        helperText={helperText}
                        color={color}
                        variant={variant}
                        size={size}
                        fullWidth={fullWidth}
                        required={required}
                        disabled={disabled}
                        focused={focused}
                        onFocus={() => clearErrors(name)}
                        autoComplete="off"
                        aria-readonly
                        inputProps={{
                            ...params.inputProps,
                            readOnly: true,
                            onClick: (e) => setOpen(true),
                        }}
                        sx={sx}
                    />
                )}
                mask={dateMask}
                minDate={minDate}
                maxDate={maxDate}
                disablePast={disablePast}
                disableFuture={disableFuture}
                toolbarPlaceholder={placeholder}
            />
        </LocalizationProvider>
    );
}

export default DatePicker;

DatePicker.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    color: PropTypes.oneOf(["primary", "secondary", "error", "info", "success", "warning"]),
    defaultValue: PropTypes.string,
    dateFormat: PropTypes.oneOf(["yyyy-MM-dd", "MM-dd-yyyy", "yyyy/MM/dd", "MM/dd/yyyy"]).isRequired,
    dateMask: PropTypes.oneOf(["____-__-__", "__-__-____", "____/__/__", "__/__/____"]).isRequired,
    minDate: PropTypes.any,
    maxDate: PropTypes.any,
    disableFuture: PropTypes.bool,
    disablePast: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    withStartDayTimezone: PropTypes.bool,
    withEndDayTimezone: PropTypes.bool,
};
