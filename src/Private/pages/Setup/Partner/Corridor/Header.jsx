import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

import AddCorridor from "./AddCorridor";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const AddButton = styled(Button)(({ theme }) => ({
    padding: "6px 12px",
    textTransform: "capitalize",
}));

function Header() {
    return (
        <HeaderWrapper>
            <Typography sx={{ fontSize: "22px" }}>Corridor List</Typography>
            <AddCorridor />
        </HeaderWrapper>
    );
}

export default React.memo(Header);
