import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import React from "react";

import AddPartnerBank from "../AddPartnerBank";
import HasPermission from "Private/components/shared/HasPermission";
import { permissions } from "Private/data/permissions";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

function Header({ handleCloseDialog }) {
    return (
        <HeaderWrapper>
            <Typography sx={{ fontSize: "22px" }}>Partner Banks</Typography>
            <HasPermission permission={permissions.CREATE_PARTNER_BANK}>
                <AddPartnerBank update={false} handleCloseDialog={handleCloseDialog} />
            </HasPermission>
        </HeaderWrapper>
    );
}

export default React.memo(Header);
