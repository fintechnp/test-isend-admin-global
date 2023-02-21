import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

export default function ReportTitle({ children }) {
    return (
        <Box display="flex" alignItems="center" gap={2}>
            <ContentPasteSearchIcon />
            {Object.prototype.toString.call(children) === "[object String]" ? (
                <Typography variant="h6" color="primary.main">
                    {children}
                </Typography>
            ) : (
                children
            )}
        </Box>
    );
}
