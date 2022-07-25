import React from "react";
import { styled } from "@mui/material/styles";
import { Field, Form, reduxForm } from "redux-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

import TextField from "../../../../../App/components/Fields/TextField";
import SelectField from "../../../../../App/components/Fields/SelectField";

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

const ResetButton = styled(LoadingButton)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    marginTop: "8px",
    textTransform: "capitalize",
    border: `1px solid ${theme.palette.warning.main}`,
    background: theme.palette.warning.main,
    "&:hover": {
        background: theme.palette.warning.dark,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

const SearchButton = styled(LoadingButton)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    marginTop: "8px",
    textTransform: "capitalize",
    background: theme.palette.primary.main,
    "&:hover": {
        background: theme.palette.primary.dark,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

function SearchForm({
    handleSubmit,
    handleReset,
    handlePartner,
    partner,
    loading,
}) {
    const country = JSON.parse(localStorage.getItem("country"));
    const reference = JSON.parse(localStorage.getItem("reference"));
    const [ctry, setCountry] = React.useState(null);
    const [minDate, setMinDate] = React.useState(null);
    const [maxDate, setMaxDate] = React.useState(null);
    const [minKycDate, setMinKycDate] = React.useState(null);
    const [maxKycDate, setMaxKycDate] = React.useState(null);

    const handleResetButton = (e) => {
        setMinDate(null);
        setMaxDate(null);
        setMinKycDate(null);
        setMaxKycDate(null);
        setCountry(null);
        handleReset();
    };

    const handleCountry = (e) => {
        handlePartner(e);
        setCountry(e.target.value);
    };

    return (
        <Container container>
            <Grid item xs={12}>
                <TitleWrapper>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <ContentPasteSearchIcon
                            sx={{ color: "primary.main", fontSize: "28px" }}
                        />
                        <Title> Search Customers </Title>
                    </Box>
                </TitleWrapper>
            </Grid>
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
                            <Field
                                name="name"
                                placeholder="Name"
                                type="text"
                                small={12}
                                component={TextField}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="country"
                                placeholder="Country"
                                type="text"
                                small={12}
                                onChange={handleCountry}
                                component={SelectField}
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
                                        <option
                                            value={data.iso3}
                                            key={data.tid}
                                        >
                                            {data.country}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        {ctry && (
                            <FieldWrapper item xs={12} sm={6}>
                                <Field
                                    name="agent_id"
                                    placeholder="Agent"
                                    type="number"
                                    small={12}
                                    component={SelectField}
                                >
                                    <option value="" disabled>
                                        {loading
                                            ? "Loading..."
                                            : "Select Agent"}
                                    </option>
                                    {!loading && partner?.length === 0 && (
                                        <option value="" disabled>
                                            No Partners
                                        </option>
                                    )}
                                    {partner &&
                                        partner.map((data) => (
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
                            <Field
                                name="email"
                                placeholder="email"
                                type="email"
                                small={12}
                                component={TextField}
                            />
                        </FieldWrapper>
                        <FieldWrapperLabel item xs={12} sm={6}>
                            <Field
                                name="created_from_date"
                                showLabel={true}
                                placeholder="Member From"
                                type="date"
                                small={12}
                                component={TextField}
                                onChange={(e) => setMinDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    max: maxDate
                                        ? new Date(maxDate)
                                              .toISOString()
                                              .slice(0, 10)
                                        : new Date().toISOString().slice(0, 10),
                                }}
                            />
                        </FieldWrapperLabel>
                        <FieldWrapperLabel item xs={12} sm={6}>
                            <Field
                                name="created_to_date"
                                showLabel={true}
                                placeholder="Member To"
                                type="date"
                                small={12}
                                component={TextField}
                                onChange={(e) => setMaxDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: new Date(minDate)
                                        .toISOString()
                                        .slice(0, 10),
                                    max: new Date().toISOString().slice(0, 10),
                                }}
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
                                    max: new Date().toISOString().slice(0, 10),
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
                                        ?.filter(
                                            (ref_data) =>
                                                ref_data.reference_type === 21
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
                        </FieldWrapperLabel>
                        <FieldWrapperLabel item xs={12} sm={6}>
                            <Field
                                name="kyc_from_date"
                                showLabel={true}
                                placeholder="Kyc Date From"
                                type="date"
                                small={12}
                                component={TextField}
                                onChange={(e) => setMinKycDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    max: maxKycDate
                                        ? new Date(maxKycDate)
                                              .toISOString()
                                              .slice(0, 10)
                                        : new Date().toISOString().slice(0, 10),
                                }}
                            />
                        </FieldWrapperLabel>
                        <FieldWrapperLabel item xs={12} sm={6}>
                            <Field
                                name="kyc_to_date"
                                showLabel={true}
                                placeholder="Kyc Date To"
                                type="date"
                                small={12}
                                component={TextField}
                                onChange={(e) => setMaxKycDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: new Date(minKycDate)
                                        .toISOString()
                                        .slice(0, 10),
                                    max: new Date().toISOString().slice(0, 10),
                                }}
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
                                    <ResetButton
                                        size="small"
                                        variant="outlined"
                                        onClick={handleResetButton}
                                    >
                                        Reset
                                    </ResetButton>
                                </Grid>
                                <Grid item>
                                    <SearchButton
                                        size="small"
                                        variant="outlined"
                                        type="submit"
                                    >
                                        Search
                                    </SearchButton>
                                </Grid>
                            </ButtonWrapper>
                        </Grid>
                    </FormWrapper>
                </Form>
            </Grid>
        </Container>
    );
}

export default reduxForm({ form: "search_form_customer_reports" })(SearchForm);
