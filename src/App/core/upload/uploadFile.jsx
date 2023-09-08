import { Box, IconButton, Typography, styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import PreviewFile from "./PreviewData";
import SubmitButton from "./SubmitButton";
import { useDispatch, useSelector } from "react-redux";

import { MarketMakerActions as actions } from "Private/pages/MarketMaker/store";

const Container = styled("div", {
    shouldForwardProp: (prop) => prop !== "error",
})(({ theme, error }) => ({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    border: `2px dashed ${error ? "red" : "#C7D2E0"}`,
    borderRadius: "5px",
    cursor: "pointer",
    padding: "1.6rem 0",
    margin: "1rem",
    gap: "1rem",
}));

export default function UploadFile(props) {
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const {
        maxSize = 2048000,
        allowedFileTypes,
        supportedFileDescription,
        title,
        description,
        onUploadSuccess,
        onFileRemove,
        onChange,
        error,
        file,
        fileType,
    } = props;

    const [selectedFile, setSelectedFile] = useState(file);
    const [isFileUploaded, setIsFileUploaded] = useState(!!file);

    const { loading: isUploading, response, success } = useSelector((state) => state.add_document);

    useEffect(() => {
        dispatch({
            type: "ADD_DOCUMENT_RESET",
        });
    }, []);

    useEffect(() => {
        if (response) {
            if (success) {
                setIsFileUploaded(true);
                if (typeof onUploadSuccess === "function") onUploadSuccess(response?.data);
            }
        }
    }, [response]);

    const handleOnChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const fileType = file.type;

        if (allowedFileTypes !== "*") {
            if (!allowedFileTypes?.includes(fileType)) {
                alert(`File type should be ${supportedFileDescription}`);
                return;
            }
        }

        if (file.size > maxSize) {
            alert(`File size should be less than ${maxSize / 1000000} MB`);
            return;
        }

        setSelectedFile(file);

        if (typeof onChange === "function") onChange(file);
    };

    const handleUpload = (e) => {
        e.stopPropagation();

        if (!selectedFile && inputRef.current) {
            inputRef.current.click();
        } else {
            const formData = new FormData();
            formData.append("document", selectedFile);
            dispatch(actions.add_document(formData));
        }
    };

    const handleRemove = (_e) => {
        setSelectedFile(undefined);
        setIsFileUploaded(false);
        if (inputRef.current) inputRef.current.value = "";
        if (typeof onFileRemove === "function") onFileRemove();
    };
    return (
        <Container
            onClick={() => {
                if (inputRef.current && !selectedFile) {
                    inputRef.current.click();
                }
            }}
            error={error}
        >
            <>
                <input
                    style={{ display: "none" }}
                    accept={Array.isArray(allowedFileTypes) ? allowedFileTypes.join(",") : allowedFileTypes}
                    type="file"
                    onChange={handleOnChange}
                    ref={inputRef}
                />

                {selectedFile ? (
                    <Box width="100%">
                        <PreviewFile
                            {...(selectedFile instanceof File
                                ? {
                                      type: "file",
                                      file: selectedFile,
                                  }
                                : {
                                      type: "url",
                                      fileUrl: selectedFile,
                                      fileType: fileType,
                                  })}
                            onRemove={handleRemove}
                        />
                    </Box>
                ) : (
                    <IconButton size="large">
                        {/* <DocumentUpload /> */}
                        Upload
                    </IconButton>
                )}
                <Typography mt="1rem" fontSize="1.2rem" fontWeight={600}>
                    {title}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography lineHeight="2rem">{description}</Typography>
                    <Typography lineHeight="2rem">{supportedFileDescription}</Typography>
                </Box>
            </>
            {(() => {
                if (selectedFile && isFileUploaded) {
                    return (
                        <SubmitButton type="button" color="error" onClick={handleRemove}>
                            Remove File
                        </SubmitButton>
                    );
                }

                if (!selectedFile) {
                    return <SubmitButton type="button">Select File</SubmitButton>;
                }

                if (selectedFile) {
                    return (
                        <SubmitButton type="button" onClick={handleUpload} disabled={isUploading || isFileUploaded}>
                            {(() => {
                                if (!selectedFile) return "Select File";
                                return isUploading ? "Uploading" : "Upload";
                            })()}
                        </SubmitButton>
                    );
                }

                return (
                    <SubmitButton type="button" color="error" onClick={handleRemove}>
                        Remove File
                    </SubmitButton>
                );
            })()}
        </Container>
    );
}
