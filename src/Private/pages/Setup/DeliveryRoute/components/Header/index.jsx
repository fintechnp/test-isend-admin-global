import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import React from "react";

import AddDeliveryRoute from "../AddDeliveryRoute";
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
            <Typography sx={{ fontSize: "22px" }}>Delivery Routes</Typography>
            <HasPermission permission={permissions.CREATE_DELIVERY_ROUTE}>
                <AddDeliveryRoute update={false} />
            </HasPermission>
        </HeaderWrapper>
    );
}

export default React.memo(Header);
