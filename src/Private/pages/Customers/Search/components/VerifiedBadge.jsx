import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckMarkIcon from "App/components/Icon/CheckMarkIcon";

export default function VerifiedBadge({ isVerified, size }) {
    return (
        <Box>
            {isVerified ? (
                <CheckMarkIcon fontSize={size} color="success" />
            ) : (
                <CancelIcon fontSize={size} color="error" />
            )}
        </Box>
    );
}

VerifiedBadge.propTypes = {
    isVerified: PropTypes.bool,
    size: PropTypes.oneOf(["inherit", "large", "medium", "small"]),
};

VerifiedBadge.defaultProps = {
    isVerified: false,
    size: "small",
};
