import React from "react";
import { styled } from "@mui/system";
import MuiPaper from "@mui/material/Paper";
import MuiButton from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import { Field, Form, reduxForm } from "redux-form";

import TextField from "../../../App/components/Fields/TextField";
import Validator from "../../../App/utils/validators";
import Loading from "../../../App/components/Loading";

const FORM_NAME = "login_form";

const Paper = styled(MuiPaper)(({ theme }) => ({
    minWidth: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
        "linear-gradient(90deg, rgba(12,12,150,1) 16%, rgba(114,107,236,1) 50%, rgba(0,212,255,1) 100%)",
}));

const FormContainer = styled(Grid)(({ theme }) => ({
    padding: "16px",
    paddingBottom: "30px",
    maxWidth: "300px",
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

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    fontSize: "30px",
    textAlign: "center",
    color: "#071170",
}));

const Button = styled(MuiButton)(({ theme }) => ({
    marginTop: "10px",
    minWidth: "100px",
    color: "#fff",
    fontSize: "13px",
    borderRadius: "2px",
    textTransform: "capitalize",
    background: "linear-gradient(45deg, #1761AE 30%, #21CBF3 90%)",
    "&:hover": {
        background: "linear-gradient(45deg, #1761AE 30%, #091f99 90%)",
    },
}));

const LoginForm = ({ handleSubmit, loading }) => {
    return (
        <Paper square={true}>
            <Form onSubmit={handleSubmit} data-testid="login_form">
                <FormContainer container spacing={1} direction="column">
                    <Grid item>
                        <Title component="h6">iSend Global</Title>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ fontWeight: 400, fontSize: "15px" }}>
                            Sign In to your account
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Field
                            name="email"
                            label="E-mail"
                            type="email"
                            small={12}
                            component={TextField}
                            inputProps={{ "data-testid": "email" }}
                            validate={[
                                Validator.emailValidator,
                                Validator.minValue1,
                            ]}
                        />
                    </Grid>
                    <Grid item>
                        <Field
                            name="password"
                            label="Password"
                            type="password"
                            small={12}
                            component={TextField}
                            inputProps={{ "data-testid": "password" }}
                            validate={[
                                Validator.passwordValidator,
                                Validator.minValue1,
                            ]}
                        />
                    </Grid>
                    <Grid item>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Button
                                    data-testid="login_button"
                                    variant="contained"
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Loading loading={loading} box={true} />
                </FormContainer>
            </Form>
        </Paper>
    );
};

export default reduxForm({ form: FORM_NAME })(LoginForm);
