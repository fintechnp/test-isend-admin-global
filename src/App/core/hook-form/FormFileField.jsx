import React, { useCallback } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import Placeholder from "App/components/Fields/ImageUploadField/Placeholder";
import ImagePreview2 from "App/components/Fields/ImageUploadField/ImagePreview2";
import CancelIcon from "@mui/icons-material/Cancel";

function FormFileField(props) {
    const {
        control,
        clearErrors,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();

    const { name, label, required, size, fullWidth, rules, disabled, variant, focused, accept, color, ...rest } = props;

    const onDrop = useCallback(
        (acceptedFiles) => {
            setValue(name, acceptedFiles[0]);
        },
        [name, setValue],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept,
    });

    const file = watch(name);

    const handleRemove = () => {
        setValue(name, null);
    };

    return (
        <div>
            {file && (
                <CancelIcon
                    sx={{
                        float: "right",
                        marginRight: "20px",
                        marginY: "8px",
                    }}
                    color="warning"
                    fontSize="medium"
                    onClick={handleRemove}
                />
            )}

            <div {...getRootProps()} style={{ border: "1px dashed #ccc", padding: "10px", borderRadius: "4px" }}>
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field }) => (
                        <>
                            <input {...getInputProps()} />

                            {isDragActive ? (
                                <Placeholder text="Drop the image here..." />
                            ) : file ? (
                                <ImagePreview2 file={file} onRemove={handleRemove} />
                            ) : (
                                <Placeholder text="Drag and drop an image here, or click to select one" />
                            )}
                        </>
                    )}
                />
            </div>
        </div>
    );
}

FormFileField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(["medium", "small", "large"]),
    fullWidth: PropTypes.bool.isRequired,
    rules: PropTypes.object,
    variant: PropTypes.oneOf(["outlined", "standard", "filled"]),
    focused: PropTypes.bool,
    value: PropTypes.string,
    accept: PropTypes.string,
};

FormFileField.defaultProps = {
    label: "",
    required: false,
    disabled: false,
    fullWidth: true,
    rules: {},
    size: "small",
    variant: "outlined",
    focused: false,
    value: "",
    multiple: false,
};

export default FormFileField;
