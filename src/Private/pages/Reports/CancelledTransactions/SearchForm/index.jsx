import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button'
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
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
        border: `1px solid ${theme.palette.warning.main}`,
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
        border: `1px solid ${theme.palette.primary.main}`,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

function SearchForm({
    handleSubmit,
    handleReset,
    s_loading,
    p_loading,
    PayPartner,
    SendPartner,
    loading
}) {
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
                <Form onSubmit={handleSubmit}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="transaction_id"
                                placeholder="Transaction Id"
                                type="number"
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
                            <Field
                                name="sending_agent_id"
                                placeholder="Send Partner"
                                type="number"
                                small={12}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    {s_loading
                                        ? "Loading..."
                                        : "Select Send Partner"}
                                </option>
                                {!s_loading && SendPartner?.length === 0 && (
                                    <option value="" disabled>
                                        No Partners
                                    </option>
                                )}
                                {SendPartner &&
                                    SendPartner.map((data) => (
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
                                placeholder="Payout Partner"
                                type="number"
                                small={12}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    {p_loading
                                        ? "Loading..."
                                        : "Select Payout Partner"}
                                </option>
                                {!p_loading && PayPartner?.length === 0 && (
                                    <option value="" disabled>
                                        No Partners
                                    </option>
                                )}
                                {PayPartner &&
                                    PayPartner.map((data) => (
                                        <option
                                            value={data.agent_id}
                                            key={data?.tid}
                                        >
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
                                    min: new Date("2021-01-01")
                                        .toISOString()
                                        .slice(0, 10),
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
                                        ? new Date(minDate)
                                              .toISOString()
                                              .slice(0, 10)
                                        : new Date("2021-01-01")
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
                                    <Button
                                        size="small"
                                        variant="contained"
                                        type="submit"
                                        disabled={loading}
                                    >
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

export default reduxForm({ form: "search_form_cancel_reports" })(SearchForm);
