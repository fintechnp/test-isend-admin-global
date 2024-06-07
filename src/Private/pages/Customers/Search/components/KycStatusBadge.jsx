import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
import capitalize from "lodash/capitalize";
import { alpha, useTheme } from "@mui/material/styles";

export default function KycStatusBadge({ status, label }) {
    const theme = useTheme();

    const colors = {
        R: theme.palette.error.main,
        P: theme.palette.warning.main,
        N: "#848581",
        C: theme.palette.success.main,
        I: '#00B1FF',
        E: "#117308",
    };

    const getColor = () => {
        return colors?.[status?.toUpperCase()] ?? "#1a4b87";
    };

    return (
        <Chip
            size="small"
            sx={{
                fontWeight: 500,
                backgroundColor: alpha(getColor(), 0.08),
                color: getColor(),
            }}
            label={capitalize(label?.toLowerCase() ?? "")}
        />
    );
}

KycStatusBadge.propTypes = {
    status: PropTypes.string.isRequired,
};
