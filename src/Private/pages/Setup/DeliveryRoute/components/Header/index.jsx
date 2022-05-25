import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import React from "react";

import AddDeliveryRoute from "../AddDeliveryRoute";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

function Header() {
    return (
        <HeaderWrapper>
            <Typography sx={{ fontSize: "22px" }}>Delivery Routes</Typography>
            <AddDeliveryRoute update={false} />
        </HeaderWrapper>
    );
}

export default React.memo(Header);
