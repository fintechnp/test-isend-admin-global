import * as React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";

export default function FormAutoComplete({
    label,
    name,
    size = "small",
    options = [],
    labelKey = "label",
    valueKey = "value",
    required = false,
    isOptional = false,
}) {
    const { setValue } = useFormContext();

    return (
        <Autocomplete
            disablePortal
            options={options}
            size={size}
            getOptionLabel={(option) => option[labelKey]}
            renderInput={(params) => (
                <TextField
                    label={
                        <>
                            {label}{" "}
                            {isOptional && (
                                <Typography component="span" variant="caption">
                                    (Optional)
                                </Typography>
                            )}
                        </>
                    }
                    name={name}
                    size={size}
                    {...params}
                    required={required}
                />
            )}
        />
    );
}

FormAutoComplete.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.string,
    options: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            }),
        ),
        PropTypes.arrayOf(PropTypes.any),
    ]),
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    required: PropTypes.bool,
    isOptional: PropTypes.bool,
};
