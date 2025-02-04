import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, get, useFormContext } from "react-hook-form";

function FormMultipleValueTextField(props) {
    const id = "id_" + Math.random();

    const {
        name,
        label,
        required,
        size = "small",
        type,
        fullWidth,
        rules,
        disabled,
        multiline,
        variant,
        focused,
        color,
        error,
        isOptional,
        ...rest
    } = props;

    const {
        control,
        clearErrors,
        getValues,
        formState: { errors },
    } = useFormContext();

    return (
        <Box sx={{ width: "100%" }}>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                        defaultValue={getValues(name) ? getValues(name) : []}
                        multiple
                        fullWidth={fullWidth}
                        id={id}
                        options={[]}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip size={size} label={option} {...getTagProps({ index })} />
                            ))
                        }
                        onChange={(event, values) => {
                            onChange(values);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                {...field}
                                type={type}
                                label={
                                    <>
                                        {label} {required && <span style={{ color: "red" }}>*</span>}
                                        {isOptional && (
                                            <Typography component="span" variant="caption">
                                                (Optional)
                                            </Typography>
                                        )}
                                    </>
                                }
                                helperText={error ?? get(errors, name)?.message ?? ""}
                                error={!!error || !!get(errors, name)?.message}
                                variant={variant}
                                size={size}
                                fullWidth={fullWidth}
                                onFocus={() => clearErrors(name)}
                                disabled={disabled}
                                color={color}
                            />
                        )}
                    />
                )}
            />
        </Box>
    );
}

export default FormMultipleValueTextField;
