import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import dateUtils from "App/utils/dateUtils";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useFormContext, get } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function FormDatePicker({
    name,
    label,
    required,
    size,
    fullWidth,
    rules,
    disabled,
    variant,
    focused,
    color,
    value,
    defaultValue,
    dateFormat,
    dateMask,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    placeholder,
    onChange,
    withStartDayTimezone,
    withEndDayTimezone,
    isOptional,
}) {
    const [open, setOpen] = useState(false);

    const {
        control,
        clearErrors,
        setValue,
        formState: { errors },
        getValues,
    } = useFormContext();

    useEffect(() => {
        if (!value && !defaultValue && !getValues(name)) setValue(name, undefined);
    }, []);

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        label={label}
                        onChange={(date) => {
                            if (date) {
                                let newDate = dateFormat
                                    .replace(/yyyy/g, date.getFullYear())
                                    .replace(/MM/g, String(date.getMonth() + 1).padStart(2, "0"))
                                    .replace(/dd/g, String(date.getDate()).padStart(2, "0"));

                                if (withStartDayTimezone) {
                                    newDate = dateUtils.getFromDate(newDate);
                                } else if (withEndDayTimezone) {
                                    newDate = dateUtils.getToDate(newDate);
                                }
                                setValue(name, newDate);
                                onChange?.(date);
                            } else {
                                setValue(name, "");
                                onChange?.(null);
                            }
                        }}
                        value={field.value ?? null}
                        inputFormat={dateFormat}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={
                                    <>
                                        {label} {required && <span style={{ color: "red" }}>*</span>}
                                        {isOptional && (
                                            <Typography component="span" variant="caption">
                                                ( Optional )
                                            </Typography>
                                        )}
                                    </>
                                }
                                error={!!errors[name]}
                                helperText={errors[name]?.message ?? ""}
                                color={color}
                                variant={variant}
                                size={size}
                                fullWidth={fullWidth}
                                required={required}
                                disabled={disabled}
                                focused={focused}
                                onFocus={() => clearErrors(name)}
                                autoComplete="off"
                                value={field.value ?? ""}
                                aria-readonly
                                inputProps={{
                                    ...params.inputProps,
                                    readOnly: true,
                                    onClick: (e) => setOpen(true),
                                }}
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
            )}
        />
    );
}

export default FormDatePicker;

FormDatePicker.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(["medium", "small", "large"]),
    fullWidth: PropTypes.bool.isRequired,
    rules: PropTypes.object,
    multiline: PropTypes.bool,
    variant: PropTypes.oneOf(["outlined", "standard", "filled"]),
    focused: PropTypes.bool,
    color: PropTypes.oneOf(["primary", "secondary", "error", "info", "success", "warning"]),
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    dateFormat: PropTypes.oneOf(["yyyy-MM-dd", "MM-dd-yyyy", "yyyy/MM/dd", "MM/dd/yyyy"]).isRequired,
    dateMask: PropTypes.oneOf(["____-__-__", "__-__-____", "____/__/__", "__/__/____"]).isRequired,
    minDate: PropTypes.any,
    maxDate: PropTypes.any,
    disableFuture: PropTypes.any,
    disablePast: PropTypes.any,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    withStartDayTimezone: PropTypes.bool,
    withEndDayTimezone: PropTypes.bool,
    isOptional: PropTypes.bool,
};

FormDatePicker.defaultProps = {
    type: "text",
    label: "",
    required: false,
    disabled: false,
    fullWidth: true,
    rules: {},
    multiline: false,
    size: "small",
    variant: "outlined",
    focused: false,
    value: "",
    color: "primary",
    minDate: undefined,
    maxDate: undefined,
    disablePast: undefined,
    disableFuture: undefined,
    dateFormat: "yyyy-MM-dd",
    dateMask: "____-__-__",
    placeholder: "YYYY-MM-DD",
    isOptional: false,
};
