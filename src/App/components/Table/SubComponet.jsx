import React from "react";
import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import LockResetIcon from "@mui/icons-material/LockReset";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography, Box, Grid, Tooltip } from "@mui/material";

import Delete from "./../Dialog/Delete";
import { FormatDate, ReferenceName, CountryName, CurrencyName, FormatNumber } from "../../helpers";

const ExtendedContainer = styled(Box)(({ theme }) => ({
    margin: "1rem",
    borderRadius: "8px",
    background: theme.palette.background.light,
}));

const ContentContainer = styled(Box)(({ theme }) => ({
    padding: "1rem",
}));

const EachRenderValue = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    const RenderData = (sub_data, col) => {
        switch (col.type) {
            case "boolean":
                if (sub_data[col.key]) {
                    return <CheckCircleIcon color="success" fontSize="small" />;
                } else {
                    return <CancelIcon color="warning" fontSize="small" />;
                }
            case "reference":
                return ReferenceName(col.ref_value, sub_data[col.key]);
            case "country":
                return CountryName(sub_data[col.key]);

            case "currency":
                return CurrencyName(sub_data[col.key]);
            case "number":
                return FormatNumber(sub_data[col.key]);
            case "date":
                return FormatDate(sub_data[col.key]);
            default:
                return sub_data[col.key];
        }
    };

    return (
        <Collapse in={checked} timeout={500}>
            <ExtendedContainer>
                <ContentContainer>
                    <Box>
                        <Typography sx={{ color: "primary.dark", fontSize: "18px" }}>{title}</Typography>
                    </Box>
                    <Grid container spacing={1} sx={{ paddingBottom: "8px" }}>
                        {sub_columns &&
                            sub_columns.map((col, index) => {
                                return (
                                    <Grid item xs={6} md={4} key={index}>
                                        <EachRenderValue>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                {col.name}:
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    opacity: 0.8,
                                                    fontSize: "14px",
                                                    lineHeight: 1.2,
                                                    wordBreak: "break-word",
                                                    paddingLeft: "8px",
                                                }}
                                            >
                                                {col.type === "boolean"
                                                    ? RenderData(sub_data, col)
                                                    : sub_data[col.key]
                                                      ? RenderData(sub_data, col)
                                                      : "N/A"}
                                            </Typography>
                                        </EachRenderValue>
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
                                onClick={() => handleForgotPassword(sub_data?.email)}
                                endIcon={<LockResetIcon />}
                            >
                                Reset Password
                            </CloseButton>
                        </Tooltip>
                    )}
                    {handleDelete && (
                        <Delete id={sub_data?.tid} button={true} tooltext="Delete" handleDelete={handleDelete} />
                    )}
                </Box>
            </ExtendedContainer>
        </Collapse>
    );
}

export default React.memo(SubComponent);
