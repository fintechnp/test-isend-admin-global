import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import PoweredBy from "Public/components/PoweredBy/PoweredBy";

import "./wave-animation.css";

const Wrapper = styled(Box)(({ theme }) => ({
    background: theme.palette.surface[1],
    height: "100svh",
    width: "100svw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const Container = styled(Box)(({ theme }) => ({
    height: "100svh",
    position: "relative",
    margin: "0.4rem",
}));

export default function PublicLayoutContainer({ children, disablePoweredBy = true }) {
    return (
        <Wrapper>
            <Container>
                {children}
                {!disablePoweredBy && <PoweredBy />}
            </Container>
            <div className="wave-animation-container">
                <div className="wave -one"> </div>
                <div className="wave -two"></div>
                <div className="wave -three"></div>
            </div>
        </Wrapper>
    );
}
