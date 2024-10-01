import { Box, Switch, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const Container = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
        paddingTop: "4px",
    },
    "& .MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked ": {
        color: "red",
    },
}));

const TitleContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
}));

const Title = styled(Typography)(({ theme }) => ({
    fontSize: "16px",
    fontWeight: 500,
}));

const Description = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    lineHeight: 1,
    fontSize: "12px",
    color: theme.palette.text.main,
}));

function SwitchBoxSettings({ title, description, checked, handleChange }) {
    return (
        <Container>
            <TitleContainer>
                <Title>{title}</Title>
                <Switch size="small" checked={checked} onChange={handleChange} />
            </TitleContainer>
            <Description>{description}</Description>
        </Container>
    );
}

export default SwitchBoxSettings;
