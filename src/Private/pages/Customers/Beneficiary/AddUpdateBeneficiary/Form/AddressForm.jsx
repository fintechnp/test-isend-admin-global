import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import Divider from "@mui/material/Divider";
import { Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { Field, Form, reduxForm, change } from "redux-form";


import TextField from "App/components/Fields/TextField";
import SelectField from "App/components/Fields/SelectField";

import Validator from "App/utils/validators";

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

const ButtonWrapper = styled(Grid)(({ theme }) => ({
    paddingTop: "12px",
}));

const CodeText = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    fontSize: "14px",
    paddingLeft: "8px",
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

const AddressForm = ({ handleSubmit, handleBack, activeStep, steps, buttonText, phone_code, update }) => {
    const dispatch = useDispatch();
    const country = JSON.parse(localStorage.getItem("country"));
    const [code, setCode] = useState("");

    const [filterSchema, setFilterSchema] = useState({
        page_number: 1,
        page_size: 100,
        payout_country: "",
        sort_by: "created_ts",
        order_by: "DESC",
    });

    useEffect(() => {
        if (phone_code) {
            setCode(phone_code);
        }
    }, [phone_code]);

    const convertCode = (iso3) => {
        const result = country.filter((data) => data.iso3 === iso3);
        if (result) {
            setCode(result[0]?.phone_code);
            return result[0].phone_code;
        }
    };

    const convertCurrency = (iso3) => {
        const currency = country.filter((data) => data.iso3 === iso3);
        if (currency) {
            return currency[0].currency;
        }
    };

    const handleCurrency = (e) => {
        const country = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            payout_country: country,
        };
        setFilterSchema(updatedFilterSchema);
        if (update) {
            dispatch(change("update_beneficiary_form", "currency", convertCurrency(e.target.value)));

            dispatch(change("update_beneficiary_form", "phone_country_code", convertCode(e.target.value)));
        } else {
            dispatch(change("add_beneficiary_form", "currency", convertCurrency(e.target.value)));

            dispatch(change("add_beneficiary_form", "phone_country_code", convertCode(e.target.value)));
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Container container direction="column">
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="country"
                                label="Beneficiary Country"
                                type="text"
                                small={12}
                                onChange={handleCurrency}
                                component={SelectField}
                                validate={[Validator.emptyValidator, Validator.minValue3, Validator.maxLength3]}
                            >
                                <option value="" disabled>
                                    Select Country
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
                                name="unit"
                                label="Postal Code (Optional)"
                                type="number"
                                small={12}
                                component={TextField}
                            />
                        </FieldWrapper>

                        <FieldWrapper item xs={12} sm={6}>
                            <Field name="state" label="State / Province" type="text" small={12} component={TextField} />
                        </FieldWrapper>

                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="city"
                                label="City / Town"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.emptyValidator, Validator.minValue1]}
                            />
                        </FieldWrapper>

                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="street"
                                label="Street"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.emptyValidator, Validator.minValue1]}
                            />
                        </FieldWrapper>

                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="mobile_number"
                                label="Phone Number"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={Validator.mobileValidator}
                                InputProps={{
                                    startAdornment: (
                                        <>
                                            {code && (
                                                <Box
                                                    sx={{
                                                        minWidth: "52px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <CodeText>+{code}</CodeText>
                                                </Box>
                                            )}
                                        </>
                                    ),
                                }}
                            />
                        </FieldWrapper>

                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="date_of_birth"
                                label="Date of Birth"
                                type="date"
                                small={12}
                                component={TextField}
                                validate={Validator.emptyValidator}
                            />
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

export default reduxForm({ form: ["form"] })(AddressForm);
