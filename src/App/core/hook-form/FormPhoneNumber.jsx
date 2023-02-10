import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";

import { localStorageGet } from "App/helpers/localStorage";

function FormPhoneNumber(props) {
    const {
        control,
        clearErrors,
        setValue,
        getValues,
        formState: { errors },
    } = useFormContext();

    const {
        name,
        label,
        error,
        helperText,
        required,
        size,
        type,
        fullWidth,
        rules,
        disabled,
        multiline,
        variant,
        focused,
        color,
        dialingCodeName,
        defaultValue,
        ...rest
    } = props;

    const countries = localStorageGet("country");

    let options = countries?.map((country) => ({
        key: country.iso_3166_3,
        label: country.name,
        dialing_code: country.calling_code,
        code: country.iso_3166_2,
        flag: country.flag,
    }));

    let defaultOption = options.find((option) => option.dialing_code === getValues(dialingCodeName));

    return (
        <Box
            style={{
                position: "relative",
            }}
            gap={1}
        >
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <Autocomplete
                        onChange={(option) => setValue(dialingCodeName, option?.dialing_code ?? "")}
                        size={size}
                        options={options}
                        autoHighlight
                        getOptionLabel={(option) => option.dialing_code}
                        renderOption={({ key, ...rest }, option) => (
                            <Box key={option.key} sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...rest}>
                                <img loading="lazy" width="20" src={option.flag} srcSet={option.flag + ` 2x`} alt="" />
                                {option.label} ({option.code}) + {option.dialing_code}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label=""
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: "new-password", // disable autocomplete and autofill
                                }}
                            />
                        )}
                        {...field}
                    />
                )}
            />
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <TextField
                        {...rest}
                        {...field}
                        type={type}
                        error={!!errors[name]}
                        helperText={errors[name]?.message ?? ""}
                        label={label}
                        variant={variant}
                        fullWidth={fullWidth}
                        required={required}
                        size={size}
                        onFocus={() => clearErrors(name)}
                        disabled={disabled}
                        multiline={multiline}
                        focused={focused}
                        color={color}
                        value={field.value || ""}
                        sx={{
                            width: "80%",
                            position: "absolute",
                            top: 0,
                            right: 0,
                            bgcolor: "white",
                        }}
                    />
                )}
            />
        </Box>
    );
}

export default FormPhoneNumber;

FormPhoneNumber.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(["medium", "small", "large"]),
    fullWidth: PropTypes.bool.isRequired,
    rules: PropTypes.object,
    multiline: PropTypes.bool,
    variant: PropTypes.oneOf(["outlined", "standard", "filled"]),
    focused: PropTypes.bool,
    color: PropTypes.oneOf(["primary", "secondary", "error", "info", "success", "warning"]),
    value: PropTypes.string,
    dialingCodeName: PropTypes.string,
};

FormPhoneNumber.defaultProps = {
    type: "text",
    label: "",
    error: false,
    helperText: "",
    required: false,
    disabled: false,
    size: "medium",
    fullWidth: true,
    rules: {},
    multiline: false,
    size: "small",
    variant: "outlined",
    focused: false,
    value: "",
    dialingCodeName: "dialing_code",
};
