import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import React, { useCallback, useRef } from "react";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useDropzone } from "react-dropzone";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, useFormContext, get } from "react-hook-form";

import Center from "App/components/Center/Center";
import UploadIcon from "App/components/Icon/UploadIcon";

// accept: image/*, image/gif image/jpeg, image/png, application/pdf

const FilePreview = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "250px",
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    borderColor: "rgba(0, 0, 0, 0.23)",
    overflow: "auto",
    "& img": {
        width: "auto",
        height: "100%",
        objectFit: "cover",
    },
}));

function FormFileField({ name, label, required, disabled, acceptedFiles = [], ...rest }) {
    const inputRef = useRef();

    const {
        control,
        clearErrors,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();

    const onDrop = useCallback(
        (acceptedFiles) => {
            setValue(name, acceptedFiles[0]);
            clearErrors(name);
            inputRef.current.value = "";
        },
        [name, setValue],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: acceptedFiles,
    });

    const file = watch(name);

    const handleRemove = () => {
        setValue(name, null);
        inputRef.current.value = "";
    };

    const errorMessage = get(errors, name)?.message;

    return (
        <Box display="flex" flexDirection="column">
            <Box
                {...getRootProps()}
                sx={{
                    border: (theme) =>
                        `1px solid ${errorMessage ? theme.palette.error.main : theme.palette.stroke.base}`,
                    padding: "16px",
                    borderRadius: "8px",
                }}
                onClick={() => inputRef.current.click()}
            >
                <Box mb="16px" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight={600} fontSize="1.143rem" lineHeight="1.714rem">
                        {label}
                    </Typography>
                    {file && (
                        <Tooltip placement="top" title="Remove" arrow>
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    handleRemove();
                                }}
                                color="error"
                            >
                                <CancelIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
                <Box
                    sx={{
                        border: (theme) => `1px dotted ${theme.palette.stroke.base}`,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: "24px",
                        borderRadius: "10px",
                    }}
                >
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <>
                                <input {...getInputProps()} ref={inputRef} accept={acceptedFiles.join(", ")} />
                                {file ? (
                                    <FilePreview>
                                        <img src={URL.createObjectURL(file)} />
                                    </FilePreview>
                                ) : (
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        gap="16px"
                                    >
                                        <Center
                                            sx={{
                                                border: (theme) => `1px solid ${theme.palette.stroke.base}`,
                                                height: "36px",
                                                width: "36px",
                                                borderRadius: "50%",
                                            }}
                                        >
                                            <UploadIcon />
                                        </Center>
                                        {isDragActive ? (
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                justifyContent="center"
                                                alignItems="center"
                                                gap="4px"
                                            >
                                                <Typography
                                                    fontWeight={500}
                                                    textAlign="center"
                                                    fontSize="1.143rem"
                                                    lineHeight="3.714rem"
                                                >
                                                    Drop Here
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                justifyContent="center"
                                                alignItems="center"
                                                gap="4px"
                                            >
                                                <Typography
                                                    fontWeight={500}
                                                    textAlign="center"
                                                    fontSize="1.143rem"
                                                    lineHeight="1.714rem"
                                                >
                                                    Drag and Drop or{" "}
                                                    <Typography
                                                        component="span"
                                                        color="primary.main"
                                                        fontWeight={500}
                                                        sx={{
                                                            "&:hover": {
                                                                textDecoration: "underline",
                                                                cursor: "pointer",
                                                            },
                                                        }}
                                                        fontSize="1.143rem"
                                                        lineHeight="1.714rem"
                                                    >
                                                        choose your file{" "}
                                                    </Typography>
                                                    for upload
                                                </Typography>
                                                <Typography
                                                    textAlign="center"
                                                    fontSize="1.143rem"
                                                    lineHeight="1.714rem"
                                                >
                                                    JPG or PNG
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </>
                        )}
                    />
                </Box>
            </Box>
            <FormHelperText error>{errorMessage}</FormHelperText>
        </Box>
    );
}

FormFileField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    acceptedFiles: PropTypes.string,
};

export default FormFileField;
