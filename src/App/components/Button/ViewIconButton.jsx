import React from "react";
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function ViewIconButton({ tooltipTitle, onClick, sx, ...rest }) {
    return (
        <Tooltip title={tooltipTitle ?? "View"} arrow>
            <IconButton onClick={onClick} size="small" {...rest}>
                <VisibilityIcon
                    sx={{
                        color: "warning.main",
                        "&:hover": {
                            background: "transparent",
                        },
                    }}
                />
            </IconButton>
        </Tooltip>
    );
}

ViewIconButton.propTypes = {
    tooltipTitle: PropTypes.string,
    onClick: PropTypes.func,
};
