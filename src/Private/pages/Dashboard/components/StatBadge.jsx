import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import IncreaseIcon from "App/components/Icon/IncreaseIcon";
import DecreaseIcon from "App/components/Icon/DecreaseIcon";

export default function StatBadge({ label, circuitType, sx }) {
    const theme = useTheme();

    const bgColors = {
        positive: theme.palette.surface.successSecond,
        negative: theme.palette.surface.dangerSecond,
        neutral: theme.palette.grey[200],
    };

    const textColors = {
        positive: theme.palette.success.main,
        negative: theme.palette.error.main,
        neutral: theme.palette.grey[800],
    };

    return (
        <Box
            sx={{
                height: "20px",
                background: bgColors[circuitType],
                color: textColors[circuitType],
                borderRadius: "16px",
                padding: "2px 8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                ...sx,
            }}
        >
            {circuitType === "positive" && <IncreaseIcon />}
            {circuitType === "negative" && <DecreaseIcon />}
            <div>{label}</div>
        </Box>
    );
}

StatBadge.propTypes = {
    label: PropTypes.string.isRequired,
    circuitType: PropTypes.oneOfType(["positive", "negative", "neutral"]),
};
