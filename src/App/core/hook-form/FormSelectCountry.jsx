import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Controller, useFormContext } from "react-hook-form";

import isEmpty from "App/helpers/isEmpty";
import ucwords from "App/helpers/ucwords";
import { localStorageGet } from "App/helpers/localStorage";
import { FormHelperText } from "@mui/material";

export default function FormSelectCountry(props) {
    const {
        control,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext();

    const countries = localStorageGet("country");

    const { id, name, label, required, size, fullWidth, disabled, variant, onSelected } = props;

    const value = watch("country");

    const labelId = "labelId_" + Math.random();

    return (
        <Controller
            name={name}
            control={control}
            render={() => {
                return (
                    <FormControl fullWidth>
                        <InputLabel id={labelId}>{label}</InputLabel>
                        <Select
                            labelId={labelId}
                            id={id}
                            name={name}
                            error={!!errors[name]}
                            onChange={(e) => {
                                const { value } = e.target;
                                setValue(name, value);
                                const selectedIndex = countries.findIndex((c) => c?.iso3 === value);
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
                            <MenuItem value="">Choose</MenuItem>
                            {countries?.map((c, i) => (
                                <MenuItem value={c.iso3} key={i}>
                                    {ucwords(c.country)}
                                </MenuItem>
                            ))}
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText error={true}>{errors[name]?.message ?? ""}</FormHelperText>
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
