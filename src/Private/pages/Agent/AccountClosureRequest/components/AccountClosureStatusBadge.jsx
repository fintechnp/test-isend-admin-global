import React from "react";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/styles";
import capitalize from "lodash/capitalize";

import { AccountClosureRequestStatus } from "../data/AccountClosureRequestStatus";

export default function AccountClosureStatusBadge({ status }) {
    const theme = useTheme();

    const colors = {
        [AccountClosureRequestStatus.PENDING]: theme.palette.warning.main,
        [AccountClosureRequestStatus.ACCEPTED]: theme.palette.success.main,
        [AccountClosureRequestStatus.REJECTED]: theme.palette.error.main,
    };

    const surfaceColors = {
        [AccountClosureRequestStatus.ACCEPTED]: theme.palette.surface.successSecond,
        [AccountClosureRequestStatus.PENDING]: theme.palette.surface.warningSecond,
        [AccountClosureRequestStatus.REJECTED]: theme.palette.surface.dangerSecond,
    };

    const getColor = () => colors?.[status?.toUpperCase()] ?? "secondary";

    return (
        <Chip
            sx={{ color: getColor(), bgcolor: surfaceColors?.[status?.toUpperCase()], fontSize: "1rem" }}
            label={capitalize(status)}
            size="small"
        />
    );
}
