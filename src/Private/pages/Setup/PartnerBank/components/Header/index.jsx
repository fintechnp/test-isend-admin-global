import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import React from "react";

import AddPartnerBank from "../AddPartnerBank";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

function Header({ handleCloseDialog }) {
    return (
        <HeaderWrapper>
            <Typography sx={{ fontSize: "22px" }}>Partner Banks</Typography>
            <AddPartnerBank
                update={false}
                handleCloseDialog={handleCloseDialog}
            />
        </HeaderWrapper>
    );
}

export default React.memo(Header);
