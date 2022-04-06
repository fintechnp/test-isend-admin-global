import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import React from "react";

const CardWapper = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: `1px solid ${theme.palette.border.light}`,
}));

const CardName = styled(Typography)(({ theme }) => ({
    fontSize: "18px",
    fontWeight: 500,
}));

const TotalNumber = styled(Typography)(({ theme }) => ({
   fontWeight: 600,
       fontSize: "17px",
  textAlign: "center",
}));

function TotlalCard({ name, total }) {
    return (
        <CardWapper>
            <CardName>{name}</CardName>
            <TotalNumber>{total}</TotalNumber>
        </CardWapper>
    );
}

export default TotlalCard;
