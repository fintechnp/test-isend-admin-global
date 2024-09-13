import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import React, { useCallback, useRef, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useDropzone } from "react-dropzone";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, useFormContext, get } from "react-hook-form";
import UploadIcon from "App/components/Icon/UploadIcon";
import { Button } from "@mui/material";

// Styled preview container for images
const FilePreview = styled(Box)({
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    overflow: "hidden",
    "& img": { width: "auto", height: "100%" },
});

function FormFileField({ name, label, acceptedFiles = [], ...rest }) {
    const inputRef = useRef();
    const {
        control,
        clearErrors,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();
    const file = watch(name);
    const errorMessage = get(errors, name)?.message;
    const [previewUrl, setPreviewUrl] = useState(null);

    const onDrop = useCallback(
        (acceptedFiles) => {
            const droppedFile = acceptedFiles[0];
            setValue(name, droppedFile);
            clearErrors(name);
            inputRef.current.value = "";

            // Create and set preview URL
            const fileUrl = URL.createObjectURL(droppedFile);
            setPreviewUrl(fileUrl);
        },
        [name, setValue, clearErrors],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: acceptedFiles,
    });

    const handleRemove = () => {
        setValue(name, null);
        inputRef.current.value = "";
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
    };

    return (
        <Box display="flex" flexDirection="column">
            <Box
                {...getRootProps()}
                sx={{
                    border: `1px solid ${errorMessage ? "error.main" : "rgba(0, 0, 0, 0.23)"}`,
                    borderRadius: "8px",
                    p: 2,
                    textAlign: "center",
                }}
                onClick={() => inputRef.current.click()}
            >
                <Typography variant="subtitle1" fontWeight={600}>
                    {label}
                </Typography>

                {file && previewUrl ? (
                    <FilePreview>
                        <img src={previewUrl} alt="Preview" />
                    </FilePreview>
                ) : (
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <UploadIcon sx={{ mb: 1 }} />
                        <Typography>{isDragActive ? "Drop Here" : "Drag & Drop or click to upload"}</Typography>
                    </Box>
                )}

                {file && (
                    <Tooltip title="Remove" arrow>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemove();
                            }}
                            sx={{
                                marginTop: 1,
                            }}
                            variant="outlined"
                            size="small"
                            color="error"
                        >
                            Remove
                        </Button>
                    </Tooltip>
                )}
            </Box>

            <Controller
                name={name}
                control={control}
                render={({ field }) => <input {...getInputProps()} ref={inputRef} />}
            />
            <FormHelperText error>{errorMessage}</FormHelperText>
        </Box>
    );
}

FormFileField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    acceptedFiles: PropTypes.array,
};

export default FormFileField;
