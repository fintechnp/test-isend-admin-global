import React from "react";
import Chip from "@mui/material/Chip";
import capitalize from "lodash/capitalize";

import { ZaiBalanceStatus } from "../data/Status";

export default function ZaiBalanceStatusBadge({ status }) {
    const getColor = () => {
        switch (status) {
            case ZaiBalanceStatus.Active:
                return "success";
            case ZaiBalanceStatus.InActive:
                return "error";

            default:
                return "default";
        }
    };

    return <Chip color={getColor()} label={capitalize(status)} variant="filled" size="small" />;
}
