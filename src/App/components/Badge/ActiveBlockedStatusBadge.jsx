import PropTypes from "prop-types";
import MuiChip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

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
    },
}));

export default function ActiveBlockedStatusBadge({ status }) {
    const theme = useTheme();

    const labels = {
        active: "Active",
        blocked: "Blocked",
    };

    const colors = {
        active: theme.palette.success.main,
        blocked: theme.palette.error.main,
    };

    const surfaceColors = {
        active: theme.palette.surface.successSecond,
        blocked: theme.palette.surface.dangerSecond,
    };

    return (
        <Chip
            size="small"
            sx={{
                color: colors[status],
                bgcolor: surfaceColors[status],
            }}
            label={labels[status]}
        />
    );
}

ActiveBlockedStatusBadge.propTypes = {
    status: PropTypes.oneOf(["active", "blocked"]).isRequired,
};
