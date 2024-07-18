import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import { inputBorderRadius } from "App/theme/theme";

export default function RefreshIconButton(props) {
    const Wrapper = props.disabled ? "div" : Tooltip;

    return (
        <Wrapper
            {...(!props.disabled
                ? {
                      arrow: true,
                      title: "Refresh",
                      placement: "top",
                  }
                : undefined)}
        >
            <IconButton
                {...props}
                sx={{
                    height: "38px",
                    ...props.sx,
                    border: (theme) => `1px solid ${theme.palette.grey[400]}`,
                    borderRadius: inputBorderRadius.outer,
                }}
            >
                <RefreshRoundedIcon />
            </IconButton>
        </Wrapper>
    );
}
