import React from "react";
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function DeleteIconButton({ tooltipTitle, onClick, sx, ...rest }) {
    return (
        <Tooltip title={tooltipTitle ?? "Edit"} arrow>
            <IconButton size="small" onClick={onClick} {...rest}>
                <DeleteOutlinedIcon
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

DeleteIconButton.propTypes = {
    tooltipTitle: PropTypes.string,
    sx: PropTypes.object,
    onClick: PropTypes.func,
};
