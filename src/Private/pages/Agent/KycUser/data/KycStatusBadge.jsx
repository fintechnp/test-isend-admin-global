import React from "react";
import Chip from "@mui/material/Chip";
import { useTheme } from "@emotion/react";

export default function KycStatusBadge({ status, label }) {
    const theme = useTheme();
    const colors = {
        0: theme.palette.primary.main,
        1: theme.palette.warning.main,
        2: theme.palette.success.main,
        3: theme.palette.error.main,
        4: theme.palette.error.main,
        5: theme.palette.primary.main,
        6: theme.palette.error.main,
        "": null,
    };

    const surfaceColors = {
        0: theme.palette.surface.primarySecond,
        1: theme.palette.surface.warningSecond,
        2: theme.palette.surface.successSecond,
        3: theme.palette.surface.dangerSecond,
        4: theme.palette.surface.dangerSecond,
        5: theme.palette.surface.primarySecond,
        6: theme.palette.surface.dangerSecond,
        "": null,
    };
    const color = colors[status];

    return (
        <Chip sx={{ color: color || "default", bgcolor: surfaceColors[status] }} label={label ?? "N/A"} size="small" />
    );
}
