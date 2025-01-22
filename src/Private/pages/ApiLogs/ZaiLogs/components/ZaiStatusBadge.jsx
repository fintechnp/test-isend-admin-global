import React from "react";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/styles";

export default function ZaiStatusBadge({ status, label }) {
    const theme = useTheme();

    const colors = {
        V: theme.palette.secondary.main,
        I: theme.palette.primary.main,
        R: theme.palette.warning.main,
        C: theme.palette.success.main,
        "": null,
    };

    const surfaceColors = {
        V: theme.palette.surface.secondarySecond,
        I: theme.palette.surface.primarySecond,
        R: theme.palette.surface.warningSecond,
        C: theme.palette.surface.successSecond,
        "": null,
    };

    const color = colors[status.toUpperCase()];

    return (
        <Chip
            sx={{ color: color || "default", bgcolor: surfaceColors[status.toUpperCase()], fontSize: "1rem" }}
            label={label ?? "N/A"}
            size="small"
        />
    );
}
