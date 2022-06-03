import React from "react";
import { styled } from "@mui/material/styles";
import { Field, Form, reduxForm } from "redux-form";
import { Grid, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";

import TextField from "../../../../../App/components/Fields/TextField";
import SelectField from "../../../../../App/components/Fields/SelectField";

const Container = styled(Grid)(({ theme }) => ({
    borderRadius: "5px",
}));

const FormWrapper = styled(Grid)(({ theme }) => ({
    padding: "6px 0px 16px",
}));

const FieldWrapper = styled(Grid)(({ theme }) => ({
    padding: "1px 16px",
}));

const ButtonWrapper = styled(Grid)(({ theme }) => ({
    paddingTop: "8px",
    paddingRight: "16px",
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

const FilterForm = ({
    handleSubmit,
    partner_sending,
    partner_payout,
    loading,
    handleClose,
    handlePayoutPartner,
}) => {
    const dispatch = useDispatch();
    const country = JSON.parse(localStorage.getItem("country"));
    const reference = JSON.parse(localStorage.getItem("reference"));
    const [id, setId] = React.useState("transaction_id");
    const [name, setName] = React.useState("Transaction Id");
    const [minDate, setMinDate] = React.useState(null);
    const [maxDate, setMaxDate] = React.useState(null);

    const handleId = (e) => {
        setId(e.target.value);
        if (e.target.value === "customer_id") {
            setName("Customer Id");
        } else if (e.target.value === "pin_number") {
            setName("Pin Number");
        } else {
            setName("Transaction id");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Container container direction="column">
                <Grid item>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="type"
                                label="Select Type"
                                type="text"
                                small={12}
                                onChange={handleId}
                                component={SelectField}
                            >
                                <option
                                    value="transaction_id"
                                    name="Transaction Id"
                                >
                                    Transaction Id
                                </option>
                                <option value="pin_number" name="Pin Number">
                                    Pin Number
                                </option>
                                <option value="customer_id" name="Customer Id">
                                    Customer Id
                                </option>
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name={id}
                                label={name}
                                type="number"
                                small={12}
                                component={TextField}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="payout_country"
                                label="Payout Country"
                                type="text"
                                small={12}
                                component={SelectField}
                                onChange={handlePayoutPartner}
                            >
                                <option value="" disabled>
                                    Select Payout Country
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
                                name="send_agent_id"
                                label="Sending Agent"
                                type="number"
                                small={12}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    Select Sending Agent
                                </option>
                                {partner_sending &&
                                    partner_sending.map((data, index) => (
                                        <option
                                            value={data.agent_id}
                                            key={data?.tid}
                                        >
                                            {data.name}
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
                                component={SelectField}
                                disabled={
                                    partner_payout &&
                                    (partner_payout.length > 0 ? false : true)
                                }
                            >
                                <option value="" disabled>
                                    Select Payout Agent
                                </option>
                                {partner_payout &&
                                    partner_payout.map((data) => (
                                        <option
                                            value={data.agent_id}
                                            key={data?.tid}
                                        >
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
                            >
                                <option disabled>Select Payment Type</option>
                                <option value="">All</option>
                                {reference &&
                                    reference
                                        ?.filter(
                                            (ref_data) =>
                                                ref_data.reference_type === 1
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
                                name="from_date"
                                label="From Date"
                                type="date"
                                small={12}
                                component={TextField}
                                onChange={(e) => setMinDate(e.target.value)}
                                inputProps={{
                                    max: maxDate
                                        ? new Date(maxDate)
                                              .toISOString()
                                              .slice(0, 10)
                                        : new Date().toISOString().slice(0, 10),
                                }}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="to_date"
                                label="To Date"
                                type="date"
                                small={12}
                                component={TextField}
                                onChange={(e) => setMaxDate(e.target.value)}
                                inputProps={{
                                    min: new Date(minDate)
                                        .toISOString()
                                        .slice(0, 10),
                                    max: new Date().toISOString().slice(0, 10),
                                }}
                            />
                        </FieldWrapper>
                        <Grid item xs={12}>
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
                                        type="submit"
                                    >
                                        Filter
                                    </CreateButton>
                                </Grid>
                            </ButtonWrapper>
                        </Grid>
                    </FormWrapper>
                </Grid>
            </Container>
        </Form>
    );
};

export default reduxForm({ form: "filter_form_transaction" })(FilterForm);
