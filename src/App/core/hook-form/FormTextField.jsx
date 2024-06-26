import React, { useState, useRef } from "react";
import PropTypes, { object } from "prop-types";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import { Controller, useFormContext, get } from "react-hook-form";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function FormTextField(props) {
    const id = "id_" + Math.random();

    const ref = useRef();

    const {
        control,
        clearErrors,
        formState: { errors },
    } = useFormContext();

    const [showPassword, setShowPassword] = useState(false);

    const {
        name,
        label,
        required,
        size,
        type,
        fullWidth,
        rules,
        disabled,
        multiline,
        variant,
        focused,
        color,
        error,
        ...rest
    } = props;

    let InputComponent = "input";
    if (variant === "outlined") InputComponent = OutlinedInput;
    else if (variant === "filled") InputComponent = FilledInput;
    else if (variant === "standard") InputComponent = Input;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => {
                if (type === "password") {
                    return (
                        <FormControl
                            variant={variant}
                            size={size}
                            fullWidth={fullWidth}
                            color={color}
                            required={required}
                        >
                            <InputLabel htmlFor={id} required={required}>{label}</InputLabel>
                            {React.createElement(InputComponent, {
                                ...field,
                                ...rest,
                                inputProps: {
                                    ref,
                                    autoComplete: "new-password",
                                },
                                id,
                                type: showPassword ? "text" : "password",
                                value: field.value || "",
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            onMouseDown={(e) => e.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                error: !!error || !!get(errors, name)?.message,
                                required,
                                size,
                                onFocus: () => clearErrors(name),
                                disabled,
                                color,
                                label,
                            })}

                            <FormHelperText error={true}> {error ?? get(errors, name)?.message ?? ""}</FormHelperText>
                        </FormControl>
                    );
                }

                return (
                    <>
                        <TextField
                            {...field}
                            {...rest}
                            type={type}
                            error={!!error || !!get(errors, name)?.message}
                            helperText={error ?? get(errors, name)?.message ?? ""}
                            label={label}
                            variant={variant}
                            fullWidth={fullWidth}
                            required={required}
                            size={size}
                            onFocus={() => clearErrors(name)}
                            disabled={disabled}
                            multiline={multiline}
                            focused={focused}
                            color={color}
                            inputProps={{
                                autoComplete: "new-password",
                            }}
                            value={field.value || ""}
                        />
                    </>
                );
            }}
        />
    );
}

export default FormTextField;

FormTextField.propTypes = {
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
    type: PropTypes.string,
    error: PropTypes.string,
};

FormTextField.defaultProps = {
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
};
