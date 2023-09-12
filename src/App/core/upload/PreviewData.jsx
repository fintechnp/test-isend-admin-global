import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function PreviewFile(props) {
    const { onRemove, type } = props;

    const [selected, setSelected] = useState();

    useEffect(() => {
        if (type === "file") {
            const { file } = props;

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64 = reader.result;

                setSelected({
                    fileType: file.type,
                    base64,
                    name: file.name,
                });
            };
        } else if (type === "url") {
            const { fileUrl, fileType } = props;
            setSelected({
                fileUrl,
                fileType,
            });
        }
    }, [type, props]);

    if (selected?.fileType.includes("image")) {
        return (
            <Box width="100%">
                <Box
                    sx={{
                        display: "flex",
                        width: "80%",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "1rem",
                        position: "relative",
                        borderRadius: "10px",
                        margin: "auto",
                        border: (theme) => `1px solid  #ccc`,
                        backgroundColor: "#fff",
                    }}
                >
                    <img
                        src={selected?.base64 ?? selected?.fileUrl}
                        alt={selected?.name ?? ""}
                        style={{
                            width: "30%",
                            height: "30%",
                        }}
                    />
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: "0.5rem",
                            right: "0.5rem",
                        }}
                        onClick={onRemove}
                        color="error"
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                </Box>
            </Box>
        );
    }

    return (
        <Box width="100%">
            <Box
                sx={{
                    display: "flex",
                    width: "80%",
                    justifyContent: "space-between",
                    padding: "1rem",
                    borderRadius: "10px",
                    margin: "auto",
                    border: (theme) => `1px solid #ccc`,
                    backgroundColor: "#fff",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                    }}
                >
                    <Stack>
                        <Typography fontSize="1.2rem" fontWeight={600} lineHeight="2rem">
                            {selected?.name}
                        </Typography>
                        <Typography fontSize="1rem" lineHeight="1rem">
                            Uploaded
                        </Typography>
                    </Stack>
                </Box>
                <IconButton size="small" color="error" onClick={onRemove}>
                    <CloseRoundedIcon />
                </IconButton>
            </Box>
        </Box>
    );
}
