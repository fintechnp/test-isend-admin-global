import React from "react";
import Chip from "@mui/material/Chip";

export default function KycStatusBadge({ status, label }) {
    const colors = {
        0: "primary",
        1: "warning",
        2: "success",
        3: "error",
        4: "error",
        5: "primary",
        6: "error",
        "": null,
    };

    const color = colors[status];

    return <Chip color={color || "default"} label={label ?? "N/A"} size="medium" />;
}
