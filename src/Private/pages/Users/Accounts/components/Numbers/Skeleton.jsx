import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import React from "react";

const CardWapper = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    "&:hover": {
        background: theme.palette.background.light,
    },
    border: `1px solid ${theme.palette.border.light}`,
}));

const BottomWraper = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
}));

function CardSkeleton() {
    return (
        <CardWapper>
            <Skeleton sx={{ width: "100%" }} />
            <BottomWraper>
                <Skeleton sx={{ width: "20%", alignSelf: "flex-end" }} />
                <Skeleton sx={{ width: "100%" }} />
            </BottomWraper>
        </CardWapper>
    );
}

export default CardSkeleton;
