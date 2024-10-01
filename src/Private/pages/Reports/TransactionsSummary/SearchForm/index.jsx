import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Field, Form, reduxForm } from "redux-form";

import TextField from "App/components/Fields/TextField";
import SelectField from "App/components/Fields/SelectField";

const Container = styled(Grid)(({ theme }) => ({
    width: "100%",
    marginTop: "8px",
    marginBottom: "12px",
    padding: "8px 0px",
    borderRadius: "4px",
    border: `1px solid ${theme.palette.border.main}`,
}));

const FormWrapper = styled(Grid)(({ theme }) => ({
    padding: "0px 12px",
}));

const FieldWrapper = styled(Grid)(({ theme }) => ({
    padding: "2px 4px",
}));

const FieldWrapperLabel = styled(Grid)(({ theme }) => ({
    padding: "4px 4px",
    "& .MuiInputBase-input": {
        opacity: 0.6,
    },
}));

const ButtonWrapper = styled(Grid)(({ theme }) => ({
    padding: "4px 0px",
    paddingRight: "4px",
}));

function SearchForm({
    handleSubmit,
    handleReset,
    s_loading,
    p_loading,
    PayPartner,
    SendPartner,
    handleSendPartner,
    handlePayPartner,
    loading,
}) {
    const reference = JSON.parse(localStorage.getItem("reference"));
    const country = JSON.parse(localStorage.getItem("country"));
    const [minDate, setMinDate] = React.useState(null);
    const [maxDate, setMaxDate] = React.useState(null);

    const handleResetButton = (e) => {
        setMinDate(null);
        setMaxDate(null);
        handleReset();
    };

    const handleSendCountry = (e) => {
        handleSendPartner(e);
    };

    const handlePayCountry = (e) => {
        handlePayPartner(e);
    };

    return (
        <Container container>
            <Grid item xs={12}>
                <Form onSubmit={handleSubmit}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="send_country"
                                placeholder="Send Country"
                                type="text"
                                small={12}
                                onChange={handleSendCountry}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    Select Send Country
                                </option>
                                {country &&
                                    country.map((data) => (
                                        <option value={data.iso3} key={data.tid}>
                                            {data.country}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="sending_agent_id"
                                placeholder="Select Send Partner"
                                type="number"
                                small={12}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    {s_loading ? "Loading..." : "Select Send Partner"}
                                </option>
                                {!s_loading && SendPartner?.length === 0 && (
                                    <option value="" disabled>
                                        No Partners
                                    </option>
                                )}
                                {!s_loading && !SendPartner && (
                                    <option value="" disabled>
                                        Select Send Country First
                                    </option>
                                )}
                                {SendPartner &&
                                    SendPartner.map((data) => (
                                        <option value={data.agent_id} key={data?.tid}>
                                            {data.name}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="payout_country"
                                placeholder="Payout Country"
                                type="text"
                                small={12}
                                onChange={handlePayCountry}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    Select Payout Country
                                </option>
                                {country &&
                                    country.map((data) => (
                                        <option value={data.iso3} key={data.tid}>
                                            {data.country}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="payout_agent_id"
                                placeholder="Select Payout Partner"
                                type="number"
                                small={12}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    {p_loading ? "Loading..." : "Select Payout Partner"}
                                </option>
                                {!p_loading && PayPartner?.length === 0 && (
                                    <option value="" disabled>
                                        No Partners
                                    </option>
                                )}
                                {!p_loading && !PayPartner && (
                                    <option value="" disabled>
                                        Select Payout Country First
                                    </option>
                                )}
                                {PayPartner &&
                                    PayPartner.map((data) => (
                                        <option value={data.agent_id} key={data?.tid}>
                                            {data.name}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapperLabel item xs={12} sm={6}>
                            <Field
                                name="from_date"
                                showLabel={true}
                                placeholder="From Date"
                                type="date"
                                small={12}
                                component={TextField}
                                onChange={(e) => setMinDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: new Date("2021-01-01").toISOString().slice(0, 10),
                                    max: maxDate
                                        ? new Date(maxDate).toISOString().slice(0, 10)
                                        : new Date().toISOString().slice(0, 10),
                                }}
                            />
                        </FieldWrapperLabel>
                        <FieldWrapperLabel item xs={12} sm={6}>
                            <Field
                                name="to_date"
                                showLabel={true}
                                placeholder="To Date"
                                type="date"
                                small={12}
                                component={TextField}
                                onChange={(e) => setMaxDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: minDate
                                        ? new Date(minDate).toISOString().slice(0, 10)
                                        : new Date("2021-01-01").toISOString().slice(0, 10),
                                    max: new Date().toISOString().slice(0, 10),
                                }}
                            />
                        </FieldWrapperLabel>
                        <FieldWrapperLabel item xs={12} sm={6}>
                            <Field
                                name="payment_type"
                                placeholder="Payment Type"
                                type="text"
                                small={12}
                                component={SelectField}
                            >
                                <option disabled value="">
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
                        </FieldWrapperLabel>
                        <Grid item xs={12}>
                            <ButtonWrapper
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                columnSpacing={2}
                            >
                                <Grid item>
                                    <Button
                                        color="error"
                                        size="small"
                                        variant="contained"
                                        onClick={handleResetButton}
                                        disabled={loading}
                                    >
                                        Reset
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button size="small" variant="contained" type="submit" disabled={loading}>
                                        Filter
                                    </Button>
                                </Grid>
                            </ButtonWrapper>
                        </Grid>
                    </FormWrapper>
                </Form>
            </Grid>
        </Container>
    );
}

export default reduxForm({ form: "search_form_summary_reports" })(SearchForm);
