import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, useFormContext } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function FormRadio(props) {
    const {
        control,
        clearErrors,
        formState: { errors },
        setValue,
    } = useFormContext();

    const {
        name,
        label,
        rules,
        variant,
        fullWidth,
        required,
        options,
        disabled,
        size,
        defaultValue,
        row = true,
        ...rest
    } = props;

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ""}
            rules={rules}
            render={({ field }) => (
                <FormControl
                    variant={variant}
                    fullWidth={fullWidth}
                    error={!!errors[name]}
                    required={required}
                    disabled={disabled}
                    size={size}
                >
                    <FormLabel id="controlled-radio-buttons-group">{label}</FormLabel>
                    <RadioGroup
                        name={name}
                        onFocus={() => clearErrors(name)}
                        row={row}
                        {...field}
                        {...rest}
                        onChange={(e) => {
                            setValue(name, e.target.value);
                            rest?.onChange(e);
                        }}
                    >
                        {options &&
                            options.map((option, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                />
                            ))}
                    </RadioGroup>
                    <FormHelperText>{errors[name]?.message ?? ""}</FormHelperText>
                </FormControl>
            )}
        />
    );
}
