import React from "react";
import Box from "@mui/material/Box";

export default function Center({ children, sx, ...rest }) {
    return (
        <Box
            {...rest}
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                ...sx,
            }}
        >
            {children}
        </Box>
    );
}
