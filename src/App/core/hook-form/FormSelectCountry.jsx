import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import { Controller, useFormContext, get } from "react-hook-form";

import ucwords from "App/helpers/ucwords";
import useCountries from "App/hooks/useCountries";

export default function FormSelectCountry(props) {
    const {
        id,
        name,
        label,
        required,
        size,
        fullWidth,
        disabled,
        variant,
        onSelected,
        labelKey = "country",
        valueKey = "iso3",
        isOptional,
    } = props;

    const {
        control,
        setValue,
        watch,
        clearErrors,
        formState: { errors },
    } = useFormContext();

    const { countries } = useCountries();

    const value = watch(name);

    const labelId = "labelId_" + Math.random();

    return (
        <Controller
            name={name}
            control={control}
            render={() => {
                return (
                    <FormControl fullWidth>
                        <InputLabel id={labelId} size={size} required={required}>
                            {label}
                            {isOptional && <Typography variant="caption">(Optional)</Typography>}
                        </InputLabel>
                        <Select
                            labelId={labelId}
                            id={id}
                            name={name}
                            error={!!get(errors, name)?.message}
                            onChange={(e) => {
                                const { value } = e.target;
                                setValue(name, value);
                                const selectedIndex = countries.findIndex((c) => c?.[valueKey] === value);
                                onSelected?.(countries?.[selectedIndex]);
                            }}
                            label={label}
                            variant={variant}
                            fullWidth={fullWidth}
                            required={required}
                            size={size}
                            disabled={disabled}
                            value={value ?? ""}
                            onFocus={() => clearErrors(name)}
                        >
                            <MenuItem value="" disabled>
                                Choose
                            </MenuItem>
                            {countries?.map((c, i) => (
                                <MenuItem value={c[valueKey]} key={i}>
                                    {ucwords(c[labelKey])}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText error={true}>{get(errors, name)?.message}</FormHelperText>
                    </FormControl>
                );
            }}
        />
    );
}

FormSelectCountry.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(["medium", "small", "large"]),
    fullWidth: PropTypes.bool,
    variant: PropTypes.oneOf(["outlined", "standard", "filled"]),
    color: PropTypes.oneOf(["primary", "secondary", "error", "info", "success", "warning"]),
    onSelected: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
    labelKey: PropTypes.oneOf(["country_id", "country", "iso2", "iso3", "phone_code", "currency", "currency_name"]),
    valueKey: PropTypes.oneOf(["country_id", "country", "iso2", "iso3", "phone_code", "currency", "currency_name"]),
};

FormSelectCountry.defaultProps = {
    label: "Select a country",
    error: false,
    helperText: "",
    required: false,
    disabled: false,
    fullWidth: true,
    size: "small",
    variant: "outlined",
};
