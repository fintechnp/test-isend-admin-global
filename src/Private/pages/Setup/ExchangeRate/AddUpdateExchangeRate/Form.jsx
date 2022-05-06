import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { change, Field, Form, reduxForm } from "redux-form";
import { Grid, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import TextField from "../../../../../App/components/Fields/TextField";
import SelectField from "../../../../../App/components/Fields/SelectField";
import Validator from "../../../../../App/utils/validators";

const Container = styled(Grid)(({ theme }) => ({
    borderRadius: "5px",
    [theme.breakpoints.up("sm")]: {
        minWidth: "350px",
    },
}));

const FormWrapper = styled(Grid)(({ theme }) => ({
    padding: "12px",
    backgroundColor: theme.palette.background.light,
}));

const Header = styled(Box)(({ theme }) => ({
    paddingBottom: "4px",
    paddingLeft: "16px",
    fontSize: "18px",
    fontWeight: 500,
    color: theme.palette.primary.main,
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
}));

const ExchangeRateForm = ({
    handleSubmit,
    update,
    loading,
    buttonText,
    handleClose,
    partner_sending,
}) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const country = JSON.parse(localStorage.getItem("country"));
    const [form_name, setFormName] = useState("add_exchange_rate");
    const [rate, setRate] = useState(0);
    const [round, setRound] = useState(2);
    const [sendState, setSendState] = useState({
        base_to_sending: 0,
        base_to_sending_margin: 0,
        base_to_sending_settle: 0,
        send_min_amount: 0,
        send_max_amount: 0,
        round_send_amount: 0,
    });
    const [receiveState, setReceiveState] = useState({
        base_to_receiving: 0,
        base_to_receiving_margin: 0,
        base_to_receiving_settle: 0,
        receive_min_amount: 0,
        receive_max_amount: 0,
        round_receiving_amount: 0,
    });

    useEffect(() => {
        if (id) {
            setFormName("update_exchange_rate");
        }
    }, [id]);

    const convertCurrency = (iso3) => {
        const currency = country.filter((data) => data.iso3 === iso3);
        if (currency) {
            return currency[0].currency;
        }
    };

    const handleCurrency = (e) => {
        dispatch(
            change(
                form_name,
                "receiving_currency",
                convertCurrency(e.target.value)
            )
        );
    };

    const handleRate = (event) => {
        setRate(event.target.value);
    };

    const roundCustomerRate = (e) => {
        if (e.target.value) {
            dispatch(
                change(
                    form_name,
                    "customer_rate",
                    rate?.toFixed(parseInt(e.target.value) || 2)
                )
            );
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Container container direction="column" sx={{ pb: 3 }}>
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        <Grid item xs={12}>
                            <Box>
                                <Header>Sending Information</Header>
                                <Divider sx={{ margin: "0px 12px" }} />
                            </Box>
                        </Grid>
                        {!id && (
                            <>
                                <FieldWrapper item xs={12} sm={6}>
                                    <Field
                                        name="sending_agent_id"
                                        label="Sending Agent"
                                        type="number"
                                        small={12}
                                        component={SelectField}
                                        disabled
                                        validate={[
                                            Validator.emptyValidator,
                                            Validator.minValue1,
                                        ]}
                                    >
                                        <option value="" disabled>
                                            Select Sending Agent
                                        </option>
                                        {partner_sending &&
                                            partner_sending.map(
                                                (data, index) => (
                                                    <option
                                                        value={data.agent_id}
                                                        key={data?.tid}
                                                    >
                                                        {data.name}
                                                    </option>
                                                )
                                            )}
                                    </Field>
                                </FieldWrapper>
                                <FieldWrapper item xs={12} sm={6}>
                                    <Field
                                        name="sending_currency"
                                        label="Sending Currency"
                                        type="text"
                                        small={12}
                                        disabled
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
                                                    key={data.country_id}
                                                >
                                                    {data.currency_name}
                                                </option>
                                            ))}
                                    </Field>
                                </FieldWrapper>
                            </>
                        )}
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="base_to_sending"
                                label="Base To Sending"
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
                                name="base_to_sending_margin"
                                label="Base To Sending Margin"
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
                                name="base_to_sending_settle"
                                label="Base To Sending Settle"
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
                                name="send_min_amount"
                                label="Send Minimum Amount"
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
                                name="send_max_amount"
                                label="Send Maximum Amount"
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
                                name="round_send_amount"
                                label="Round Send Amount"
                                type="number"
                                small={12}
                                component={TextField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.integerValidator,
                                ]}
                            />
                        </FieldWrapper>

                        <Grid item xs={12}>
                            <Box pt={2}>
                                <Header>Receiving Information</Header>
                                <Divider sx={{ margin: "0px 12px" }} />
                            </Box>
                        </Grid>
                        {!id && (
                            <>
                                <FieldWrapper item xs={12} sm={6}>
                                    <Field
                                        name="receiving_country"
                                        label="Receive Country"
                                        type="text"
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
                                                    key={data.country_id}
                                                >
                                                    {data.country}
                                                </option>
                                            ))}
                                    </Field>
                                </FieldWrapper>
                                <FieldWrapper item xs={12} sm={6}>
                                    <Field
                                        name="receiving_currency"
                                        label="Receive Currency"
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
                                                    key={data.country_id}
                                                >
                                                    {data.currency_name}
                                                </option>
                                            ))}
                                    </Field>
                                </FieldWrapper>
                            </>
                        )}
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="base_to_receiving"
                                label="Base To Receiving"
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
                                name="base_to_receiving_margin"
                                label="Base To Receiving Margin"
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
                                name="base_to_receiving_settle"
                                label="Base To Receiving Settle"
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
                                name="receive_min_amount"
                                label="Receive Minimum Amount"
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
                                name="receive_max_amount"
                                label="Receive Maximum Amount"
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
                                name="round_receiving_amount"
                                label="Round Send Amount"
                                type="number"
                                small={12}
                                component={TextField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.integerValidator,
                                ]}
                            />
                        </FieldWrapper>
                        <Grid item xs={12}>
                            <Box pt={2}>
                                <Header>Rate Information</Header>
                                <Divider sx={{ margin: "0px 12px" }} />
                            </Box>
                        </Grid>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="customer_rate"
                                label="Customer Rate"
                                type="number"
                                small={12}
                                component={TextField}
                                onChange={handleRate}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                ]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="round_customer_rate"
                                label="Round Customer Rate"
                                type="number"
                                small={12}
                                component={TextField}
                                onChange={roundCustomerRate}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                ]}
                            />
                        </FieldWrapper>
                    </FormWrapper>
                </Grid>
                <Grid xs={12}>
                    <Divider sx={{ pt: 1.4 }} />
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

export default reduxForm({ form: ["form"] })(ExchangeRateForm);
