import dayjs from "dayjs";
import React from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useReactHookFormContext } from "./useReactHookForm";

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
    disabled,
    fullWidth,
}) {
    const { control, clearErrors } = useReactHookFormContext();

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
                                    size="small" // Set the size to small
                                    fullWidth={fullWidth}
                                    focused={focused}
                                    InputProps={{
                                        ...params.InputProps,
                                        readOnly: true, // Disable direct text input
                                    }}
                                    inputProps={{
                                        ...params.inputProps,
                                        readOnly: true, // Disable direct text input
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
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};
