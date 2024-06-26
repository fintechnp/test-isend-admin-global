import React from "react";
import PropTypes from "prop-types";
import MuiChip from "@mui/material/Chip";
import capitalize from "lodash/capitalize";
import { alpha, useTheme, styled } from "@mui/material/styles";

import Row from "App/components/Row/Row";

import { individualStakeholderStatus } from "../data/stakeholderStatus";

const Chip = styled(MuiChip)(() => ({
    height: "25px",
    "& .MuiChip-label": {
        fontSize: "1rem",
        "& .MuiBox-root": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "4px",
        },
        svg: {
            height: "16px",
            width: "16px",
        },
    },
}));

export default function IndividualStakeholderStatusBadge({ statusId, label }) {
    const theme = useTheme();

    const colors = {
        [individualStakeholderStatus.PROFILE_INCOMPLETE]: theme.palette.grey[800],
        [individualStakeholderStatus.APPROVED]: theme.palette.success.main,
        [individualStakeholderStatus.BLOCKED]: theme.palette.error.main,
        [individualStakeholderStatus.REJECTED]: theme.palette.error.main,
        [individualStakeholderStatus.SANCTIONED]: theme.palette.error.main,
        [individualStakeholderStatus.PENDING]: theme.palette.warning.main,
    };

    const getColor = () => {
        return colors?.[statusId] ?? theme.palette.primary.main;
    };

    return (
        <Chip
            size="small"
            sx={{
                backgroundColor: alpha(getColor(), 0.1),
                color: getColor(),
            }}
            label={<Row>{capitalize(label?.toLowerCase() ?? "")}</Row>}
        />
    );
}

IndividualStakeholderStatusBadge.propTypes = {
    statusId: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
};
