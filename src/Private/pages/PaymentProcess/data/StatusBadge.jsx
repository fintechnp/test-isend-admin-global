import React from "react";
import { Status } from "./Status";
import Chip from "@mui/material/Chip";
import capitalize from "lodash/capitalize";

export default function StatusBadge({ status }) {
    const colors = {
        [Status.W]: "secondary",
        [Status.I]: "primary",
        [Status.B]: "error",
        [Status.P]: "warning",
        [Status.C]: "success",
        [Status.F]: "error",
        [Status.R]: "error",
        [Status.E]: "error",
        "": null,
    };

    const color = colors[status];

    const label = status === "" ? "N/A" : capitalize(status);

    return <Chip color={color || "default"} label={label} size="medium" />;
}
