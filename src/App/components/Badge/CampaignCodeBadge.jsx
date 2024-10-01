import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const StyledTypography = styled(Typography)(({ theme }) => ({
    background: theme.palette.surface.primarySecond,
    color: theme.palette.primary.dark,
    borderRadius: "9.143rem",
    padding: "0.143rem 0.571rem",
    textAlign: "center",
    maxWidth: "6.429rem",
    fontWeight: 500,
}));

const CampaignCodeBadge = ({ code }) => {
    return <StyledTypography variant="body2">{code}</StyledTypography>;
};

export default CampaignCodeBadge;
