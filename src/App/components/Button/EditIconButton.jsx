import React from "react";
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function EditIconButton({ tooltipTitle, onClick, ...rest }) {
    return (
        <Tooltip title={tooltipTitle ?? "Edit"} arrow>
            <IconButton size="small" onClick={onClick} {...rest}>
                <EditOutlinedIcon
                    sx={{
                        "&:hover": {
                            background: "transparent",
                        },
                    }}
                />
            </IconButton>
        </Tooltip>
    );
}

EditIconButton.propTypes = {
    tooltipTitle: PropTypes.string,
    onClick: PropTypes.func,
};
