import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, useFormContext, get } from "react-hook-form";

function FormSelect(props) {
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
        rules,
        disabled,
        tabIndex,
        multiple,
        fullWidth,
        options,
        variant,
        showChooseOption,
        chooseOptionLabel,
        onChange,
        error,
        ...rest
    } = props;

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            rules={rules}
            render={({ field }) => (
                <FormControl
                    variant={variant}
                    fullWidth={fullWidth}
                    size={size}
                    error={!!get(errors, name)}
                    required={required}
                >
                    <InputLabel>{label}</InputLabel>
                    <Select
                        {...field}
                        {...rest}
                        error={!!get(errors, name)}
                        label={label}
                        variant={variant}
                        required={required}
                        onFocus={() => clearErrors(name)}
                        disabled={disabled}
                        tabIndex={tabIndex}
                        multiple={multiple}
                        onChange={(e) => {
                            setValue(name, e.target.value);
                            onChange?.(e);
                        }}
                        fullWidth
                    >
                        {showChooseOption && (
                            <MenuItem disabled>
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
                    <FormHelperText error={true}> {error ?? get(errors, name)?.message ?? ""}</FormHelperText>
                </FormControl>
            )}
        />
    );
}

export default FormSelect;

FormSelect.propTypes = {
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
    error: PropTypes.string,
    variant: PropTypes.oneOf(["outlined", "standard", "filled"]),
    onChange: PropTypes.func,
};

FormSelect.defaultProps = {
    type: "text",
    label: "",
    required: false,
    disabled: false,
    size: "small",
    rules: {},
    multiline: false,
    multiple: false,
    options: [],
    showChooseOption: false,
    variant: "outlined",
    fullWidth: true,
    chooseOptionLabel: "Choose",
};
