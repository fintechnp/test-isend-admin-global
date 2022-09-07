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
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                // image={document}
                image={`https://images.unsplash.com/photo-1635859890085-ec8cb5466806?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80`}
                alt="document image"
            />
        </Card>
    );
}

export default React.memo(ImageCard);
