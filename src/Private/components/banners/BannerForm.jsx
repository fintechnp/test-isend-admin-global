import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Field, Form, reduxForm } from "redux-form";

import TextField from "App/components/Fields/TextField";
import CheckboxField from "App/components/Fields/CheckboxField";

import Validator from "App/utils/validators";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import Spacer from "App/components/Spacer/Spacer";

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

const StatusText = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    paddingTop: "6px",
    paddingBottom: "-6px",
}));

const ButtonWrapper = styled(Grid)(({ theme }) => ({
    paddingTop: "12px",
}));

const BannerForm = ({ handleSubmit, isAddMode, isProcessing, onCancel }) => {
    const dispatch = useDispatch();

    return (
        <Form onSubmit={handleSubmit}>
            <Container container direction="column" rowSpacing={4}>
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12}>
                            <Field
                                name="banner_name"
                                label="Banner Name"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.emptyValidator, Validator.minValue1]}
                            />
                        </FieldWrapper>
                        <Spacer />
                        <FieldWrapper item xs={12}>
                            <Field
                                name="link"
                                label="Mobile Banner URL"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.emptyValidator, Validator.urlValidator]}
                            />
                            <Spacer />
                            <Alert severity="info">Note: Image size must be 2:1 ratio.</Alert>
                        </FieldWrapper>
                        <Spacer />
                        <FieldWrapper item xs={12}>
                            <Field
                                name="weblink"
                                label="Web Banner URL"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.emptyValidator, Validator.urlValidator]}
                            />
                            <Spacer />
                            <Alert severity="info">Note: Image size must be 3:1 ratio.</Alert>
                        </FieldWrapper>
                        {!isAddMode && (
                            <FieldWrapper item xs={12} sm={6}>
                                <Grid container alignItems="flex-end" justifyContent="flex-end">
                                    <Grid item xs={12}>
                                        <StatusText component="p">Is Active ?</StatusText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name="is_active"
                                            label="Active"
                                            small={12}
                                            reverse="row-reverse"
                                            component={CheckboxField}
                                        />
                                    </Grid>
                                </Grid>
                            </FieldWrapper>
                        )}
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
                            <CancelButton onClick={onCancel}>Cancel</CancelButton>
                        </Grid>
                        <Grid item>
                            <SubmitButton isLoading={isProcessing} isAddMode={isAddMode} />
                        </Grid>
                    </ButtonWrapper>
                </Grid>
            </Container>
        </Form>
    );
};

export default React.memo(reduxForm({ form: ["form"] })(BannerForm));

BannerForm.propTypes = {
    isAddMode: PropTypes.bool,
    onCancel: PropTypes.func,
    isProcessing: PropTypes.bool,
};
