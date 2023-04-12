import React from "react";
import { styled } from "@mui/material/styles";
import { Field, Form, reduxForm } from "redux-form";
import { Grid, Button, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import moment from "moment";

import TextField from "../../../../../App/components/Fields/TextField";
import SelectField from "../../../../../App/components/Fields/SelectField";
import Validator from "../../../../../App/utils/validators";
import { useSelector } from "react-redux";

const Container = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
        minWidth: "350px",
    },
}));

const FormWrapper = styled(Grid)(({ theme }) => ({
    padding: "8px 4px 16px",
    borderRadius: "4px",
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

const BackButton = styled(Button)(({ theme }) => ({
    minWidth: "100px",
    borderRadius: "2px",
    textTransform: "capitalize",
    color: theme.palette.border.dark,
    borderColor: theme.palette.border.main,
    "&:hover": {
        borderColor: theme.palette.border.dark,
    },
}));

const NextButton = styled(Button)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    textTransform: "capitalize",
    background: theme.palette.primary.main,
    "&:hover": {
        background: theme.palette.primary.dark,
    },
}));

const IdentityForm = ({ handleSubmit, handleBack, activeStep, steps, buttonText, form: formName }) => {
    const state = useSelector((state) => state.form[formName].values);
    const isCountryUS = state.country === "USA";

    const country = JSON.parse(localStorage.getItem("country"));
    const reference = JSON.parse(localStorage.getItem("reference"));

    return (
        <Form onSubmit={handleSubmit}>
            <Container container direction="column">
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="date_of_birth"
                                label="Date of Birth"
                                type="date"
                                small={12}
                                component={TextField}
                                inputProps={{
                                    min: new Date("1920-01-01").toISOString().slice(0, 10),
                                    max: `${moment().subtract(18, "years").format("YYYY-MM-DD")}`,
                                }}
                                validate={[Validator.emptyValidator, Validator.minValue1]}
                            />
                        </FieldWrapper>
                        <FieldWrapper xs={12} sm={6}>
                            <Field
                                name="birth_country"
                                label="Birth Country"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[Validator.minValue3, Validator.maxLength3]}
                            >
                                <option value="" disabled>
                                    Select Birth Country
                                </option>
                                {country &&
                                    country.map((data) => (
                                        <option value={data.iso3} key={data.iso3}>
                                            {data.country}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="id_type"
                                label="ID Type"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[Validator.emptyValidator, Validator.maxLength50]}
                            >
                                <option value="" disabled>
                                    Select ID Type
                                </option>
                                {reference &&
                                    reference
                                        ?.filter((ref_data) => ref_data.reference_type === 2)[0]
                                        .reference_data.map((data, index) => (
                                            <option value={data.value} key={index}>
                                                {data.name}
                                            </option>
                                        ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="id_number"
                                label="ID Number"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.emptyValidator, Validator.minValue1, Validator.maxLength50]}
                            />
                        </FieldWrapper>
                        {isCountryUS && (
                            <FieldWrapper item xs={12} sm={6}>
                                <Field
                                    name="ssn_number"
                                    label="SSN Number"
                                    type="text"
                                    small={12}
                                    component={TextField}
                                    validate={[Validator.emptyValidator, Validator.minValue1, Validator.maxLength50]}
                                />
                            </FieldWrapper>
                        )}
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="id_issue_date"
                                label="Id Issue Date"
                                type="date"
                                small={12}
                                component={TextField}
                                inputProps={{
                                    min: new Date("1920-01-01").toISOString().slice(0, 10),
                                    max: new Date().toISOString().slice(0, 10),
                                }}
                                validate={Validator.emptyValidator}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="id_expiry_date"
                                label="Id Expiry Date"
                                type="date"
                                small={12}
                                component={TextField}
                                inputProps={{
                                    min: new Date().toISOString().slice(0, 10),
                                    max: new Date("2050-01-01").toISOString().slice(0, 10),
                                }}
                                validate={Validator.emptyValidator}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="id_issued_country"
                                label="Id Issued Country"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[Validator.emptyValidator, Validator.minValue1, Validator.maxLength3]}
                            >
                                <option value="" disabled>
                                    Select Issued Country
                                </option>
                                {country &&
                                    country.map((data) => (
                                        <option value={data.iso3} key={data.iso3}>
                                            {data.country}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="citizenship_country"
                                label="Citizenship Country"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[Validator.minValue3, Validator.maxLength3]}
                            >
                                <option value="" disabled>
                                    Select Citizenship Country
                                </option>
                                {country &&
                                    country.map((data) => (
                                        <option value={data.iso3} key={data.iso3}>
                                            {data.country}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                    </FormWrapper>
                </Grid>
                <Grid item>
                    <Divider sx={{ pt: 1.2 }} />
                </Grid>
                <Grid item>
                    <ButtonWrapper container columnGap={2} direction="row" alignItems="center">
                        <Grid item xs />
                        <Grid item>
                            <BackButton
                                size="small"
                                variant="outlined"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                            >
                                Previous
                            </BackButton>
                        </Grid>
                        <Grid item>
                            {activeStep !== steps.length && (
                                <NextButton size="small" variant="outlined" type="submit">
                                    {buttonText}
                                </NextButton>
                            )}
                        </Grid>
                    </ButtonWrapper>
                </Grid>
            </Container>
        </Form>
    );
};

export default reduxForm({ form: ["form"] })(IdentityForm);
