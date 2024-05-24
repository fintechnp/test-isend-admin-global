import React from "react";
import Box from "@mui/material/Box";
import MuiPaper from "@mui/material/Paper";
import { styled, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Center from "App/components/Center/Center";
import Column from "App/components/Column/Column";
import ISendLogo from "App/components/Logo/ISendLogo";

const Paper = styled(MuiPaper)(({ theme }) => ({
    padding: "32px",
    borderRadius: "16px",
    maxWidth: "425px",
    zIndex: "100px",
    position: "relative",
}));

const Badge = styled(Box)(({ theme }) => ({
    background: theme.palette.primary.main,
    width: "70px",
    position: "absolute",
    marginLeft: "-32px",
    padding: "8px 16px",
    borderRadius: "0 16px 16px 0",
}));

export default function FormContainer({ children, title, disableBadge = false }) {
    return (
        <Center height="100svh">
            <Paper elevation={0} sx={{ zIndex: 999 }}>
                {!disableBadge && (
                    <Badge>
                        <Typography fontSize="0.75rem" lineHeight="1rem" fontWeight={600} font color="white">
                            Admin
                        </Typography>
                    </Badge>
                )}
                <Column gap="24px">
                    <Center>
                        <ISendLogo />
                    </Center>
                    {title && (
                        <Typography
                            fontSize="1.125rem"
                            lineHeight="1.75rem"
                            fontWeight={600}
                            color={alpha("#000000", 0.87)}
                        >
                            {title}
                        </Typography>
                    )}
                    {children}
                </Column>
            </Paper>
        </Center>
    );
}
