import PropTypes from "prop-types";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function VerifiedBadge({ isVerified, size, sx }) {
    return (
        <>
            {isVerified ? (
                <CheckCircleIcon fontSize={size} color="success" sx={sx} />
            ) : (
                <CancelIcon fontSize={size} color="error" sx={sx} />
            )}
        </>
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
