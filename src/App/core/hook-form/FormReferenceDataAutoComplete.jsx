import React from "react";
import PropTypes from "prop-types";
import { useFormContext, get } from "react-hook-form";

import ReferenceDataAutoComplete from "App/components/Input/ReferenceDataAutoComplete";

export default function FormReferenceDataAutoComplete(props) {
    const {
        label,
        name,
        error,
        value,
        size = "small",
        helperText,
        referenceTypeId,
        placeholder,
        disabled,
        onChange,
        labelKey = "name",
        valueKey = "reference_id",
        required,
        ...rest
    } = props;

    const {
        setValue,
        watch,
        formState: { errors },
    } = useFormContext();

    const fieldValue = watch(name);

    const errorMessage = get(errors, name)?.message ?? "";

    return (
        <ReferenceDataAutoComplete
            {...rest}
            label={label}
            value={fieldValue}
            disabled={disabled}
            error={!!errorMessage}
            helperText={errorMessage}
            referenceTypeId={referenceTypeId}
            onChange={(_, value) => {
                setValue(name, value?.[valueKey] ?? "");
            }}
            required
        />
    );
}

FormReferenceDataAutoComplete.propTypes = {
    referenceTypeId: PropTypes.number.isRequired,
    labelKey: PropTypes.oneOf(["reference_id", "name", "value"]),
    valueKey: PropTypes.oneOf(["reference_id", "name", "value"]),
};
