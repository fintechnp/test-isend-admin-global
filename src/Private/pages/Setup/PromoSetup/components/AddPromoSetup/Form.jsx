import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { change, Field, Form, reduxForm } from "redux-form";
import { Grid, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import Divider from "@mui/material/Divider";

import TextField from "../../../../../../App/components/Fields/TextField";
import SelectField from "../../../../../../App/components/Fields/SelectField";
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
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

const PromoSetupForm = ({
    handleSubmit,
    PartnerSend,
    partnerPayout,
    update,
    loading,
    buttonText,
    payout_country,
    handleClose,
    handleAgent,
}) => {
    const dispatch = useDispatch();
    const reference = JSON.parse(localStorage.getItem("reference"));
    const country = JSON.parse(localStorage.getItem("country"));

    useEffect(() => {
        if (payout_country && update) {
            handleAgent(payout_country);
        }
    }, [payout_country]);

    const convertCurrency = (iso3) => {
        const currency = country.filter((data) => data.iso3 === iso3);
        if (currency) {
            return currency[0].currency;
        }
    };

    const handleCurrency = (e) => {
        handleAgent(e.target.value);
        if (update) {
            dispatch(change("update_promo_setup_form", "payout_currency", convertCurrency(e.target.value)));
        } else {
            dispatch(change("add_promo_setup_form", "payout_currency", convertCurrency(e.target.value)));
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Container container direction="column">
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="name"
                                label="Name"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.emptyValidator, Validator.maxLength100, Validator.minValue1]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="sending_agent_id"
                                label="Sending Partner"
                                type="number"
                                small={12}
                                component={SelectField}
                                validate={Validator.emptyValidator}
                            >
                                <option value="" disabled>
                                    Select Sending Partner
                                </option>
                                {PartnerSend &&
                                    PartnerSend.map((data, index) => (
                                        <option value={data.agent_id} key={data?.tid}>
                                            {data.name}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="payout_country"
                                label="Payout Country"
                                type="text"
                                small={12}
                                onChange={handleCurrency}
                                component={SelectField}
                                validate={[Validator.emptyValidator, Validator.minValue3, Validator.maxLength3]}
                            >
                                <option value="" disabled>
                                    Select Payout Country
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
                                name="payout_currency"
                                label="Payout Currency"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[Validator.emptyValidator, Validator.minValue3, Validator.maxLength3]}
                            >
                                <option value="" disabled>
                                    Select Payout Currency
                                </option>
                                {country &&
                                    country.map((data) => (
                                        <option value={data.currency} key={data.iso3}>
                                            {data.currency_name}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="payout_agent_id"
                                label="Payout Agent"
                                type="number"
                                small={12}
                                disabled={partnerPayout.length > 0 ? false : true}
                                component={SelectField}
                                validate={[Validator.emptyValidator, Validator.minValue1]}
                            >
                                <option value="" disabled>
                                    Select Payout Partner
                                </option>
                                {partnerPayout &&
                                    partnerPayout.map((data, index) => (
                                        <option value={data.agent_id} key={data?.tid}>
                                            {data.name}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="payment_type"
                                label="Payment Type"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[Validator.emptyValidator, Validator.maxLength1, Validator.minValue1]}
                            >
                                <option value="" disabled>
                                    Select Payment Type
                                </option>
                                {reference &&
                                    reference
                                        ?.filter((ref_data) => ref_data.reference_type === 1)[0]
                                        .reference_data.map((data) => (
                                            <option value={data.value} key={data.reference_id}>
                                                {data.name}
                                            </option>
                                        ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="fee_discount"
                                label="Fee Discount(%)"
                                type="number"
                                small={12}
                                component={TextField}
                                validate={Validator.emptyValidator}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="premium_rate"
                                label="Prenium Rate"
                                type="number"
                                small={12}
                                component={TextField}
                                validate={Validator.emptyValidator}
                            />
                        </FieldWrapper>
                        {update && (
                            <FieldWrapper item xs={12} sm={6}>
                                <Grid container alignItems="flex-end" justifyContent="flex-end">
                                    <Grid item xs={12}>
                                        <StatusText component="p">Status</StatusText>
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
                            <CancelButton size="small" variant="contained" onClick={handleClose}>
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

export default React.memo(reduxForm({ form: ["form"] })(PromoSetupForm));
