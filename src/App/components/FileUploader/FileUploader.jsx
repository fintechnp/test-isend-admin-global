import Button from "@mui/material/Button";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const FileUploader = ({ name, onChange, imagePreview }) => {
    const [fileName, setFileName] = useState("");

    const handleChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <Button
                    variant="contained"
                    component="label"
                    sx={{
                        mb: 2,
                        mr: 2,
                    }}
                >
                    Choose File
                    <input name={name} type="file" onChange={handleChange} hidden />
                </Button>
                <Typography>{fileName}</Typography>
            </Box>

            {imagePreview && (
                <Box mt={2} textAlign="center">
                    <Box
                        component="img"
                        src={imagePreview}
                        alt={`${name} preview`}
                        sx={{
                            width: "60%",
                            height: "auto",
                            maxWidth: 200,
                            borderRadius: 1,
                            border: "1px solid red",
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default FileUploader;
