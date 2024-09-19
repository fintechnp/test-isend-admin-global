import dayjs from "dayjs";
import React from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useFormContext, get } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function FormDateTimePicker({
    name,
    label,
    required,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    isOptional,
    focused,
    error,
    disabled,
    color,
    fullWidth,
}) {
    const {
        control,
        clearErrors,
        setValue,
        formState: { errors },
        getValues,
    } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Stack spacing={1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            {...field}
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(newValue) => {
                                field.onChange(newValue ? newValue.toISOString() : null);
                            }}
                            label={
                                <>
                                    {label}{" "}
                                    {isOptional && (
                                        <Typography component="span" variant="caption">
                                            ( Optional )
                                        </Typography>
                                    )}
                                </>
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    fullWidth={fullWidth}
                                    focused={focused}
                                    color={color}
                                    error={!!errors[name]}
                                    helperText={errors[name]?.message ?? ""}
                                    InputProps={{
                                        ...params.InputProps,
                                        readOnly: true,
                                    }}
                                    inputProps={{
                                        ...params.inputProps,
                                        readOnly: true,
                                    }}
                                />
                            )}
                            required={required}
                            disabled={disabled}
                            minDate={minDate}
                            maxDate={maxDate}
                            disablePast={disablePast}
                            disableFuture={disableFuture}
                            onFocus={() => clearErrors(name)}
                        />
                        <FormHelperText error={true}> {error ?? get(errors, name)?.message ?? ""}</FormHelperText>
                    </LocalizationProvider>
                </Stack>
            )}
        />
    );
}

FormDateTimePicker.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    minDate: PropTypes.any,
    maxDate: PropTypes.any,
    disablePast: PropTypes.bool,
    disableFuture: PropTypes.bool,
    defaultValue: PropTypes.instanceOf(Date),
    isOptional: PropTypes.bool,
    fullWidth: PropTypes.bool,
    focused: PropTypes.bool,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    color: PropTypes.oneOf(["primary", "secondary", "error", "info", "success", "warning"]),
};

FormDateTimePicker.defaultProps = {
    label: "",
    required: false,
    minDate: null,
    maxDate: null,
    disablePast: false,
    disableFuture: false,
    defaultValue: null,
    isOptional: false,
    fullWidth: false,
    focused: false,
    disabled: false,
    onChange: () => {},
    color: "primary",
};
