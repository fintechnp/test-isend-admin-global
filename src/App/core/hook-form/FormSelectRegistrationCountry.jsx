import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, useFormContext, get } from "react-hook-form";

import ucwords from "App/helpers/ucwords";
import { localStorageGet } from "App/helpers/localStorage";

export default function FormSelectRegistrationCountry(props) {
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
    } = props;

    const {
        control,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext();

    const countries = localStorageGet("sendCountry");

    const value = watch(name);

    const labelId = "labelId_" + Math.random();

    return (
        <Controller
            name={name}
            control={control}
            render={() => {
                return (
                    <FormControl fullWidth size={size}>
                        <InputLabel id={labelId} required={required}>
                            {label}
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
                                onSelected?.(countries[selectedIndex]);
                            }}
                            label={label}
                            variant={variant}
                            fullWidth={fullWidth}
                            required={required}
                            size={size}
                            disabled={disabled}
                            value={value ?? ""}
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
                        <FormHelperText error={true}>{get(errors, name)?.message ?? ""}</FormHelperText>
                    </FormControl>
                );
            }}
        />
    );
}

FormSelectRegistrationCountry.propTypes = {
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

FormSelectRegistrationCountry.defaultProps = {
    label: "Select a country",
    error: false,
    helperText: "",
    required: false,
    disabled: false,
    fullWidth: true,
    size: "small",
    variant: "outlined",
};
