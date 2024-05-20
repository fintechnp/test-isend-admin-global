import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import React from "react";

import AddReference from "../AddReference";
import AddReferenceData from "../AddReferenceData";
import HasPermission from "Private/components/shared/HasPermission";

import { permissions } from "Private/data/permissions";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

function Header({ title, type, id, name }) {
    return (
        <HeaderWrapper>
            <Typography sx={{ fontSize: "22px" }}>
                {title} {name && `of ${name}`}
            </Typography>
            {type ? (
                <HasPermission permission={permissions.CREATE_REFERENCE_TYPE}>
                    <AddReference update={false} />
                </HasPermission>
            ) : (
                <HasPermission permission={permissions.CREATE_REFERENCE_DATA}>
                    <AddReferenceData update={false} id={id} />
                </HasPermission>
            )}
        </HeaderWrapper>
    );
}

export default React.memo(Header);
