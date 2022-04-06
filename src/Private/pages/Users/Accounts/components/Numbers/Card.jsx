import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import LinearProgress, {
    linearProgressClasses,
} from "@mui/material/LinearProgress";
import React from "react";

const CardWapper = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    border: `1px solid ${theme.palette.border.light}`,
}));

const CardName = styled(Typography)(({ theme }) => ({
    fontSize: "18px",
    fontWeight: 500,
    color: theme.palette.secondary.contrastText,
}));

const BottomWraper = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
}));

const TotalNumber = styled(Typography)(({ theme }) => ({
    opacity: 0.6,
    fontWeight: 600,
    fontSize: "16px",
    textAlign: "right",
    color: theme.palette.secondary.contrastText,
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme, color }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: `theme.palette.${color}.main`,
    },
}));

function Card({ name, total, number, color }) {
    return (
        <CardWapper>
            <CardName>{name}</CardName>
            <BottomWraper>
                <TotalNumber>
                    <Typography
                        component="span"
                        sx={{ opacity: 0.7, fontSize: "15px", fontWeight: 500 }}
                    >
                        {number}
                    </Typography>{" "}
                    / {total}
                </TotalNumber>
                <BorderLinearProgress
                    variant="determinate"
                    value={number}
                    color={color}
                />
            </BottomWraper>
        </CardWapper>
    );
}

export default Card;
