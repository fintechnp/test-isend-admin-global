import React from "react";
import { styled } from "@mui/material/styles";

import MuiTypography from "@mui/material/Typography";
import { Link as ReactRouterDomLink } from "react-router-dom";

const Typography = styled(MuiTypography)(({ theme }) => ({
    color: theme.palette.primary.main,
    a: {
        color: theme.palette.primary.main,
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
    },
}));

export default function Link({ to, children, sx }) {
    return (
        <Typography sx={sx}>
            <ReactRouterDomLink to={to}>{children}</ReactRouterDomLink>
        </Typography>
    );
}
