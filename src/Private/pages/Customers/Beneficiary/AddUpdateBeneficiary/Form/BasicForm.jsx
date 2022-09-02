import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Field, change, Form, reduxForm } from "redux-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";

import TextField from "../../../../../../App/components/Fields/TextField";
import SelectField from "../../../../../../App/components/Fields/SelectField";
import Validator from "../../../../../../App/utils/validators";

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

const CodeText = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    fontSize: "14px",
    paddingLeft: "8px",
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
    buttonText,
    update,
    pcountry,
}) => {
    const dispatch = useDispatch();
    const [code, setCode] = useState("01");
    const country = JSON.parse(localStorage.getItem("country"));
    const [filterSchema, setFilterSchema] = useState({
        page_number: 1,
        page_size: 100,
        payout_country: "",
        sort_by: "created_ts",
        order_by: "DESC",
    });

    useEffect(() => {
        if (pcountry) {
            const updatedFilterSchema = {
                ...filterSchema,
                payout_country: pcountry,
            };
            setFilterSchema(updatedFilterSchema);
        }
    }, [pcountry]);

    useEffect(() => {
        if (filterSchema?.payout_country) {
            dispatch({ type: "GET_DELIVERY_OPTION", query: filterSchema });
        }
    }, [dispatch, filterSchema]);

    const convertCurrency = (iso3) => {
        const currency = country.filter((data) => data.iso3 === iso3);
        if (currency) {
            return currency[0].currency;
        }
    };

    const convertCode = (iso3) => {
        const result = country.filter((data) => data.iso3 === iso3);
        if (result) {
            setCode(result[0]?.phone_code);
            return result[0].phone_code;
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
            dispatch(
                change(
                    "update_beneficiary_form",
                    "currency",
                    convertCurrency(e.target.value)
                )
            );
            dispatch(
                change(
                    "update_beneficiary_form",
                    "phone_country_code",
                    convertCode(e.target.value)
                )
            );
        } else {
            dispatch(
                change(
                    "add_beneficiary_form",
                    "currency",
                    convertCurrency(e.target.value)
                )
            );
            dispatch(
                change(
                    "add_beneficiary_form",
                    "phone_country_code",
                    convertCode(e.target.value)
                )
            );
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
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                    Validator.maxLength50,
                                ]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="middle_name"
                                label="Middle Name"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={Validator.maxLength50}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="last_name"
                                label="Last Name"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={Validator.maxLength50}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="receiver_type"
                                label="Receiver Type"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                ]}
                            >
                                <option value="" disabled>
                                    Select Receiver Type
                                </option>
                                <option value="i"> Individual </option>
                                <option value="g"> Group </option>
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="country"
                                label="Country"
                                type="text"
                                small={12}
                                onChange={handleCurrency}
                                component={SelectField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue3,
                                    Validator.maxLength3,
                                ]}
                            >
                                <option value="" disabled>
                                    Select Country
                                </option>
                                {country &&
                                    country.map((data) => (
                                        <option
                                            value={data.iso3}
                                            key={data.iso3}
                                        >
                                            {data.country}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="currency"
                                label="Currency"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                ]}
                            >
                                <option value="" disabled>
                                    Select Currency
                                </option>
                                {country &&
                                    country.map((data) => (
                                        <option
                                            value={data.currency}
                                            key={data.iso3}
                                        >
                                            {data.currency_name}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="mobile_number"
                                label="Mobile"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={Validator.mobileValidator}
                                InputProps={{
                                    startAdornment: (
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
                                    ),
                                }}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="email"
                                label="Email"
                                type="email"
                                small={12}
                                component={TextField}
                                validate={[
                                    Validator.emailValidator,
                                    Validator.minValue1,
                                ]}
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
                        alignItems="center"
                    >
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
                                <NextButton
                                    size="small"
                                    variant="outlined"
                                    type="submit"
                                >
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
