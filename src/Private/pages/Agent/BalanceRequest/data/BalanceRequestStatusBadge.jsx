import React from "react";
import Chip from "@mui/material/Chip";

export default function BalanceRequestStatusBadge({ status }) {
    const colors = {
        Pending: "warning",
        Approved: "success",
        Rejected: "error",
        "": null,
    };

    const color = colors[status];

    return <Chip color={color || "default"} label={status ?? "N/A"} size="medium" />;
}
