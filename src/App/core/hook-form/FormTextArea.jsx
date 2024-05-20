import PropTypes from "prop-types";
import React, { useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, useFormContext } from "react-hook-form";

import TextArea from "App/components/Forms/TextArea";
function FormTextArea(props) {
    const {
        control,
        clearErrors,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();

    const { name, label, required, size, type, fullWidth, disabled, color, error, ...rest } = props;

    const value = watch(name);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <FormControl fullWidth>
                        <FormLabel style={{ marginBottom: "4px" }}>{label}</FormLabel>
                        {/* References: https://mui.com/base-ui/react-textarea-autosize/ */}
                        <TextArea
                            minrows={4}
                            {...rest}
                            onChange={(e) => {
                                setValue(name, e.target.value);
                            }}
                            value={value || ""}
                            style={{ width: "100%" }}
                            error={!!errors[name]?.message}
                        />
                        <FormHelperText error={!!errors[name]?.message}>{errors[name]?.message}</FormHelperText>
                    </FormControl>
                );
            }}
        />
    );
}

export default FormTextArea;

FormTextArea.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool.isRequired,
    value: PropTypes.string,
    error: PropTypes.bool,
};

FormTextArea.defaultProps = {
    required: false,
    disabled: false,
    fullWidth: true,
    value: "",
};
