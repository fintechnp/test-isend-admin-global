import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import React from "react";

import AddMenu from "../AddMenu";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

function Header() {
    return (
        <HeaderWrapper>
            <Typography sx={{ fontSize: "22px" }}>Menu List</Typography>
            <AddMenu update={false} />
        </HeaderWrapper>
    );
}

export default Header;
