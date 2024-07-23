import PropTypes from "prop-types";
import MuiChip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { smsStatus } from "../data/smsStatus";

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

export default function SmsStatusBadge({ status }) {
    const theme = useTheme();

    const labels = {
        [smsStatus.CREATED]: "Created",
        [smsStatus.SENT]: "Sent",
        [smsStatus.FAILED]: "Failed",
    };

    const colors = {
        [smsStatus.CREATED]: theme.palette.primary.main,
        [smsStatus.SENT]: theme.palette.success.main,
        [smsStatus.FAILED]: theme.palette.error.main,
    };

    const surfaceColors = {
        [smsStatus.CREATED]: theme.palette.surface.primarySecond,
        [smsStatus.SENT]: theme.palette.surface.successSecond,
        [smsStatus.FAILED]: theme.palette.surface.dangerSecond,
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

SmsStatusBadge.propTypes = {
    status: PropTypes.oneOf([smsStatus.CREATED, smsStatus.SENT]).isRequired,
};
