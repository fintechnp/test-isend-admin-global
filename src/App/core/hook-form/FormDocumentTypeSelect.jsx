import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useFormContext, get } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

import RefreshIconButton from "App/components/Button/RefreshIconButton";
import documentAcceptanceActions from "Private/features/documentAcceptance/documentAcceptanceActions";

// {
//     "id": 2,
//     "document_type": "live_photo",
//     "document_type_name": "Selifie or Live Photo",
//     "shufti_document_type": null,
//     "document_for": "KYC",
//     "is_required": null,
//     "status": "active"
// },

export default function FormDocumentTypeSelect({
    label,
    name,
    size = "small",
    labelKey = "document_type_name",
    valueKey = "document_type",
    queryParams,
    country,
    required,
    isOptional,
    onChange,
    documentFor = "KYC",
    ...rest
}) {
    const {
        setValue,
        watch,
        clearErrors,
        formState: { errors },
    } = useFormContext();

    const [selectedOption, setSelectedOption] = useState(null);

    const { response, loading: isLoading } = useSelector((state) => state.get_document_acceptance_list);

    const options =
        response?.data?.find((d) => d.country.toUpperCase() === country?.toUpperCase())?.document_list ?? [];

    const dispatch = useDispatch();

    const value = watch(name);

    const fetch = () => {
        if (!country) return;
        dispatch(
            documentAcceptanceActions.get_document_acceptance_list({
                country: country,
                document_for: documentFor,
            }),
        );
    };

    useEffect(() => {
        fetch();
    }, [country]);

    useEffect(() => {
        const option = options?.find((d) => d[valueKey] === value);
        setSelectedOption(option ?? null);
    }, [options]);

    const errorMessage = get(errors, name)?.message ?? "";

    return (
        <Box display="flex" gap={1}>
            <Autocomplete
                {...rest}
                fullWidth
                size={size}
                options={options}
                autoHighlight
                isOptionEqualToValue={(option, value) => option[valueKey] === value[valueKey]}
                onChange={(e, value, reason, details) => {
                    if (reason === "clear") {
                        setSelectedOption(null);
                    } else {
                        setSelectedOption(value);
                        setValue(name, value[valueKey]);
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
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <InputAdornment position="end">
                                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </InputAdornment>
                            ),
                        }}
                        required={required}
                        error={!!errorMessage}
                        helperText={errorMessage}
                        fullWidth
                    />
                )}
                onFocus={() => clearErrors(name)}
            />
            <RefreshIconButton onClick={fetch} />
        </Box>
    );
}

FormDocumentTypeSelect.propTypes = {
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
    queryParams: PropTypes.object,
    country: PropTypes.string,
    documentFor: PropTypes.oneOf(["KYB", "KYC"]),
};
