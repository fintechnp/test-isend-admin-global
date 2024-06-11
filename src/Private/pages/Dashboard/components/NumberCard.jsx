import React from "react";
import Box from '@mui/material/Box';
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
const Wrapper = styled(Box)(({ theme }) => ({
    padding: "8px",
    border: "1px solid gray",
    borderRadius: "6px",
}));

const NumberCard = ({ topic, number }) => {
    return (
        <Wrapper>
            <Typography>Total Transaction</Typography>
            <Typography>{number}</Typography>
            <Typography>{number}</Typography>
        </Wrapper>
    );
};

export default NumberCard;
