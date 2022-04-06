import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import React from "react";

import AddReference from "../AddReference";
import AddReferenceData from "../AddReferenceData";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

function Header({ title, type, id }) {
    return (
        <HeaderWrapper>
            <Typography sx={{ fontSize: "22px" }}>{title}</Typography>
            {type ? (
                <AddReference update={false} />
            ) : (
                <AddReferenceData update={false} id={id}/>
            )}
        </HeaderWrapper>
    );
}

export default React.memo(Header);
