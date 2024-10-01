import React from "react";
import { styled } from "@mui/material/styles";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const PlaceholderWrapper = styled(Box)(({ theme, touched, error }) => ({
    width: "100%",
    minHeight: "200px",
    marginTop: "12px",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid gray",
    borderRadius: "4px",
    borderColor: error && touched ? `${theme.palette.warning.main}` : "rgba(0, 0, 0, 0.23)",
    [theme.breakpoints.down("md")]: {
        minHeight: "150px",
    },
}));

const UploadIcon = styled(CloudUploadOutlinedIcon)(({ theme }) => ({
    opacity: 0.7,
    color: "primary.main",
    fontSize: "50px",
}));

const Text = styled(Typography)(({ theme }) => ({
    fontSize: "16px",
}));

const Placeholder = ({ error, touched, text }) => (
    <PlaceholderWrapper error={error} touched={touched}>
        <UploadIcon />
        <Text>{text}</Text>
    </PlaceholderWrapper>
);

export default Placeholder;
