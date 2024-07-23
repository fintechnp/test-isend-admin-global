import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, useFormContext } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";

// Another method reference: https://codesandbox.io/s/material-demo-bzj4i?file=/demo.js
function FormCheckbox(props) {
    const { control } = useFormContext();

    const { name, label, error, helperText, required, rules } = props;

    return (
        <FormControlLabel
            control={
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field }) => (
                        <>
                            <Checkbox
                                checked={field.value ?? false}
                                onChange={(e) => field.onChange(e.target.checked)}
                                required={required}
                            />
                            {error && <FormHelperText>{helperText}</FormHelperText>}
                        </>
                    )}
                />
            }
            label={<span style={{ fontSize: "0.85rem" }}>{label}</span>}
        />
    );
}

export default FormCheckbox;

FormCheckbox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(["medium", "small"]),
    fullWidth: PropTypes.bool.isRequired,
    rules: PropTypes.object,
    checked: PropTypes.bool,
};

FormCheckbox.defaultProps = {
    label: "",
    error: false,
    helperText: "",
    required: false,
    disabled: false,
    size: "medium",
    fullWidth: true,
    rules: {},
    checked: false,
};
