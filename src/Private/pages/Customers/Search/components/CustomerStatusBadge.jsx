import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";

export default function CustomerStatusBadge({ status }) {
    const theme = useTheme();

    const data = {
        active: {
            label: "Active",
            styles: {
                backgroundColor: theme.palette.surface.successSecond,
                color: theme.palette.success.main,
            },
        },
        blocked: {
            label: "Blocked",
            styles: {
                backgroundColor: theme.palette.surface.dangerSecond,
                color: theme.palette.error.main,
            },
        },
    };

    return (
        <Chip
            size="small"
            sx={{
                fontWeight: 500,
                ...data[status].styles,
            }}
            label={data[status].label}
        />
    );
}

CustomerStatusBadge.propTypes = {
    status: PropTypes.oneOf(["active", "blocked"]).isRequired,
};
