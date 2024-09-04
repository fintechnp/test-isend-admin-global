import React from "react";
import Chip from "@mui/material/Chip";
import capitalize from "lodash/capitalize";

import { ZaiPaymentStatus } from "../data/Status";

export default function StatusBadge({ status }) {
    const getColor = () => {
        switch (status) {
            case ZaiPaymentStatus["Payment Pending"]:
                return "secondary";
            case ZaiPaymentStatus.Created:
                return "success";
            case ZaiPaymentStatus.Processing:
                return "info";
            case ZaiPaymentStatus.Completed:
                return "primary";
            case ZaiPaymentStatus.Suspicious:
                return "warning";
            case ZaiPaymentStatus["Refunded/Rejected"]:
                return "error";
            case ZaiPaymentStatus.Blocked:
                return "error";
            case ZaiPaymentStatus.Exception:
                return "warning";
            default:
                return "default";
        }
    };

    return <Chip color={getColor()} label={capitalize(status)} size="small" />;
}
