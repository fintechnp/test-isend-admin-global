import React from "react";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/styles";
import capitalize from "lodash/capitalize";

import { DeleteAccountStatus } from "../data/DeleteAccountStatus";

export default function StatusBadge({ status }) {
    const theme = useTheme();

    const colors = {
        [DeleteAccountStatus.PENDING]: theme.palette.warning.main,
        [DeleteAccountStatus.APPROVED]: theme.palette.success.main,
        [DeleteAccountStatus.REJECTED]: theme.palette.error.main,
    };

    const surfaceColors = {
        [DeleteAccountStatus.APPROVED]: theme.palette.surface.successSecond,
        [DeleteAccountStatus.PENDING]: theme.palette.surface.warningSecond,
        [DeleteAccountStatus.REJECTED]: theme.palette.surface.dangerSecond,
    };

    return (
        <Chip sx={{ color: colors[status], bgcolor: surfaceColors[status] }} label={capitalize(status)} size="small" />
    );
}
