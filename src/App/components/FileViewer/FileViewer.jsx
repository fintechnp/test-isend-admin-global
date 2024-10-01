import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Button from "../Button/Button";

export default function FileViewer({ fileUrl }) {
    const [open, setOpen] = useState(false);
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(true);

    if (!fileUrl) return <div>N/A</div>;

    const handleClose = () => setOpen(false);

    const handleOpen = () => setOpen(true);

    return (
        <>
            <Button
                size="small"
                type="button"
                onClick={handleOpen}
                sx={{ border: "none", "&:hover": { border: "none" } }}
            >
                <img
                    src={fileUrl}
                    alt="KYC document"
                    style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        margin: "auto",
                        marginBottom: "10px",
                    }}
                />
            </Button>

            <Backdrop
                sx={{
                    zIndex: (theme) => theme.zIndex.modal,
                }}
                open={open}
                onClick={() => setOpen(false)}
            >
                <Box height="100vh" width="100vw" display="flex" flexDirection="column" justifyContent="space-between">
                    <Box display="flex" justifyContent="space-between" p={1}>
                        <IconButton sx={{ color: "white" }} onClick={handleClose}>
                            <ArrowBackIcon />
                        </IconButton>
                        <IconButton sx={{ color: "white" }} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box flex={1} display="flex" alignItems="center" justifyContent="center">
                        {isPreviewAvailable ? (
                            <img
                                src={fileUrl}
                                alt="preview"
                                style={{
                                    minHeight: "60vh",
                                    maxHeight: "calc(100vh - 68px)",
                                    width: "auto",
                                }}
                                onError={() => setIsPreviewAvailable(false)}
                            />
                        ) : (
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Typography color="white">No Preview Available</Typography>
                                <Button onClick={() => window.open(fileUrl, "_blank")}>Open in Browser</Button>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Backdrop>
        </>
    );
}
