import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, useFormContext } from "react-hook-form";

function FormMultiSelect(props) {
    const {
        control,
        clearErrors,
        formState: { errors },
    } = useFormContext();

    const {
        name,
        label,
        required,
        size,
        rules,
        disabled,
        tabIndex,
        multiple = true,
        fullWidth,
        options,
        variant,
        showChooseOption,
        chooseOptionLabel,
        ...rest
    } = props;

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={[]}
            rules={rules}
            render={({ field }) => (
                <FormControl
                    variant={variant}
                    fullWidth={fullWidth}
                    size={size}
                    error={!!errors[name]}
                    required={required}
                >
                    <InputLabel>{label}</InputLabel>
                    <Select
                        error={!!errors[name]}
                        label={label}
                        variant={variant}
                        required={required}
                        onFocus={() => clearErrors(name)}
                        disabled={disabled}
                        tabIndex={tabIndex}
                        multiple={multiple}
                        fullWidth
                        {...field}
                        {...rest}
                    >
                        {showChooseOption && (
                            <MenuItem>
                                <em>{chooseOptionLabel}</em>
                            </MenuItem>
                        )}
                        {options &&
                            options.map((option, index) => (
                                <MenuItem key={index} value={option.value} selected={option.value == field.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                    </Select>
                    <FormHelperText>{errors[name]?.message ?? ""}</FormHelperText>
                </FormControl>
            )}
        />
    );
}

export default FormMultiSelect;

FormMultiSelect.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(["medium", "small"]),
    fullWidth: PropTypes.bool,
    rules: PropTypes.object,
    multiline: PropTypes.bool,
    tabIndex: PropTypes.number,
    multiple: PropTypes.bool,
    options: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            }),
        ),
    ]).isRequired,
    showChooseOption: PropTypes.bool,
    chooseOptionLabel: PropTypes.string,
    variant: PropTypes.oneOf(["outlined", "standard", "filled"]),
};

FormMultiSelect.defaultProps = {
    type: "text",
    label: "",
    required: false,
    disabled: false,
    size: "small",
    rules: {},
    multiline: false,
    multiple: false,
    options: [],
    showChooseOption: true,
    variant: "outlined",
    fullWidth: true,
    chooseOptionLabel: "Choose",
};
