import React from "react";
import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import MuiCardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MuiDivider from "@mui/material/Divider";

import Form from "./../Form";

const Card = styled(MuiCard)(({ theme }) => ({
    // margin: 0,
    width: "100%",
    border: "none",
    boxShadow: "none",
    "& .MuiCardContent-root": {
        padding: "8px",
    },
    "& .MuiCardContent-root:last-child": {
        paddingBottom: "8px",
    },
    "& .MuiButtonBase-root.MuiCheckbox-root": {
        padding: "8px",
    },
}));

const CardContent = styled(MuiCardContent)(({ theme }) => ({
    margin: "0px",
    width: "100%",
    padding: "18px",
    backgroundColor: "#fff",
}));

const Header = styled(Typography)(({ theme }) => ({
    color: "#090269",
    fontSize: "18px",
    textTransform: "uppercase",
}));

const Divider = styled(MuiDivider)(({ theme }) => ({
    margin: "4px 0px",
}));

const PermissionCard = ({ data }) => {
    return (
        <>
            <Card>
                <CardContent>
                    <Header>{data?.name}</Header>
                    <Divider light />
                    <Form />
                </CardContent>
            </Card>
        </>
    );
};

export default PermissionCard;
