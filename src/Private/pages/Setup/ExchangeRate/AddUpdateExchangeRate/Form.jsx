import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { change, Field, Form, reduxForm } from "redux-form";
import { Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { getFormValues } from "redux-form";

import TextField from "../../../../../App/components/Fields/TextField";
import SelectField from "../../../../../App/components/Fields/SelectField";
import Validator from "../../../../../App/utils/validators";

const Container = styled(Grid)(({ theme }) => ({
    borderRadius: "5px",
    [theme.breakpoints.up("sm")]: {
        minWidth: "350px",
    },
    "& .MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root .MuiNativeSelect-select.MuiInputBase-input.MuiOutlinedInput-input":
        {
            color: "#000",
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
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

const ExchangeRateForm = ({
    handleSubmit,
    data,
    update,
    loading,
    buttonText,
    handleClose,
    partner_sending,
}) => {
    const dispatch = useDispatch();
    const { id, currency, agent_id } = useParams();
    const country = JSON.parse(localStorage.getItem("country"));
    const [form_name, setFormName] = useState("add_exchange_rate");
    const [base_to_sending, setBaseSend] = useState(0);
    const [base_to_sending_margin, setBaseSendMargin] = useState(0);
    const [base_to_receiving, setBaseReceive] = useState(0);
    const [base_to_receiving_margin, setBaseReceiveMargin] = useState(0);
    const [base_to_sending_settle, setBaseSendSettle] = useState(0);
    const [base_to_receiving_settle, setBaseReceiveSettle] = useState(0);
    const [round_receieve, setRoundReceieve] = useState(0);
    const [customer_rate, setCustomerRate] = useState(0);
    const [send_min, setSendMin] = useState(0);
    const [send_max, setSendMax] = useState(0);
    const [receive_min, setReceiveMin] = useState(0);
    const [receive_max, setReceiveMax] = useState(0);
    const formValues = useSelector((state) => getFormValues(form_name)(state));

    useEffect(() => {
        if (id) {
            setFormName("update_exchange_rate");
        } else if (agent_id == 0) {
            dispatch(change("add_exchange_rate", "sending_agent_id", ""));
            dispatch(change("add_exchange_rate", "sending_currency", ""));
        } else {
            dispatch(change("add_exchange_rate", "sending_agent_id", agent_id));
            dispatch(change("add_exchange_rate", "sending_currency", currency));
        }
    }, [id, agent_id, currency, dispatch]);

    useEffect(() => {
        if (id) {
            setBaseSend(data?.base_to_sending);
            setBaseSendMargin(data?.base_to_sending_margin);
            setBaseReceive(data?.base_to_receiving);
            setBaseReceiveMargin(data?.base_to_receiving_margin);
            setBaseSendSettle(data?.base_to_sending_settle);
            setBaseReceiveSettle(data?.base_to_receiving_settle);

            setCustomerRate(data?.customer_rate);
            setSendMin(data?.send_min);
            setSendMax(data?.send_max);
            setReceiveMin(data?.receive_min);
            setReceiveMax(data?.receive_max);
            setRoundReceieve(data?.round_receieve);
        }
    }, [id]);

    const handleTxnCurrency = (e) => {
        if (
            partner_sending !== undefined &&
            partner_sending.length > 0 &&
            agent_id == 0
        ) {
            const currency = partner_sending.filter(
                (data) => data.tid == e.target.value
            );
            if (currency) {
                dispatch(
                    change(
                        "add_exchange_rate",
                        "sending_currency",
                        currency[0]?.transaction_currency
                    )
                );
            }
        }
    };

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

    const handleBaseSend = (e) => {
        setBaseSend(e.target.value);
        if (base_to_sending_margin) {
            dispatch(
                change(
                    form_name,
                    "base_to_sending_settle",
                    parseFloat(e.target.value || 0) +
                        parseFloat(base_to_sending_margin)
                )
            );
            setBaseSendSettle(
                parseFloat(e.target.value || 0) +
                    parseFloat(base_to_sending_margin)
            );
            if (base_to_receiving_settle) {
                dispatch(
                    change(
                        form_name,
                        "customer_rate",
                        base_to_receiving_settle /
                            (parseFloat(e.target.value || 0) +
                                parseFloat(base_to_sending_margin))
                    )
                );
                setCustomerRate(
                    base_to_receiving_settle /
                        (parseFloat(e.target.value || 0) +
                            parseFloat(base_to_sending_margin))
                );
            }
        } else {
            dispatch(
                change(
                    form_name,
                    "base_to_sending_settle",
                    parseFloat(e.target.value)
                )
            );
            setBaseSendSettle(parseFloat(e.target.value || 0));
            if (base_to_receiving_settle) {
                dispatch(
                    change(
                        form_name,
                        "customer_rate",
                        base_to_receiving_settle /
                            parseFloat(e.target.value || 0)
                    )
                );
                setCustomerRate(
                    base_to_receiving_settle / parseFloat(e.target.value || 0)
                );
            }
        }
    };

    const handleBaseSendMargin = (e) => {
        setBaseSendMargin(e.target.value);
        if (base_to_sending) {
            dispatch(
                change(
                    form_name,
                    "base_to_sending_settle",
                    parseFloat(e.target.value || 0) +
                        parseFloat(base_to_sending)
                )
            );
            setBaseSendSettle(
                parseFloat(e.target.value || 0) + parseFloat(base_to_sending)
            );
            if (base_to_receiving_settle) {
                dispatch(
                    change(
                        form_name,
                        "customer_rate",
                        base_to_receiving_settle /
                            (parseFloat(e.target.value || 0) +
                                parseFloat(base_to_sending))
                    )
                );
                setCustomerRate(
                    base_to_receiving_settle /
                        (parseFloat(e.target.value || 0) +
                            parseFloat(base_to_sending))
                );
            }
        } else {
            dispatch(
                change(
                    form_name,
                    "base_to_sending_settle",
                    parseFloat(e.target.value)
                )
            );
            setBaseSendSettle(parseFloat(e.target.value || 0));
            if (base_to_receiving_settle) {
                dispatch(
                    change(
                        form_name,
                        "customer_rate",
                        base_to_receiving_settle /
                            parseFloat(e.target.value || 0)
                    )
                );
                setCustomerRate(
                    base_to_receiving_settle / parseFloat(e.target.value || 0)
                );
            }
        }
    };

    const handleBaseReceive = (e) => {
        setBaseReceive(e.target.value);
        if (base_to_receiving_margin) {
            dispatch(
                change(
                    form_name,
                    "base_to_receiving_settle",
                    parseFloat(e.target.value || 0) +
                        parseFloat(base_to_receiving_margin)
                )
            );
            setBaseReceiveSettle(
                parseFloat(e.target.value || 0) +
                    parseFloat(base_to_receiving_margin)
            );
            if (base_to_sending_settle) {
                dispatch(
                    change(
                        form_name,
                        "customer_rate",
                        (parseFloat(e.target.value || 0) +
                            parseFloat(base_to_receiving_margin)) /
                            base_to_sending_settle
                    )
                );
                setCustomerRate(
                    (parseFloat(e.target.value || 0) +
                        parseFloat(base_to_receiving_margin)) /
                        base_to_sending_settle
                );
            }
        } else {
            dispatch(
                change(
                    form_name,
                    "base_to_receiving_settle",
                    parseFloat(e.target.value)
                )
            );
            setBaseReceiveSettle(parseFloat(e.target.value || 0));
            if (base_to_sending_settle) {
                dispatch(
                    change(
                        form_name,
                        "customer_rate",
                        parseFloat(e.target.value || 0) / base_to_sending_settle
                    )
                );
                setCustomerRate(
                    parseFloat(e.target.value || 0) / base_to_sending_settle
                );
            }
        }
    };

    const handleBaseReceiveMargin = (e) => {
        setBaseReceiveMargin(e.target.value);
        if (base_to_receiving) {
            dispatch(
                change(
                    form_name,
                    "base_to_receiving_settle",
                    parseFloat(e.target.value || 0) +
                        parseFloat(base_to_receiving)
                )
            );
            setBaseReceiveSettle(
                parseFloat(e.target.value || 0) + parseFloat(base_to_receiving)
            );
            if (base_to_sending_settle) {
                dispatch(
                    change(
                        form_name,
                        "customer_rate",
                        (parseFloat(e.target.value || 0) +
                            parseFloat(base_to_receiving)) /
                            base_to_sending_settle
                    )
                );
                setCustomerRate(
                    (parseFloat(e.target.value || 0) +
                        parseFloat(base_to_receiving)) /
                        base_to_sending_settle
                );
            }
        } else {
            dispatch(
                change(
                    form_name,
                    "base_to_receiving_settle",
                    parseFloat(e.target.value)
                )
            );
            setBaseReceiveSettle(parseFloat(e.target.value || 0));
            if (base_to_sending_settle) {
                dispatch(
                    change(
                        form_name,
                        "customer_rate",
                        parseFloat(e.target.value || 0) / base_to_sending_settle
                    )
                );
                setCustomerRate(
                    parseFloat(e.target.value || 0) / base_to_sending_settle
                );
            }
        }
    };

    const handleSendRound = (e) => {
        if (e.target.value) {
            dispatch(
                change(
                    form_name,
                    "send_min_amount",
                    parseFloat(send_min).toFixed(parseInt(e.target.value) || 8)
                )
            );
            dispatch(
                change(
                    form_name,
                    "send_max_amount",
                    parseFloat(send_max).toFixed(parseInt(e.target.value) || 8)
                )
            );
        }
    };

    const handleReceiveRound = (e) => {
        if (e.target.value) {
            setRoundReceieve(e.target.value);
            dispatch(
                change(
                    form_name,
                    "receive_min_amount",
                    parseFloat(receive_min).toFixed(
                        parseInt(e.target.value) || 8
                    )
                )
            );
            dispatch(
                change(
                    form_name,
                    "receive_max_amount",
                    parseFloat(receive_max).toFixed(
                        parseInt(e.target.value) || 8
                    )
                )
            );
        }
    };

    const CustomerRate = (e) => {
        if (e.target.value) {
            if (
                e.target.value &&
                base_to_receiving_settle &&
                base_to_sending_settle
            ) {
                dispatch(
                    change(
                        form_name,
                        "base_to_receiving_settle",
                        parseFloat(e.target.value) *
                            parseFloat(base_to_sending_settle)
                    )
                );
                dispatch(
                    change(
                        form_name,
                        "base_to_receiving",
                        parseFloat(e.target.value) *
                            parseFloat(base_to_sending_settle) -
                            parseFloat(base_to_receiving_margin)
                    )
                );
            }
        }
    };

    const roundCustomerRate = (e) => {
        if (e.target.value) {
            dispatch(
                change(
                    form_name,
                    "customer_rate",
                    parseFloat(formValues?.customer_rate)?.toFixed(
                        parseInt(e.target.value) || 2
                    )
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
                                        disabled={agent_id == 0 ? false : true}
                                        onChange={handleTxnCurrency}
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
                                onChange={(e) => handleBaseSend(e)}
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
                                onChange={(e) => handleBaseSendMargin(e)}
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
                                onChange={(e) => setSendMin(e.target.value)}
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
                                onChange={(e) => setSendMax(e.target.value)}
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
                                onChange={(e) => handleSendRound(e)}
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
                                onChange={(e) => handleBaseReceive(e)}
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
                                onChange={(e) => handleBaseReceiveMargin(e)}
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
                                onChange={(e) => setReceiveMin(e.target.value)}
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
                                onChange={(e) => setReceiveMax(e.target.value)}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                ]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="round_receiving_amount"
                                label="Round Receive Amount"
                                type="number"
                                small={12}
                                component={TextField}
                                onChange={(e) => handleReceiveRound(e)}
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
                                value={customer_rate}
                                component={TextField}
                                onChange={CustomerRate}
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
                                    Validator.maxLength1,
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
