import React from "react";
import { styled } from "@mui/material/styles";
import { Field, Form, reduxForm } from "redux-form";
import { Grid, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";

import TextField from "../../../../../App/components/Fields/TextField";
import Validator from "../../../../../App/utils/validators";

const Container = styled(Grid)(({ theme }) => ({
    maxWidth: "900px",
    borderRadius: "5px",
    [theme.breakpoints.up("sm")]: {
        minWidth: "350px",
    },
}));

const FormWrapper = styled(Grid)(({ theme }) => ({
    padding: "6px 0px 16px",
    backgroundColor: theme.palette.background.light,
}));

const FieldWrapper = styled(Grid)(({ theme }) => ({
    padding: "1px 16px",
}));

const ButtonWrapper = styled(Grid)(({ theme }) => ({
    paddingTop: "12px",
}));

const CancelButton = styled(Button)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    textTransform: "capitalize",
    background: theme.palette.warning.main,
    "&:hover": {
        background: theme.palette.warning.dark,
    },
}));

const CreateButton = styled(LoadingButton)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    textTransform: "capitalize",
    background: theme.palette.primary.main,
    "&:hover": {
        background: theme.palette.primary.dark,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

const EmailForm = ({ handleSubmit, loading, handleClose }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Container container direction="column">
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="email_by"
                                label="Email By"
                                type="text"
                                small={12}
                                component={TextField}
                                inputProps={{
                                    autoComplete: "new-password",
                                }}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                    Validator.maxLength100,
                                ]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="email_to"
                                label="Email To"
                                type="text"
                                small={12}
                                component={TextField}
                                inputProps={{
                                    autoComplete: "new-password",
                                }}
                                validate={[
                                    Validator.emailValidator,
                                    Validator.minValue1,
                                    Validator.maxLength100,
                                ]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="email_subject"
                                label="Subject"
                                type="text"
                                small={12}
                                component={TextField}
                                inputProps={{
                                    autoComplete: "new-password",
                                }}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                    Validator.maxLength100,
                                ]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="email_body"
                                label="Body"
                                type="text"
                                small={12}
                                inputProps={{
                                    autoComplete: "new-password",
                                }}
                                component={TextField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                ]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="email_cc"
                                label="Cc"
                                type="text"
                                small={12}
                                component={TextField}
                                inputProps={{
                                    autoComplete: "new-password",
                                }}
                                validate={Validator.maxLength100}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="email_bcc"
                                label="Bcc"
                                type="text"
                                small={12}
                                component={TextField}
                                inputProps={{
                                    autoComplete: "new-password",
                                }}
                                validate={Validator.maxLength100}
                            />
                        </FieldWrapper>
                    </FormWrapper>
                </Grid>
                <Grid item>
                    <Divider sx={{ pt: 1.2 }} />
                </Grid>
                <Grid item>
                    <ButtonWrapper
                        container
                        columnGap={2}
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Grid item>
                            <CancelButton
                                size="small"
                                variant="contained"
                                onClick={handleClose}
                            >
                                Cancel
                            </CancelButton>
                        </Grid>
                        <Grid item>
                            <CreateButton
                                size="small"
                                variant="outlined"
                                loading={loading}
                                endIcon={<AddIcon />}
                                type="submit"
                            >
                                Create
                            </CreateButton>
                        </Grid>
                    </ButtonWrapper>
                </Grid>
            </Container>
        </Form>
    );
};

export default reduxForm({ form: "email_form" })(EmailForm);
