import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import React from "react";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

function Header({ title }) {
    return (
        <HeaderWrapper>
            <Typography sx={{ fontSize: "22px" }}>{title}</Typography>
        </HeaderWrapper>
    );
}

export default React.memo(Header);
