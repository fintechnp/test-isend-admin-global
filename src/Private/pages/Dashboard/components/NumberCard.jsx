import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Box, Typography } from "@mui/material";

const Wrapper = styled(Box)(({ theme }) => ({
    padding: "8px",
    border: "1px solid gray",
    borderRadius: "6px",
}));

const NumberCard = ({ topic, number }) => {
    return (
        <Wrapper>
            {/* <Typography>{topic}</Typography> */}
            <Typography>Total Transaction</Typography>
            <Typography>{number}</Typography>
            <Typography>{number}</Typography>
        </Wrapper>
    );
};

export default NumberCard;
