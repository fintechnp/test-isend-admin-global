import React from "react";
import { styled } from "@mui/material/styles";
import { FieldArray } from "redux-form";
import Grid from "@mui/material/Grid";
import MuiCard from "@mui/material/Card";
import MuiCardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MuiDivider from "@mui/material/Divider";

import Check from "./../Form";

const Container = styled(Grid)(({ theme }) => ({
    paddingTop: "10px",
    "& .MuiGrid-root>.MuiGrid-item": {
        paddingTop: "2px",
    },
}));

const Card = styled(MuiCard)(({ theme }) => ({
    // margin: 0,
    width: "100%",
    border: "none",
    boxShadow: "none",
    "& .MuiCardContent-root": {
        padding: "0px 8px",
    },
    "& .MuiCardContent-root:last-child": {
        paddingBottom: "8px",
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

const PermissionCard = ({ fields, meta }) => {
    return (
        <>
            <Container container spacing={1}>
                {fields.map((member, index) => (
                    <Grid item key={index} xs={12} sm={4} md={3}>
                        <Card key={index}>
                            <CardContent>
                                <Header>{fields.get(index)?.name}</Header>
                                <Divider light />
                                <FieldArray
                                    name={`${member}.sub_menu`}
                                    component={Check}
                                    ind={index}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Container>
        </>
    );
};

export default PermissionCard;
