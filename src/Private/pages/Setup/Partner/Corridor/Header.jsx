import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import React from "react";

import AddCorridor from "./AddCorridor";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

function Header() {
    const { response: partner_data } = useSelector(
        (state) => state.get_partner_details
    );
    return (
        <HeaderWrapper>
            <Box>
                <Typography component="span" sx={{ fontSize: "22px" }}>
                    Corridor List of
                </Typography>
                <Typography
                    component="span"
                    sx={{
                        fontSize: "20px",
                        paddingLeft: "8px",
                        textTransform: "capitalize",
                    }}
                >
                    {partner_data?.data?.name}
                </Typography>
            </Box>
            <AddCorridor />
        </HeaderWrapper>
    );
}

export default React.memo(Header);
