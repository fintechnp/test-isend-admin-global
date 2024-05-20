import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Center from "../Center/Center";

export default function AccessDenied() {
    return (
        <Center sx={{ height: (theme) => `calc(100svh - 100px)` }}>
            <Box>
                <Typography align="center" fontSize="1.5rem">
                    Access Denied
                </Typography>
                <Typography align="center">You don&apos;t have permission to access it</Typography>
            </Box>
        </Center>
    );
}
