import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const Card = styled(MuiCard)(({ theme }) => ({
    boxShadow:
        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
}));

function ImageCard({ document }) {
    return (
        <Card sx={{ maxWidth: 320 }}>
            <CardMedia
                component="img"
                height="120"
                image={document}
                alt="document image"
            />
        </Card>
    );
}

export default React.memo(ImageCard);
