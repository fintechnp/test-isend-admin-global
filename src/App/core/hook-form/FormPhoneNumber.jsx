import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Controller, useFormContext, get } from "react-hook-form";

function FormPhoneNumber({
    name,
    dialingCodeName,
    label,
    required,
    size = "small",
    fullWidth = true,
    variant,
    error,
    disabled = false,
    ...rest
}) {
    const {
        control,
        clearErrors,
        watch,
        formState: { errors },
    } = useFormContext();

    const dialingCode = watch(dialingCodeName ?? "");

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    {...rest}
                    type="text"
                    error={!!error || !!get(errors, name)?.message}
                    helperText={error ?? get(errors, name)?.message ?? ""}
                    label={label}
                    variant={variant}
                    fullWidth={fullWidth}
                    required={required}
                    size={size}
                    onFocus={() => clearErrors(name)}
                    disabled={disabled}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{dialingCode}</InputAdornment>,
                    }}
                    value={field.value || ""}
                />
            )}
        />
    );
}

export default FormPhoneNumber;

FormPhoneNumber.defaultProps = {
    type: "text",
    label: "",
    error: false,
    helperText: "",
    required: false,
    disabled: false,
    fullWidth: true,
    rules: {},
    multiline: false,
    size: "small",
    variant: "outlined",
    focused: false,
    value: "",
    dialingCodeName: "dialing_code",
};

