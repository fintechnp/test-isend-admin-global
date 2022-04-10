import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import React from "react";

import AddPayoutLocation from "../AddPayoutLocation";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

function Header() {
    return (
        <HeaderWrapper>
            <Typography sx={{ fontSize: "22px" }}>Payout Location</Typography>
            <AddPayoutLocation update={false} />
        </HeaderWrapper>
    );
}

export default React.memo(Header);
