import React from "react";
import Box from "@mui/material/Box";

export default function Column(props) {
    const { children, ...rest } = props;

    return (
        <Box width="100%" {...rest} display="flex" flexDirection="column">
            {children}
        </Box>
    );
}
