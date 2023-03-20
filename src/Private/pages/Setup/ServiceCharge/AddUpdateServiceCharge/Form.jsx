import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { change, Field, Form, reduxForm } from "redux-form";
import { Grid, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import TextField from "../../../../../App/components/Fields/TextField";
import SelectField from "../../../../../App/components/Fields/SelectField";
import Validator from "../../../../../App/utils/validators";
import { useParams } from "react-router-dom";

const Container = styled(Grid)(({ theme }) => ({
    borderRadius: "5px",
}));

const FormWrapper = styled(Grid)(({ theme }) => ({
    padding: "8px 8px 16px",
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

const ServiceChargeForm = ({
    handleSubmit,
    update,
    loading,
    c_mode,
    agent_id,
    buttonText,
    handleClose,
}) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [mode, setMode] = useState("F");
    const reference = JSON.parse(localStorage.getItem("reference"));
    const country = JSON.parse(localStorage.getItem("country"));

    const { response: SendPartner, loading: s_loading } = useSelector(
        (state) => state.get_sending_partner
    );

    useEffect(() => {
        if (c_mode) {
            setMode(c_mode);
        }
    }, [c_mode]);

    const handleChargeMode = (e) => {
        setMode(e.target.value);
    };

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
                    "update_service_charge_form",
                    "receiving_currency",
                    convertCurrency(e.target.value)
                )
            );
        } else {
            dispatch(
                change(
                    "add_service_charge_form",
                    "receiving_currency",
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
                        <Grid item xs={12}>
                            <Box>
                                <Header>Basic Information</Header>
                                <Divider sx={{ margin: "0px 12px" }} />
                            </Box>
                        </Grid>
                        {agent_id == 0 && (
                            <FieldWrapper item xs={12} sm={6}>
                                <Field
                                    name="sending_agent_id"
                                    label="Sending Agent"
                                    type="number"
                                    small={12}
                                    component={SelectField}
                                    validate={[
                                        Validator.emptyValidator,
                                        Validator.minValue1,
                                    ]}
                                >
                                    <option value="" disabled>
                                        {s_loading
                                            ? "loading..."
                                            : "Select Sending Agent"}
                                    </option>
                                    {SendPartner?.data &&
                                        SendPartner?.data.map((data) => (
                                            <option
                                                value={data.agent_id}
                                                key={data?.tid}
                                            >
                                                {data.name}
                                            </option>
                                        ))}
                                </Field>
                            </FieldWrapper>
                        )}
                        {!id && (
                            <>
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
                                                        ref_data.reference_type ===
                                                        1
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
                                        name="customer_type"
                                        label="Customer Type"
                                        type="number"
                                        small={12}
                                        component={SelectField}
                                        validate={[
                                            Validator.emptyValidator,
                                            Validator.minValue1,
                                        ]}
                                    >
                                        <option value="" disabled>
                                            Select Customer Type
                                        </option>
                                        {reference &&
                                            reference
                                                ?.filter(
                                                    (ref_data) =>
                                                        ref_data.reference_type ===
                                                        37
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
                                        name="receiving_country"
                                        label="Receiving Country"
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
                                        label="Receiving Currency"
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
                                name="min_amount"
                                label="Min Amount"
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
                                name="max_amount"
                                label="Max Amount"
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
                                name="charge_mode"
                                label="Charge Mode"
                                type="text"
                                small={12}
                                component={SelectField}
                                onChange={(e) => handleChargeMode(e)}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                ]}
                            >
                                <option value="" disabled>
                                    Select Charge Mode
                                </option>
                                <option value="F">Flat</option>
                                <option value="P">Percentage</option>
                            </Field>
                        </FieldWrapper>
                        {mode === "F" && (
                            <FieldWrapper item xs={12} sm={6}>
                                <Field
                                    name="charge_flat"
                                    label="Charge Flat"
                                    type="number"
                                    small={12}
                                    component={TextField}
                                    validate={[
                                        Validator.emptyValidator,
                                        Validator.minValue1,
                                    ]}
                                />
                            </FieldWrapper>
                        )}
                        {mode === "P" && (
                            <FieldWrapper item xs={12} sm={6}>
                                <Field
                                    name="charge_per"
                                    label="Charge Percentage"
                                    type="number"
                                    small={12}
                                    component={TextField}
                                    validate={[
                                        Validator.emptyValidator,
                                        Validator.minValue1,
                                    ]}
                                />
                            </FieldWrapper>
                        )}
                        <Grid item xs={12}>
                            <Box pt={2}>
                                <Header>
                                    Commission and Additional Information
                                </Header>
                                <Divider sx={{ margin: "0px 12px" }} />
                            </Box>
                        </Grid>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="send_commission_type"
                                label="Send Commission Type"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                ]}
                            >
                                <option value="" disabled>
                                    Select Send Commission Type
                                </option>
                                <option value="F">Flat</option>
                                <option value="P">Percentage</option>
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="send_commission_amount"
                                label="Send Commission Amount / Percentage"
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
                                name="pay_commission_type"
                                label="Pay Commission Type"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                ]}
                            >
                                <option value="" disabled>
                                    Select Pay Commission Type
                                </option>
                                <option value="F">Flat</option>
                                <option value="P">Percentage</option>
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="pay_commission_amount"
                                label="Pay Commission Amount / Percentage"
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
                                name="additional_fee"
                                label="Additional Fee"
                                type="number"
                                small={12}
                                component={TextField}
                            />
                        </FieldWrapper>
                    </FormWrapper>
                </Grid>
                <Grid item>
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

export default reduxForm({ form: ["form"] })(ServiceChargeForm);
