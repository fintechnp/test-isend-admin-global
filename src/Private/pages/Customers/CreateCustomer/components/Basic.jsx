import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Field, Form, change, reduxForm } from "redux-form";
import { Grid, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";

import TextField from "../../../../../App/components/Fields/TextField";
import SelectField from "../../../../../App/components/Fields/SelectField";
import Validator from "../../../../../App/utils/validators";

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

const Basic = ({
    handleSubmit,
    handleBack,
    activeStep,
    steps,
    update,
    loading,
    hasPartner,
    setCode,
    buttonText,
    partner_sending,
}) => {
    const dispatch = useDispatch();
    const reference = JSON.parse(localStorage.getItem("reference"));
    const country = JSON.parse(localStorage.getItem("country"));

    const convertCode = (iso3) => {
        const result = country.filter((data) => data.iso3 === iso3);
        if (result) {
            setCode(result[0]?.phone_code);
            return result[0].phone_code;
        }
    };

    const handleCountry = (e) => {
        if (e.target.value) {
            dispatch({
                type: "GET_SENDING_PARTNER",
                query: {
                    page_number: 1,
                    page_size: 100,
                    agent_type: "SEND",
                    country: e.target.value,
                    sort_by: "name",
                    order_by: "DESC",
                },
            });
        }
        if (update) {
            dispatch(change("update_customer_form", "phone_country_code", convertCode(e.target.value)));
        } else {
            dispatch(change("add_customer_form", "phone_country_code", convertCode(e.target.value)));
        }
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Container container direction="column">
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="first_name"
                                label="First Name"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.emptyValidator, Validator.minValue1, Validator.maxLength50]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="middle_name"
                                label="Middle Name"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.maxLength50]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="last_name"
                                label="Last Name"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.maxLength50]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="mobile_number"
                                label="Mobile Number"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.maxLength50]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="customer_type"
                                label="Customer Type"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[Validator.emptyValidator, Validator.minValue1, Validator.maxLength1]}
                            >
                                <option value="" disabled>
                                    Select Customer Type
                                </option>
                                {reference &&
                                    reference
                                        ?.filter((ref_data) => ref_data.reference_type === 37)[0]
                                        .reference_data.map((data, index) => (
                                            <option value={data.value} key={index}>
                                                {data.name}
                                            </option>
                                        ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="gender"
                                label="Gender"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[Validator.emptyValidator, Validator.minValue1, Validator.maxLength1]}
                            >
                                <option value="" disabled>
                                    Select Gender
                                </option>
                                {reference &&
                                    reference
                                        ?.filter((ref_data) => ref_data.reference_type === 42)[0]
                                        .reference_data.map((data, index) => (
                                            <option value={data.value} key={index}>
                                                {data.name}
                                            </option>
                                        ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="occupation"
                                label="Occupation"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[Validator.emptyValidator, Validator.minValue1, Validator.maxLength100]}
                            >
                                <option value="" disabled>
                                    Select Occupation
                                </option>
                                {reference &&
                                    reference
                                        ?.filter((ref_data) => ref_data.reference_type === 17)[0]
                                        .reference_data.map((data, index) => (
                                            <option value={data.value} key={index}>
                                                {data.name}
                                            </option>
                                        ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="source_of_income"
                                label="Soucrce of Income"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[Validator.emptyValidator, Validator.minValue1, Validator.maxLength100]}
                            >
                                <option value="" disabled>
                                    Select Source of Income
                                </option>
                                {reference &&
                                    reference
                                        ?.filter((ref_data) => ref_data.reference_type === 6)[0]
                                        .reference_data.map((data, index) => (
                                            <option value={data.value} key={index}>
                                                {data.name}
                                            </option>
                                        ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="country"
                                label="Country"
                                type="text"
                                small={12}
                                onChange={handleCountry}
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

                        {hasPartner && (
                            <FieldWrapper item xs={12} sm={6}>
                                <Field
                                    name="register_agent_id"
                                    label="Partner"
                                    type="number"
                                    small={12}
                                    disabled={loading}
                                    component={SelectField}
                                    validate={[Validator.emptyValidator, Validator.minValue1]}
                                >
                                    <option value="" disabled>
                                        {loading ? "Fetching Partner ..." : "Select Partner"}
                                    </option>
                                    {partner_sending &&
                                        partner_sending?.map((data, index) => (
                                            <option value={data.agent_id} key={data?.tid}>
                                                {data.name}
                                            </option>
                                        ))}
                                </Field>
                            </FieldWrapper>
                        )}
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

export default reduxForm({ form: ["form"] })(Basic);
