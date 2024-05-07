import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";

const ImageWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "250px",
    minHeight: "200px",
    marginTop: "12px",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid gray",
    borderRadius: "4px",
    borderColor: "rgba(0, 0, 0, 0.23)",
    [theme.breakpoints.down("md")]: {
        minHeight: "150px",
    },
    "& .MuiCardMedia-root": {
        width: "auto",
        height: "100%",
        objectFit: "cover",
    },
}));

const ImagePreview = ({ imagefile }) => (
    <ImageWrapper>
        <CardMedia
            component="img"
            height="140"
            sx={{ maxWidth: "100%" }}
            image={URL.createObjectURL(imagefile[0])}
            alt="doc img"
        />
    </ImageWrapper>
);

export default ImagePreview;
