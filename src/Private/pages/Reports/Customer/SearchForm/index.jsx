import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Field, Form, reduxForm, change, formValueSelector } from "redux-form";

import MuiTextField from "@mui/material/TextField";
import TextField from "App/components/Fields/TextField";
import SelectField from "App/components/Fields/SelectField";

import dateUtils from "App/utils/dateUtils";

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

const SEARCH_FORM_CUSTOMER_REPORTS = "search_form_customer_reports";

function SearchForm({ handleSubmit, handleReset, handlePartner, partner, loading, initialValues }) {
    const country = JSON.parse(localStorage.getItem("country"));
    const reference = JSON.parse(localStorage.getItem("reference"));
    const [minDate, setMinDate] = React.useState(initialValues?.created_form_date);
    const [maxDate, setMaxDate] = React.useState(initialValues?.created_to_date);
    const [minKycDate, setMinKycDate] = React.useState(null);
    const [maxKycDate, setMaxKycDate] = React.useState(null);

    const dispatch = useDispatch();

    const handleResetButton = (e) => {
        setMinDate(null);
        setMaxDate(null);
        setMinKycDate(null);
        setMaxKycDate(null);
        handleReset();
    };

    return (
        <Container container>
            <Grid item xs={12}>
                <Form onSubmit={handleSubmit}>
                    <FormWrapper container direction="row">
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
                            <Field name="name" placeholder="Name" type="text" small={12} component={TextField} />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="country"
                                placeholder="Country"
                                type="text"
                                small={12}
                                onChange={handlePartner}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    Select Country
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
                                name="nationality"
                                placeholder="Nationality"
                                type="text"
                                small={12}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    Select Nationality
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
                                name="agent_id"
                                placeholder="Partner"
                                type="number"
                                small={12}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    {loading ? "Loading..." : "Select Partner"}
                                </option>
                                {!loading && partner?.length === 0 && (
                                    <option value="" disabled>
                                        No Partners
                                    </option>
                                )}
                                {!loading && !partner && (
                                    <option value="" disabled>
                                        Select Country First
                                    </option>
                                )}
                                {partner &&
                                    partner.map((data) => (
                                        <option value={data.agent_id} key={data?.tid}>
                                            {data.name}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="id_number"
                                placeholder="Id Number"
                                type="text"
                                small={12}
                                component={TextField}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="mobile_number"
                                placeholder="Mobile Number"
                                type="tel"
                                small={12}
                                component={TextField}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field name="email" placeholder="Email" type="email" small={12} component={TextField} />
                        </FieldWrapper>
                        <FieldWrapperLabel item xs={12} sm={6}>
                            <MuiTextField
                                size="small"
                                name="created_from_date"
                                label="Member From"
                                placeholder="Member From"
                                type="date"
                                value={moment(minDate).format("YYYY-MM-DD")}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    if (value) {
                                        const date = dateUtils.getFromDate(value);
                                        setMinDate(date);
                                        dispatch(change(SEARCH_FORM_CUSTOMER_REPORTS, "created_from_date", date));
                                    } else {
                                        setMinDate(null);
                                        dispatch(change(SEARCH_FORM_CUSTOMER_REPORTS, "created_from_date", ""));
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: new Date("2021-01-01").toISOString().slice(0, 10),
                                    max: maxDate
                                        ? new Date(maxDate).toISOString().slice(0, 10)
                                        : new Date().toISOString().slice(0, 10),
                                }}
                                fullWidth
                            />
                        </FieldWrapperLabel>
                        <FieldWrapperLabel item xs={12} sm={6}>
                            <MuiTextField
                                size="small"
                                name="created_to_date"
                                showLabel={true}
                                placeholder="Member To"
                                type="date"
                                value={moment(maxDate).format("YYYY-MM-DD")}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    if (value) {
                                        const date = dateUtils.getToDate(value);
                                        setMaxDate(date);
                                        dispatch(change(SEARCH_FORM_CUSTOMER_REPORTS, "created_to_date", date));
                                    } else {
                                        setMaxDate(null);
                                        dispatch(change(SEARCH_FORM_CUSTOMER_REPORTS, "created_to_date", ""));
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: minDate
                                        ? new Date(minDate).toISOString().slice(0, 10)
                                        : new Date("2021-01-01").toISOString().slice(0, 10),
                                    max: new Date().toISOString().slice(0, 10),
                                }}
                                fullWidth
                            />
                        </FieldWrapperLabel>
                        <FieldWrapperLabel item xs={12} sm={6}>
                            <Field
                                name="date_of_birth"
                                showLabel={true}
                                placeholder="Date of Birth"
                                type="date"
                                small={12}
                                component={TextField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: new Date("1920-01-01").toISOString().slice(0, 10),
                                    max: `${moment().subtract(18, "years").format("YYYY-MM-DD")}`,
                                }}
                            />
                        </FieldWrapperLabel>
                        <FieldWrapperLabel item xs={12} sm={6}>
                            <Field
                                name="kyc_status"
                                placeholder="Kyc Status"
                                type="text"
                                small={12}
                                component={SelectField}
                            >
                                <option disabled value="">
                                    Select Status
                                </option>
                                {reference &&
                                    reference
                                        ?.filter((ref_data) => ref_data.reference_type === 21)[0]
                                        .reference_data.map((data) => (
                                            <option value={data.value} key={data.reference_id}>
                                                {data.name}
                                            </option>
                                        ))}
                            </Field>
                        </FieldWrapperLabel>
                        <FieldWrapperLabel item xs={12} sm={6}>
                            <MuiTextField
                                size="small"
                                name="kyc_from_date"
                                label="Kyc Date From"
                                placeholder="Kyc Date From"
                                type="date"
                                value={moment(minKycDate).format("YYYY-MM-DD")}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    if (value) {
                                        const date = dateUtils.getFromDate(value);
                                        setMinKycDate(date);
                                        dispatch(change(SEARCH_FORM_CUSTOMER_REPORTS, "kyc_from_date", date));
                                    } else {
                                        setMinKycDate(null);
                                        dispatch(change(SEARCH_FORM_CUSTOMER_REPORTS, "kyc_from_date", ""));
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: new Date("2021-01-01").toISOString().slice(0, 10),
                                    max: maxKycDate
                                        ? new Date(maxKycDate).toISOString().slice(0, 10)
                                        : new Date().toISOString().slice(0, 10),
                                }}
                                fullWidth
                            />
                        </FieldWrapperLabel>
                        <FieldWrapperLabel item xs={12} sm={6}>
                            <MuiTextField
                                size="small"
                                name="kyc_to_date"
                                label="Kyc Date To"
                                placeholder="Kyc Date To"
                                type="date"
                                value={moment(maxKycDate).format("YYYY-MM-DD")}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    if (value) {
                                        const date = dateUtils.getToDate(value);
                                        setMaxKycDate(date);
                                        dispatch(change(SEARCH_FORM_CUSTOMER_REPORTS, "kyc_to_date", date));
                                    } else {
                                        setMaxKycDate(null);
                                        dispatch(change(SEARCH_FORM_CUSTOMER_REPORTS, "kyc_to_date", ""));
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: minKycDate
                                        ? new Date(minKycDate).toISOString().slice(0, 10)
                                        : new Date("2021-01-01").toISOString().slice(0, 10),
                                    max: new Date().toISOString().slice(0, 10),
                                }}
                                fullWidth
                            />
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

export default reduxForm({ form: SEARCH_FORM_CUSTOMER_REPORTS })(SearchForm);
