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

export default function DocumentFileStatusBadge({ status }) {
    const theme = useTheme();

    const updateStatus = status?.toLowerCase();

    const labels = {
        active: "Active",
        inactive: "InActive",
    };

    const colors = {
        active: theme.palette.success.main,
        inactive: theme.palette.error.main,
    };

    const surfaceColors = {
        active: theme.palette.surface.successSecond,
        inactive: theme.palette.surface.dangerSecond,
    };

    return (
        <Chip
            size="small"
            sx={{
                color: colors[updateStatus],
                bgcolor: surfaceColors[updateStatus],
            }}
            label={labels[updateStatus]}
        />
    );
}

DocumentFileStatusBadge.propTypes = {
    status: PropTypes.oneOf(["active", , "inactive"]).isRequired,
};
