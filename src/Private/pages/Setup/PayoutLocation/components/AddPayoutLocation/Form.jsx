import React from "react";
import { styled } from "@mui/material/styles";
import { change, Field, Form, reduxForm } from "redux-form";
import { Grid, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import Divider from "@mui/material/Divider";

import SelectField from "../../../../../../App/components/Fields/SelectField";
import TextField from "../../../../../../App/components/Fields/TextField";
import CheckboxField from "../../../../../../App/components/Fields/CheckboxField";
import Validator from "../../../../../../App/utils/validators";

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
}));

const DeliveryOptionForm = ({
    handleSubmit,
    update,
    loading,
    buttonText,
    handleClose,
}) => {
    const dispatch = useDispatch();
    const reference = JSON.parse(localStorage.getItem("reference"));
    const country = JSON.parse(localStorage.getItem("country"));

    const convertCurrency = (iso3) => {
        const currency = country.filter((data) => data.iso3 === iso3);
        if (currency) {
            return currency[0].currency;
        }
    };

    const handleCurrency = (e) => {
        if (update) {
            dispatch(
                change(
                    "update_payout_location_form",
                    "currency",
                    convertCurrency(e.target.value)
                )
            );
        } else {
            dispatch(
                change(
                    "add_payout_location_form",
                    "currency",
                    convertCurrency(e.target.value)
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
                                name="location_name"
                                label="Location Name"
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
                                name="location_code"
                                label="Location Name"
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
                                name="payment_type"
                                label="Payment Type"
                                type="number"
                                small={12}
                                component={SelectField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                ]}
                            >
                                <option value="" disabled>
                                    Select Payment Type
                                </option>
                                {reference &&
                                    reference
                                        ?.filter(
                                            (ref_data) =>
                                                ref_data.reference_type === 1
                                        )[0]
                                        .reference_data.map((data, index) => (
                                            <option
                                                value={data.value}
                                                key={index}
                                            >
                                                {data.name}
                                            </option>
                                        ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="country"
                                label="Country"
                                type="number"
                                small={12}
                                onChange={handleCurrency}
                                component={SelectField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                ]}
                            >
                                <option value="" disabled>
                                    Select Country
                                </option>
                                {country &&
                                    country.map((data) => (
                                        <option
                                            value={data.iso3}
                                            key={data.tid}
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
                                type="number"
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
                                            key={data.tid}
                                        >
                                            {data.currency_name}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        {update && (
                            <FieldWrapper item xs={12} sm={6}>
                                <Grid
                                    container
                                    alignItems="flex-end"
                                    justifyContent="flex-end"
                                >
                                    <Grid item xs={12}>
                                        <StatusText component="p">
                                            Status
                                        </StatusText>
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
                                endIcon={update ? <UpdateIcon /> : <AddIcon />}
                                type="submit"
                            >
                                {buttonText}
                            </CreateButton>
                        </Grid>
                    </ButtonWrapper>
                </Grid>
            </Container>
        </Form>
    );
};

export default reduxForm({ form: ["form"] })(DeliveryOptionForm);
