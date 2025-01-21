import React from "react";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/styles";
import capitalize from "lodash/capitalize";

import { Status } from "./Status";
import isEmpty from "App/helpers/isEmpty";

export default function StatusBadge({ status }) {
    const theme = useTheme();

    const colors = {
        W: theme.palette.secondary.main,
        I: theme.palette.primary.main,
        B: theme.palette.error.main,
        P: theme.palette.warning.main,
        C: theme.palette.success.main,
        F: theme.palette.error.main,
        R: theme.palette.error.main,
        E: theme.palette.error.main,
        "": null,
    };

    const surfaceColors = {
        W: theme.palette.surface.secondarySecond,
        I: theme.palette.surface.primarySecond,
        B: theme.palette.surface.dangerSecond,
        P: theme.palette.surface.warningSecond,
        C: theme.palette.surface.successSecond,
        F: theme.palette.surface.dangerSecond,
        R: theme.palette.surface.dangerSecond,
        E: theme.palette.surface.dangerSecond,
        "": null,
    };

    const color = colors[status.toUpperCase()];
    const surfaceColor = surfaceColors[status.toUpperCase()];

    const label = isEmpty(status) ? "N/A" : capitalize(status);

    return (
        <Chip
            sx={{ color: color || "default", bgcolor: surfaceColor || "default" }}
            label={Status?.[label] ?? "N/A"}
            size="small"
        />
    );
}
