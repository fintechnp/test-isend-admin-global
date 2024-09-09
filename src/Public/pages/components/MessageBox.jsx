import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

import Logo from "../../../assets/long-logo.svg";

const WrapperBox = styled(Box)(({ theme }) => ({
    minWidth: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // background: "linear-gradient(90deg, rgba(12,12,150,1) 16%, rgba(114,107,236,1) 50%, rgba(0,212,255,1) 100%)",
}));

const FormContainer = styled(Grid)(({ theme }) => ({
    padding: "16px",
    paddingBottom: "30px",
    maxWidth: "320px",
    backgroundColor: "#fcfcfc",
    borderRadius: "6px",
    [theme.breakpoints.up("sm")]: {
        minWidth: "320px",
    },
    boxShadow: "10px 0px 8px 5px rgba(0, 0, 0, .1)",
    "&:hover": {
        boxShadow: "10px 0px 20px 5px rgba(0, 0, 0, .2)",
    },
}));

const LogoWrapper = styled(CardMedia)(({ theme }) => ({
    minHeight: "108px",
    maxHeight: "108px",
    width: "100%",
    objectFit: "contain",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const Button = styled(MuiButton)(({ theme }) => ({
    marginTop: "10px",
    width: "100%",
    color: "#fff",
    fontSize: "13px",
    borderRadius: "2px",
    textTransform: "capitalize",
    // background: "linear-gradient(45deg, #1761AE 30%, #21CBF3 90%)",
    // "&:hover": {
    //     background: "linear-gradient(45deg, #1761AE 30%, #091f99 90%)",
    // },
}));

const MessageBox = ({ message }) => {
    const navigate = useNavigate();

    return (
        <WrapperBox>
            <FormContainer container rowSpacing={1} direction="column">
                <Grid item>
                    <LogoWrapper component="img" image={Logo} alt="isend logo" />
                </Grid>
                <Grid item>
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: "15px",
                            opacity: 0.9,
                        }}
                    >
                        {message}.
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item xs={12}>
                            <Button
                                disableRipple
                                disableElevation
                                data-testid="login_button"
                                variant="contained"
                                onClick={() => navigate("/")}
                            >
                                Back To Login
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </FormContainer>
        </WrapperBox>
    );
};

export default MessageBox;
