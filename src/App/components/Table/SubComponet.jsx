import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box, Grid } from "@mui/material";
import MuiButton from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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

const ViewButton = styled(MuiButton)(({ theme }) => ({
    textTransform: "capitalize",
    padding: "5px 12px",
}));

const DeleteButton = styled(MuiButton)(({ theme }) => ({
    textTransform: "capitalize",
    padding: "4px 12px",
    boxShadow: "none",
    background: theme.palette.warning.main,
    "&:hover": {
        background: theme.palette.warning.dark,
    },
}));

function SubComponent({
    title,
    sub_data,
    index,
    handleDelete,
    sub_columns,
    toggleRowExpanded,
}) {
    return (
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
                <ViewButton
                    size="small"
                    variant="outlined"
                    onClick={() => toggleRowExpanded(index, false)}
                    endIcon={<CloseIcon />}
                >
                    Close
                </ViewButton>
                {handleDelete && (
                    <DeleteButton
                        size="small"
                        variant="contained"
                        onClick={() => handleDelete(sub_data?.id)}
                        endIcon={
                            <DeleteOutlineOutlinedIcon
                                sx={{ fontSize: "16px" }}
                            />
                        }
                    >
                        Delete
                    </DeleteButton>
                )}
            </Box>
        </ExtendedContainer>
    );
}

export default SubComponent;
