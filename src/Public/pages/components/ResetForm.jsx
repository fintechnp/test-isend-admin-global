import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Field, Form, reduxForm } from "redux-form";

import Logo from "../../../assets/long-logo.svg";
import Validator from "../../../App/utils/validators";
import Loading from "../../../App/components/Loading";
import TextField from "../../../App/components/Fields/TextField";

const FORM_NAME = "reset_password_form";

const WrapperBox = styled(Box)(({ theme }) => ({
    minWidth: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // background: "linear-gradient(90deg, rgba(12,12,150,1) 16%, rgba(114,107,236,1) 50%, rgba(0,212,255,1) 100%)",
}));

const FormContainer = styled(Grid)(({ theme }) => ({
    padding: "16px 20px",
    paddingBottom: "30px",
    maxWidth: "300px",
    backgroundColor: "#fcfcfc",
    borderRadius: "6px",
    [theme.breakpoints.up("sm")]: {
        minWidth: "340px",
    },
    boxShadow: "10px 0px 8px 5px rgba(0, 0, 0, .1)",
    "&:hover": {
        boxShadow: "10px 0px 20px 5px rgba(0, 0, 0, .2)",
    },
    position: "relative",
    zIndex: 1,
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
    minWidth: "100px",
    color: "#fff",
    fontSize: "13px",
    borderRadius: "2px",
    textTransform: "capitalize",
    // background: "linear-gradient(45deg, #1761AE 30%, #21CBF3 90%)",
    // "&:hover": {
    //     background: "linear-gradient(45deg, #1761AE 30%, #091f99 90%)",
    // },
}));

const ResetForm = ({ handleSubmit, loading }) => {
    return (
        <WrapperBox>
            <Form onSubmit={handleSubmit} data-testid="login_form">
                <FormContainer container rowSpacing={1} direction="column">
                    <Grid item>
                        <LogoWrapper component="img" image={Logo} alt="isend logo" />
                    </Grid>
                    <Grid item>
                        <Typography
                            sx={{
                                fontWeight: 400,
                                fontSize: "15px",
                                opacity: 0.8,
                            }}
                        >
                            Reset Your Password
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Field
                            name="password"
                            label="Password"
                            type="password"
                            small={12}
                            component={TextField}
                            inputProps={{ "data-testid": "password" }}
                            validate={[Validator.maxLength20, Validator.minValue8]}
                        />
                    </Grid>
                    <Grid item>
                        <Field
                            name="confirm_password"
                            label="Confirm Password"
                            type="password"
                            small={12}
                            component={TextField}
                            inputProps={{ "data-testid": "confirm_password" }}
                            validate={[Validator.confirmValidator, Validator.minValue1]}
                        />
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item>
                                <Button variant="contained" type="submit">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Loading loading={loading} box={true} />
                </FormContainer>
            </Form>
        </WrapperBox>
    );
};

export default reduxForm({ form: FORM_NAME })(ResetForm);
