import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import React from "react";

import AddSubMenu from "../AddSubMenu";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

function Header() {
    return (
        <HeaderWrapper>
            <Typography sx={{ fontSize: "22px" }}>Sub Menu List</Typography>
            <AddSubMenu update={false} />
        </HeaderWrapper>
    );
}

export default Header;
