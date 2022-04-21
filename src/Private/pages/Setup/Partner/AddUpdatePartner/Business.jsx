import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { change, Field, Form, reduxForm } from "redux-form";
import { Grid, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import Divider from "@mui/material/Divider";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import TextField from "../../../../../App/components/Fields/TextField";
import SelectField from "../../../../../App/components/Fields/SelectField";
import CheckboxField from "../../../../../App/components/Fields/CheckboxField";
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
    background: theme.palette.text.main,
    "&:hover": {
        background: theme.palette.text.dark,
    },
}));

const CompleteButton = styled(LoadingButton)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    textTransform: "capitalize",
    background: theme.palette.primary.main,
    "&:hover": {
        background: theme.palette.primary.dark,
    },
}));

const Business = ({
    handleSubmit,
    handleNext,
    handleBack,
    update,
    loading,
    buttonText,
    activeStep,
    steps,
    totalSteps,
    completedSteps,
    allStepsCompleted,
    handleComplete,
}) => {
    const dispatch = useDispatch();
    const reference = JSON.parse(localStorage.getItem("reference"));
    const country = JSON.parse(localStorage.getItem("country"));

    return (
        <Form onSubmit={handleSubmit}>
            <Container container direction="column">
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="date_of_incorporation"
                                label="Incorporation Date"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={Validator.emptyValidator}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="business_license_number"
                                label="Business License Number"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                ]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="business_license_expiry_date"
                                label="License Exp. Date"
                                type="number"
                                small={12}
                                component={TextField}
                                validate={Validator.emptyValidator}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="payment_type"
                                label="License No."
                                type="number"
                                small={12}
                                component={TextField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                ]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="balance"
                                label="Balance"
                                type="number"
                                small={12}
                                component={TextField}
                                validate={Validator.emptyValidator}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="credit_limit"
                                label="Credit Limit"
                                type="number"
                                small={12}
                                component={TextField}
                                validate={Validator.emptyValidator}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="transaction_currency"
                                label="Transaction Currency"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue3,
                                    Validator.maxLength3,
                                ]}
                            >
                                <option value="" disabled>
                                    Select Transaction Currency
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
                                name="settlement_currency"
                                label="Settlement Currency"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                    Validator.maxLength3,
                                ]}
                            >
                                <option value="" disabled>
                                    Select Settlement Currency
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
                                name="tax_type"
                                label="Tax Type"
                                type="text"
                                small={12}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    Select Tax Type
                                </option>
                                {reference &&
                                    reference
                                        ?.filter(
                                            (ref_data) =>
                                                ref_data.reference_type === 4
                                        )[0]
                                        .reference_data.map((data) => (
                                            <option
                                                value={data.value}
                                                key={data.reference_id}
                                            >
                                                {data.name}
                                            </option>
                                        ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="date_format"
                                label="Date Format"
                                type="text"
                                small={12}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    Select Date Format
                                </option>
                                <option value="yyyy-mm-dd" selected="">
                                    YYYY-MM-DD
                                </option>
                                <option value="mm/dd/yyyy">mm/dd/yyyy</option>
                                <option value="mm-dd-yyyy">mm-dd-yyyy</option>
                                <option value="dd/mm/yyyy">dd/mm/yyyy</option>
                                <option value="dd-mm-yyyy">dd-mm-yyyy</option>
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="time_zone"
                                label="Time Zone"
                                type="text"
                                small={12}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    Select Time Zone
                                </option>
                                <option value="-720">
                                    (GMT - 12:00) International Date Line
                                </option>
                                <option value="-660">
                                    (GMT - 11:00) Midway Island, Samoa
                                </option>
                                <option value="-600">
                                    (GMT - 10:00) Hawaii
                                </option>
                                <option value="-540">
                                    (GMT - 09:00) Alaska
                                </option>
                                <option value="-480">
                                    (GMT - 08:00) US &amp; Canada; Tijuana
                                </option>
                                <option value="-420">
                                    (GMT - 07:00) Arizona
                                </option>
                                <option value="-360">
                                    (GMT - 06:00) Central America
                                </option>
                                <option value="-300">
                                    (GMT - 05:00) Eastern Time
                                </option>
                                <option value="-240">
                                    (GMT - 04:00) Atlantic Time
                                </option>
                                <option value="-210">
                                    (GMT - 03:30) New Foundland
                                </option>
                                <option value="-180">
                                    (GMT - 03:00) Brasilia
                                </option>
                                <option value="-120">
                                    (GMT - 02:00) Mid Atlantic
                                </option>
                                <option value="-60">
                                    (GMT - 01:00) Azores
                                </option>
                                <option value="0">(GMT) Casablanca</option>
                                <option value="60">
                                    (GMT + 01:00) Amsterdam, Paris
                                </option>
                                <option value="120">
                                    (GMT + 02:00) Athens, Istanbul
                                </option>
                                <option value="180">
                                    (GMT + 03:00) Baghdad, Kuwait, Moscow
                                </option>
                                <option value="210">
                                    (GMT + 03:30) Tehran
                                </option>
                                <option value="240">
                                    (GMT + 04:00) Abu Dhabi
                                </option>
                                <option value="270">(GMT + 04:30) Kabul</option>
                                <option value="300">
                                    (GMT + 05:00) Ekaterinburg, Islamabad,
                                    Karachi
                                </option>
                                <option value="330">
                                    (GMT + 05:30) Mumbai, New Delhi
                                </option>
                                <option value="345">
                                    (GMT + 05:45) Kathmandu
                                </option>
                                <option value="360">(GMT + 06:00) Dhaka</option>
                                <option value="390">
                                    (GMT + 06:30) Rangoon
                                </option>
                                <option value="420">
                                    (GMT + 07:00) Bangkok, Jakarta
                                </option>
                                <option value="480">
                                    (GMT + 08:00) Beijing, Hong kong, Kuala
                                    Lumpur, Singapore
                                </option>
                                <option value="540">
                                    (GMT + 09:00) Osaka, Tokya, Seoul
                                </option>
                                <option value="570">
                                    (GMT + 09:30) Darwin
                                </option>
                                <option selected="" value="600">
                                    (GMT + 10:00) Brisbane, Sydney
                                </option>
                                <option value="660">
                                    (GMT + 11:00) Magadan, New Caledonia
                                </option>
                                <option value="720">
                                    (GMT + 12:00) Auckland, Fiji
                                </option>
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="transaction_limit"
                                label="Transaction Limit"
                                type="number"
                                small={12}
                                component={TextField}
                                validate={Validator.emptyValidator}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="commission_currency"
                                label="Commission Currency"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[
                                    Validator.minValue3,
                                    Validator.maxLength3,
                                ]}
                            >
                                <option value="" disabled>
                                    Select Commission Currency
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
                                name="bank_charge_currency"
                                label="Bank Charge Currency"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[
                                    Validator.minValue1,
                                    Validator.maxLength3,
                                ]}
                            >
                                <option value="" disabled>
                                    Select Bank Charge Currency
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
                            <Grid
                                container
                                alignItems="flex-end"
                                justifyContent="flex-end"
                            >
                                <Grid item xs={12}>
                                    <StatusText component="p">
                                        Is Prefunding?
                                    </StatusText>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="is_prefunding"
                                        label="Yes"
                                        small={12}
                                        reverse="row-reverse"
                                        component={CheckboxField}
                                    />
                                </Grid>
                            </Grid>
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
                        <Grid item>
                            <BackButton
                                size="small"
                                variant="outlined"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                            >
                                Back
                            </BackButton>
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <NextButton
                                size="small"
                                variant="contained"
                                onClick={handleNext}
                            >
                                Next
                            </NextButton>
                        </Grid>
                        <Grid item>
                            {activeStep !== steps.length && (
                                <CompleteButton
                                    size="small"
                                    variant="outlined"
                                    loading={loading}
                                    endIcon={
                                        completedSteps() ===
                                        totalSteps() - 1 ? (
                                            <DoneAllIcon />
                                        ) : null
                                    }
                                    type="submit"
                                >
                                    {completedSteps() === totalSteps() - 1
                                        ? "Finish"
                                        : buttonText}
                                </CompleteButton>
                            )}
                        </Grid>
                    </ButtonWrapper>
                </Grid>
            </Container>
        </Form>
    );
};

export default React.memo(
    reduxForm({
        form: "business_form",
    })(Business)
);
