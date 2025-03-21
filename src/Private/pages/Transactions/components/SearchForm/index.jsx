import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Field, Form, reduxForm } from "redux-form";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

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

const TitleWrapper = styled(Box)(({ theme }) => ({
    paddingBottom: "8px",
    display: "flex",
    paddingLeft: "14px",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
        alignItems: "flex-start",
        flexDirection: "column",
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: "18px",
    fontWeight: 600,
    paddingLeft: "8px",
}));

const FormWrapper = styled(Grid)(({ theme }) => ({
    padding: "0px 12px",
}));

const FieldWrapper = styled(Grid)(({ theme }) => ({
    padding: "1px 4px",
}));

const FieldLevelWrapper = styled(Grid)(({ theme }) => ({
    padding: "4px 4px",
    "& .MuiInputBase-input": {
        opacity: 0.8,
    },
}));

const ButtonWrapper = styled(Grid)(({ theme }) => ({
    padding: "4px 0px",
    paddingRight: "4px",
}));

function SearchForm({ handleSubmit, handleReset, partner_sending, partner_payout, loading }) {
    const country = JSON.parse(localStorage.getItem("country"));
    const reference = JSON.parse(localStorage.getItem("reference"));
    const [minDate, setMinDate] = React.useState(null);
    const [maxDate, setMaxDate] = React.useState(null);

    const handleResetButton = (e) => {
        setMinDate(null);
        setMaxDate(null);
        handleReset();
    };

    return (
        <Container container>
            <Grid item xs={12}>
                <TitleWrapper>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <ContentPasteSearchIcon sx={{ color: "primary.main", fontSize: "28px" }} />
                        <Title> Search Transactions </Title>
                    </Box>
                </TitleWrapper>
            </Grid>
            <Grid item xs={12}>
                <Form onSubmit={handleSubmit}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="full_name"
                                placeholder="Full Name"
                                type="text"
                                small={12}
                                component={TextField}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="transaction_id"
                                placeholder="Transaction Id"
                                type="text"
                                small={12}
                                component={TextField}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="pin_number"
                                placeholder="Pin Number"
                                type="text"
                                small={12}
                                component={TextField}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="customer_id"
                                placeholder="Customer Id"
                                type="number"
                                small={12}
                                component={TextField}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field name="email" placeholder="Email" type="text" small={12} component={TextField} />
                        </FieldWrapper>

                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="mobile"
                                placeholder="Mobile Number"
                                type="number"
                                small={12}
                                component={TextField}
                            />
                        </FieldWrapper>

                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="payout_country"
                                placeholder="Payout Country"
                                type="text"
                                small={12}
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
                                name="send_agent_id"
                                placeholder="Sending Agent"
                                type="number"
                                small={12}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    Select Sending Agent
                                </option>
                                {partner_sending &&
                                    partner_sending.map((data, index) => (
                                        <option value={data.agent_id} key={data?.tid}>
                                            {data.name}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="payout_agent_id"
                                placeholder="Payout Agent"
                                type="number"
                                small={12}
                                component={SelectField}
                                disabled={partner_payout && (partner_payout.length > 0 ? false : true)}
                            >
                                <option value="" disabled>
                                    Select Payout Agent
                                </option>
                                {partner_payout &&
                                    partner_payout.map((data) => (
                                        <option value={data.agent_id} key={data?.tid}>
                                            {data.name}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
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
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field name="status" placeholder="Status" type="text" small={12} component={SelectField}>
                                <option disabled value="">
                                    Select Status
                                </option>
                                {reference &&
                                    reference
                                        ?.filter((ref_data) => ref_data.reference_type === 66)[0]
                                        .reference_data.map((data) => (
                                            <option value={data.value} key={data.reference_id}>
                                                {data.name}
                                            </option>
                                        ))}
                            </Field>
                        </FieldWrapper>
                        <FieldLevelWrapper item xs={12} sm={6}>
                            <Field
                                name="from_date"
                                placeholder="Date From"
                                showLabel={true}
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
                        </FieldLevelWrapper>
                        <FieldLevelWrapper item xs={12} sm={6}>
                            <Field
                                name="to_date"
                                placeholder="Date To"
                                showLabel={true}
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
                        </FieldLevelWrapper>
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
                                        size="small"
                                        color="error"
                                        variant="contained"
                                        onClick={handleResetButton}
                                        disabled={loading}
                                    >
                                        Reset
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        loading={loading}
                                        size="small"
                                        variant="contained"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        Search
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

export default reduxForm({ form: "search_form_transaction" })(SearchForm);
