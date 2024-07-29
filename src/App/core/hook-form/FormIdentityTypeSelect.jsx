import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useFormContext, get } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

import isEmpty from "App/helpers/isEmpty";
import { documentFor } from "Private/pages/Setup/DocumentAcceptance/data/documentFor";
import documentAcceptanceActions from "Private/features/documentAcceptance/documentAcceptanceActions";

/**
 * @typedef {DocumentAcceptance} json
 * @property {number} id
 * @property {string} document_type
 * @property {string} document_type_name
 * @property {string} shufti_document_type
 * @property {string} document_for
 * @property {boolean} is_required
 * @property {string} status
 * @property {boolean} has_two_side
 * @property {number} reference_data_id
 *
 */

export default function FormIdentityTypeSelect({
    label,
    name,
    country,
    documentFor = "KYC",
    size = "small",
    labelKey = "document_type_name",
    valueKey = "reference_data_id",
    placeholder,
    required,
    isOptional,
    disabled,
    onChange,
}) {
    const dispatch = useDispatch();

    const [selectedOption, setSelectedOption] = useState(null);

    const {
        setValue,
        formState: { errors },
        watch,
    } = useFormContext();

    const { response, loading: isLoading } = useSelector((state) => state.get_document_acceptance_list);

    const options =
        response?.data?.find((d) => d.country.toUpperCase() === country?.toUpperCase())?.document_list ?? [];

    const errorMessage = get(errors, name)?.message;

    const value = watch(name);

    useEffect(() => {
        if (isEmpty(country) || isEmpty(documentFor)) return;
        dispatch(
            documentAcceptanceActions.get_document_acceptance_list({
                country,
                document_for: documentFor,
            }),
        );
    }, [country, documentFor]);

    useEffect(() => {
        const option = options?.find((d) => d[valueKey] === value);
        setSelectedOption(option ?? null);
    }, [value]);

    return (
        <Autocomplete
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
                setValue(name, value?.[valueKey] ?? null);
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
                                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    error={!!errorMessage}
                    helperText={errorMessage}
                    fullWidth
                />
            )}
            fullWidth
        />
    );
}

FormIdentityTypeSelect.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string,
    documentFor: PropTypes.oneOf(Object.values(documentFor)),
    size: PropTypes.string,
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    isOptional: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};
