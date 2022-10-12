import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box, Grid, Tooltip } from "@mui/material";
import MuiButton from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import LockResetIcon from "@mui/icons-material/LockReset";

import Delete from "./../Dialog/Delete";

const ExtendedContainer = styled(Box)(({ theme }) => ({
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    background: theme.palette.background.light,
}));

const ContentContainer = styled(Box)(({ theme }) => ({
    padding: "8px 16px",
    borderTop: `1px dashed ${theme.palette.primary.light}`,
    borderBottom: `1px dashed ${theme.palette.primary.light}`,
}));

const CloseButton = styled(MuiButton)(({ theme }) => ({
    textTransform: "capitalize",
    padding: "5px 12px",
}));

function SubComponent({
    title,
    sub_data,
    index,
    checked,
    handleDelete,
    sub_columns,
    handleForgotPassword,
    toggleRowExpanded,
}) {
    return (
        <Collapse in={checked} timeout={500}>
            <ExtendedContainer>
                <ContentContainer>
                    <Box>
                        <Typography
                            sx={{ color: "primary.dark", fontSize: "18px" }}
                        >
                            {title}
                        </Typography>
                    </Box>
                    <Grid container spacing={1} sx={{ paddingBottom: "8px" }}>
                        {sub_columns &&
                            sub_columns.map((col, index) => {
                                if (col.key === "is_active") {
                                    return (
                                        <Grid item xs={6} md={4} key={index}>
                                            <Typography
                                                sx={{
                                                    opacity: 0.9,
                                                    fontSize: "16px",
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                {col.name}:
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    opacity: 0.6,
                                                    fontSize: "14px",
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                {sub_data[col.key]
                                                    ? "Active"
                                                    : "Inactive"}
                                            </Typography>
                                        </Grid>
                                    );
                                }
                                return (
                                    <Grid item xs={6} md={4} key={index}>
                                        <Typography
                                            sx={{
                                                opacity: 0.9,
                                                fontSize: "16px",
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            {col.name}:
                                        </Typography>
                                        <Typography
                                            sx={{
                                                opacity: 0.6,
                                                fontSize: "14px",
                                                lineHeight: 1.2,
                                                wordWrap: "break-word",
                                            }}
                                        >
                                            {sub_data[col.key]}
                                        </Typography>
                                    </Grid>
                                );
                            })}
                    </Grid>
                </ContentContainer>
                <Box
                    gap={2}
                    pt={1.5}
                    pr={1}
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    {handleDelete && (
                        <Tooltip title="Minimize" arrow>
                            <CloseButton
                                size="small"
                                variant="outlined"
                                onClick={() => toggleRowExpanded(index, false)}
                                endIcon={<CloseIcon />}
                            >
                                Close
                            </CloseButton>
                        </Tooltip>
                    )}
                    {handleForgotPassword && (
                        <Tooltip title="Reset Password" arrow>
                            <CloseButton
                                size="small"
                                variant="outlined"
                                onClick={() =>
                                    handleForgotPassword(sub_data?.email)
                                }
                                endIcon={<LockResetIcon />}
                            >
                                Reset Password
                            </CloseButton>
                        </Tooltip>
                    )}
                    {handleDelete && (
                        <Delete
                            id={sub_data?.tid}
                            button={true}
                            tooltext="Delete"
                            handleDelete={handleDelete}
                        />
                    )}
                </Box>
            </ExtendedContainer>
        </Collapse>
    );
}

export default SubComponent;
