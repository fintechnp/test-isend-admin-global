import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet-async";

const NotFoundContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
    padding: theme.spacing(2),
}));

const StyledNumber = styled(Typography)(({ theme }) => ({
    paddingTop: "20px",
    fontSize: "60px",
    color: theme.palette.border.dark,
}));

const StyledText = styled(Typography)(({ theme }) => ({
    fontSize: "24px",
    color: theme.palette.border.dark,
}));

const PageNotFound = (props) => {
    return (
        <>
            <Helmet>
                <title>Isend Global Admin | {props.title}</title>
            </Helmet>
            <NotFoundContainer
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <StyledNumber>404</StyledNumber>
                </Grid>
                <Grid item xs={12}>
                    <StyledText>Page not found.</StyledText>
                </Grid>
            </NotFoundContainer>
        </>
    );
};

export default PageNotFound;
