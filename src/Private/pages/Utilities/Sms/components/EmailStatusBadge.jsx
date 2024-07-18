import PropTypes from "prop-types";
import MuiChip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { emailStatus } from "../data/emailStatus";

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

export default function EmailStatusBadge({ status }) {
    const theme = useTheme();

    const labels = {
        [emailStatus.CREATED]: "Created",
        [emailStatus.SENT]: "Sent",
        [emailStatus.FAILED]: "Failed",
        [emailStatus.REJECTED]: "Rejected",
        [emailStatus.PROCESSING]: "Processing",
        [emailStatus.EXCEPTION]: "Exception",
    };

    const colors = {
        [emailStatus.CREATED]: theme.palette.primary.main,
        [emailStatus.SENT]: theme.palette.success.main,
        [emailStatus.FAILED]: theme.palette.error.main,
        [emailStatus.REJECTED]: theme.palette.warning.main,
        [emailStatus.PROCESSING]: theme.palette.secondary.main,
        [emailStatus.EXCEPTION]: theme.palette.warning.main,
    };

    const surfaceColors = {
        [emailStatus.CREATED]: theme.palette.surface.primarySecond,
        [emailStatus.SENT]: theme.palette.surface.successSecond,
        [emailStatus.FAILED]: theme.palette.surface.dangerSecond,
        [emailStatus.REJECTED]: theme.palette.surface.warningSecond,
        [emailStatus.PROCESSING]: theme.palette.surface.secondarySecond,
        [emailStatus.EXCEPTION]: theme.palette.surface.warningSecond,
    };

    return (
        <Chip
            size="small"
            sx={{
                color: colors[status?.toUpperCase()],
                bgcolor: surfaceColors[status?.toUpperCase()],
            }}
            label={labels[status?.toUpperCase()] ?? status}
        />
    );
}

EmailStatusBadge.propTypes = {
    status: PropTypes.oneOf([
        emailStatus.CREATED,
        emailStatus.SENT,
        emailStatus.FAILED,
        emailStatus.REJECTED,
        emailStatus.PROCESSING,
        emailStatus.EXCEPTION,
    ]).isRequired,
};
