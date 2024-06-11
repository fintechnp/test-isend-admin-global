import React from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import CardMedia from "@mui/material/CardMedia";

import PropTypes from "prop-types";

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

const ImagePreview2 = ({ file, onRemove }) => {
    const [src, setSrc] = React.useState(null);

    React.useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, [file]);

    if (!file) {
        return null;
    }

    return (
        <div
            sx={{
                padding: "8px",
                marginTop: "12px",
            }}
        >
            <ImageWrapper>
                <CardMedia component="img" height="140" sx={{ maxWidth: "100%" }} image={src} alt="doc img" />
            </ImageWrapper>
        </div>
    );
};

ImagePreview2.propTypes = {
    file: PropTypes.instanceOf(File).isRequired,
};

export default ImagePreview2;
