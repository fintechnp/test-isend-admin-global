import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import React from "react";

import AddPaymentRules from "../AddPaymentRules";
import HasPermission from "Private/components/shared/HasPermission";
import { permissions } from "Private/data/permissions";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

function Header() {
    return (
        <HeaderWrapper>
            <Typography sx={{ fontSize: "22px" }}>Payment Rules</Typography>
            <HasPermission permission={permissions.CREATE_PAYMENT_RULE}>
                <AddPaymentRules update={false} />
            </HasPermission>
        </HeaderWrapper>
    );
}

export default Header;
