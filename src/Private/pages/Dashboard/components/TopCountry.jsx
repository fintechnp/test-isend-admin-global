import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const Wrapper = styled(Box)(({ theme }) => ({
    padding: "8px",

    border: "1px solid gray",
    borderRadius: "6px",
}));

const TopCountry = ({ name, number }) => {
    return (
        <Wrapper>
            {/* <Box>
                <Typography>{name}</Typography>
            </Box> */}
            <Typography>{name}</Typography>
            <Typography>Nepal</Typography>
            <Typography>India</Typography>
            <Typography>Korea</Typography>
            <Typography>Pakistan</Typography>
            <Typography>Turkey</Typography>
        </Wrapper>
    );
};

export default TopCountry;
