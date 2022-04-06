import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { change, Field, Form, reduxForm } from "redux-form";
import { Grid, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import Divider from "@mui/material/Divider";

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

const ExchangeRateForm = ({
    handleSubmit,
    user_type,
    update,
    loading,
    buttonText,
    handleClose,
}) => {
    const dispatch = useDispatch();
    const [type, setType] = useState(false);
    const reference = JSON.parse(localStorage.getItem("reference"));
    const country = JSON.parse(localStorage.getItem("country"));
    const partner_data = useSelector(
        (state) => state.get_all_partner?.response
    );

    const handleType = (e) => {
        setType(e.target.value);
        if (e.target.value !== "PARTNER") {
            dispatch(change("add_user_form", "agent_id", 0));
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Container container direction="column">
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="receiving_country"
                                label="Receive Country"
                                type="number"
                                small={12}
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
                                        <option value={data.iso3} key={data.id}>
                                            {data.country}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="receiving_currency"
                                label="Receive Currency"
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
                                            key={data.id}
                                        >
                                            {data.currency}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <Grid item xs={12} sx={{ p: 1.4 }}>
                            <Divider />
                        </Grid>
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
                        <Grid item xs={12} sx={{ p: 1.4 }}>
                            <Divider />
                        </Grid>
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
                        <Grid item xs={12} sx={{ p: 1.4 }}>
                            <Divider />
                        </Grid>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="customer_rate"
                                label="Customer Rate"
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
                                name="round_customer_rate"
                                label="Round Customer Rate"
                                type="number"
                                small={12}
                                component={TextField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                ]}
                            />
                        </FieldWrapper>
                        <Grid item xs={12} sx={{ p: 1.4 }}>
                            <Divider />
                        </Grid>
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
                                label="Send Maxium Amount"
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
                        <Grid item xs={12} sx={{ p: 1.4 }}>
                            <Divider />
                        </Grid>
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
