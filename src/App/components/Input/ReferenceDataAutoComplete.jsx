import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

import { localStorageGet } from "App/helpers/localStorage";

/**
 * example reference Data
 *
 * {
 *   "reference_id": 485,
 *   "tid": 0,
 *   "reference_type_id": 146,
 *   "type_name": null,
 *   "name": "Contractors",
 *   "value": "Contractors",
 *   "description": "Contractors",
 *   "id": 0,
 *   "created_ts": "0001-01-01T00:00:00",
 *   "created_by": null,
 *   "updated_ts": null,
 *   "updated_by": null
 * }
 *
 */

// find props definition: https://mui.com/material-ui/react-autocomplete/

export default function ReferenceDataAutoComplete(props) {
    const {
        label,
        name,
        error,
        value,
        size = "small",
        helperText,
        referenceTypeId,
        placeholder,
        loading,
        disabled,
        onChange,
        labelKey = "name",
        valueKey = "reference_id",
        required,
        isOptional,
        ...rest
    } = props;

    const [selectedOption, setSelectedOption] = useState(null);

    const referenceTypeWithData = localStorageGet("reference");

    const options = referenceTypeWithData?.find((item) => item.reference_type === referenceTypeId)?.reference_data;

    useEffect(() => {
        const option = options?.find((d) => d[valueKey] === value);
        setSelectedOption(option ?? null);
    }, [value]);

    return (
        <Autocomplete
            {...rest}
            size={size}
            options={options}
            autoHighlight
            isOptionEqualToValue={(option, value) => option[valueKey] === value[valueKey]}
            onChange={(e, value, reason, details) => {
                if (reason === "clear") {
                    setSelectedOption(null);
                } else {
                    setSelectedOption(value ?? null);
                }
                onChange?.(e, value, reason, details);
            }}
            value={selectedOption}
            getOptionLabel={(option) => option[labelKey]}
            renderOption={(props, option) => (
                <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                    {option[labelKey]}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={
                        <>
                            {label} {isOptional && <Typography variant="caption">(Optional)</Typography>}
                        </>
                    }
                    placeholder={placeholder}
                    required={required}
                    InputProps={{
                        disabled,
                        autoComplete: "new-password",
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    error={!!error}
                    helperText={helperText}
                    fullWidth
                />
            )}
            fullWidth
        />
    );
}

ReferenceDataAutoComplete.propTypes = {
    referenceTypeId: PropTypes.number.isRequired,
    labelKey: PropTypes.oneOf(["reference_id", "name", "value"]),
    valueKey: PropTypes.oneOf(["reference_id", "name", "value"]),
};
