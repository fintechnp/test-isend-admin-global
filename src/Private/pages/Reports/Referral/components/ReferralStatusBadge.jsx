import React from "react";
import Chip from "@mui/material/Chip";
import capitalize from "lodash/capitalize";

import isEmpty from "App/helpers/isEmpty";

import { referralReportStatus } from "../data/referralReportStatus";

export default function ReferralStatusBadge({ status }) {
    const colors = {
        C: "success",
        N: "error",
        "": null,
    };

    const color = colors[status?.toUpperCase() || ""];

    const label = isEmpty(status) ? "N/A" : capitalize(referralReportStatus[status?.toUpperCase()] || status);

    return <Chip color={color || "default"} label={label} size="medium" />;
}
