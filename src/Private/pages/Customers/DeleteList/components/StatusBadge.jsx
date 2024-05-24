import React from "react";
import Chip from "@mui/material/Chip";
import capitalize from "lodash/capitalize";

import { DeleteAccountStatus } from "../data/DeleteAccountStatus";

export default function StatusBadge({ status }) {
    const getColor = () => {
        if (status === DeleteAccountStatus.PENDING) {
            return "secondary";
        }
        if (status === DeleteAccountStatus.APPROVED) {
            return "success";
        }
        if (status === DeleteAccountStatus.REJECTED) {
            return "error";
        }
    };

    return <Chip color={getColor()} label={capitalize(status)} size="small" />;
}
