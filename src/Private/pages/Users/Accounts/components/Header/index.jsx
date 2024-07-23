import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import AddAccount from "../AddAccount";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
}));

function Header() {
    return <HeaderWrapper></HeaderWrapper>;
}

export default Header;
