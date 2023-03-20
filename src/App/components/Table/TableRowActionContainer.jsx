import React from "react";
import Box from "@mui/material/Box";

export default function TableRowActionContainer({ children }) {
    return (
        <Box display="flex" alignItems="center" gap={1}>
            {children}
        </Box>
    );
}
