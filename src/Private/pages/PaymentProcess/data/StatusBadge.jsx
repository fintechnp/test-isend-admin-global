import React from "react";
import Chip from "@mui/material/Chip";
import capitalize from "lodash/capitalize";

import isEmpty from "App/helpers/isEmpty";

import { Status } from "./Status";

export default function StatusBadge({ status }) {
    const colors = {
        W: "secondary",
        I: "primary",
        B: "error",
        P: "warning",
        C: "success",
        F: "error",
        R: "error",
        E: "error",
        "": null,
    };

    const color = colors[status.toUpperCase()];

    const label = isEmpty(status) ? "N/A" : capitalize(status);

    return <Chip color={color || "default"} label={Status?.[label] ?? "N/A"} size="medium" />;
}
