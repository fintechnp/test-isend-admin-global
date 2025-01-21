import React from "react";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/styles";

export default function BalanceRequestStatusBadge({ status }) {
    const theme = useTheme();

    const colors = {
        Pending: theme.palette.warning.main,
        Approved: theme.palette.success.main,
        Rejected: theme.palette.error.main,
        "": null,
    };

    const surfaceColors = {
        Pending: theme.palette.surface.warningSecond,
        Approved: theme.palette.surface.successSecond,
        Rejected: theme.palette.surface.dangerSecond,
        "": null,
    };

    const color = colors[status];

    return (
        <Chip sx={{ color: color || "default", bgcolor: surfaceColors[status] }} label={status ?? "N/A"} size="small" />
    );
}
