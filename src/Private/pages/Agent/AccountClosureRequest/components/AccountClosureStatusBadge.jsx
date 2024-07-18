import React from "react";
import Chip from "@mui/material/Chip";
import capitalize from "lodash/capitalize";

import { AccountClosureRequestStatus } from "../data/AccountClosureRequestStatus";

export default function AccountClosureStatusBadge({ status }) {
    const colors = {
        [AccountClosureRequestStatus.PENDING]: "secondary",
        [AccountClosureRequestStatus.ACCEPTED]: "success",
        [AccountClosureRequestStatus.REJECTED]: "error",
    };

    const getColor = () => colors?.[status?.toUpperCase()] ?? "secondary";

    return <Chip color={getColor()} label={capitalize(status)} size="small" />;
}
