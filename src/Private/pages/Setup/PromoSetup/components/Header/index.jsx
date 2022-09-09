import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import React from "react";

import AddPromoSetup from "../AddPromoSetup";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

function Header() {
    return (
        <HeaderWrapper>
            <Typography sx={{ fontSize: "22px" }}>Promo Setup</Typography>
            <AddPromoSetup update={false} />
        </HeaderWrapper>
    );
}

export default React.memo(Header);
