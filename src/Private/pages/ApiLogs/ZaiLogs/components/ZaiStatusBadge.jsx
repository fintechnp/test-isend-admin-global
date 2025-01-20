import React from "react";
import Chip from "@mui/material/Chip";

export default function ZaiStatusBadge({ status, label }) {
    const colors = {
        V: "secondary",
        I: "primary",
        R: "warning",
        C: "success",
        "": null,
    };

    const color = colors[status.toUpperCase()];

    return <Chip color={color || "default"} label={label ?? "N/A"} size="medium" />;
}
