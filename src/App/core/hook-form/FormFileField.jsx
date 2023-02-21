import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

function FormFileField(props) {
    const {
        control,
        clearErrors,
        formState: { errors },
        setValue,
    } = useFormContext();

    const {
        name,
        label,
        required,
        size,
        type,
        fullWidth,
        rules,
        disabled,
        multiple,
        variant,
        focused,
        accept,
        color,
        ...rest
    } = props;

    return (
        <TextField
            {...rest}
            type="file"
            error={!!errors[name]}
            helperText={errors[name]?.message ?? ""}
            label={label}
            variant={variant}
            fullWidth={fullWidth}
            required={required}
            size={size}
            onFocus={() => clearErrors(name)}
            disabled={disabled}
            focused={focused}
            color={color}
            inputProps={{
                autoComplete: "new-password",
                accept,
            }}
            onChange={(e) => {
                if (!e.target.files) return;
                setValue(name, e.target.files[0]);
                console.log(e.target.files[0]);
            }}
        />
    );
}

export default FormFileField;

FormFileField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(["medium", "small", "large"]),
    fullWidth: PropTypes.bool.isRequired,
    rules: PropTypes.object,
    variant: PropTypes.oneOf(["outlined", "standard", "filled"]),
    focused: PropTypes.bool,
    value: PropTypes.string,
    accept: PropTypes.string,
};

FormFileField.defaultProps = {
    label: "",
    required: false,
    disabled: false,
    fullWidth: true,
    rules: {},
    size: "small",
    variant: "outlined",
    focused: false,
    value: "",
    multiple: false,
};
