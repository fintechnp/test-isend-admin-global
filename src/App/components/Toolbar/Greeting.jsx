import React from "react";
import { styled, keyframes } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import HandIcon from "../Icon/HandIcon";
import getGreeting from "App/helpers/getGreeting";

const waveAnimation = keyframes`
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
`;

const Wrapper = styled("div")(({ theme }) => ({
    display: "flex",
    gap: "8px",
    svg: {
        width: "18px",
        height: "18px",
        animation: `${waveAnimation} 2s infinite`,
        transformOrigin: "bottom center",
    },
}));

export default function Greeting() {
    return (
        <Wrapper>
            <Typography color="text.primary" lineHeight="20px" fontWeight={600}>
                {getGreeting()}
            </Typography>
            <HandIcon />
        </Wrapper>
    );
}
