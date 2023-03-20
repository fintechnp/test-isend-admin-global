import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

const Container = styled(Grid)(({ theme }) => ({
    maxWidth: "900px",
    borderRadius: "5px",
    [theme.breakpoints.up("sm")]: {
        minWidth: "350px",
    },
}));

export default function ModalGridFormContainer({ children }) {
    return (
        <Container container columnSpacing={2} rowSpacing={1}>
            {children}
        </Container>
    );
}
