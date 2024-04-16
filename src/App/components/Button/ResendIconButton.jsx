import React from "react";
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { ReactComponent as Resend } from "assets/resend.svg";

export default function ResendIconButton({ tooltipTitle, onClick, sx, ...rest }) {
    return (
        <Tooltip title={tooltipTitle ?? "Resend"} arrow>
            <IconButton size="small" onClick={onClick} {...rest}>
                <Resend width={18} height={18} />
            </IconButton>
        </Tooltip>
    );
}

ResendIconButton.propTypes = {
    tooltipTitle: PropTypes.string,
    sx: PropTypes.object,
    onClick: PropTypes.func,
};
