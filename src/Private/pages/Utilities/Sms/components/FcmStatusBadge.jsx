import { useTheme } from "@mui/styles";
import React from "react";
import capitalize from "lodash/capitalize";
import isEmpty from "App/helpers/isEmpty";

import Chip from "@mui/material/Chip";
import { fcmStatus } from "../data/fcmStatus";

const FcmStatusBadge = ({ status }) => {
    const theme = useTheme();

    const colors = {
        I: theme.palette.primary.main,
        C: theme.palette.success.main,
        F: theme.palette.error.main,
        P: theme.palette.warning.main,
        "": null,
    };

    const surfaceColors = {
        I: theme.palette.surface.primarySecond,
        C: theme.palette.surface.successSecond,
        F: theme.palette.surface.dangerSecond,
        P: theme.palette.surface.warningSecond,
        "": null,
    };

    const color = colors[status?.toUpperCase()];
    const surfaceColor = surfaceColors[status?.toUpperCase()];

    const label = !isEmpty(status) ? capitalize(status) : "N/A";

    return (
        <Chip
            sx={{
                color: color || "default",
                bgcolor: surfaceColor || "default",
                fontSize: "1rem",
            }}
            label={fcmStatus?.[label] ?? "N/A"}
            size="small"
        />
    );
};

export default FcmStatusBadge;
