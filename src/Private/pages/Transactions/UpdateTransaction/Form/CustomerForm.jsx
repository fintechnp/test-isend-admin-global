import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Field, Form, reduxForm } from "redux-form";
import { Grid, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";

import TextField from "../../../../../App/components/Fields/TextField";
import SelectField from "../../../../../App/components/Fields/SelectField";
import Validator from "../../../../../App/utils/validators";

const Container = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
        minWidth: "350px",
    },
}));

const FormWrapper = styled(Grid)(({ theme }) => ({
    padding: "8px 4px 16px",
    borderRadius: "4px",
    backgroundColor: theme.palette.background.light,
}));

const FieldWrapper = styled(Grid)(({ theme }) => ({
    padding: "1px 16px",
}));

const ButtonWrapper = styled(Grid)(({ theme }) => ({
    paddingTop: "12px",
}));

const BackButton = styled(Button)(({ theme }) => ({
    minWidth: "100px",
    borderRadius: "2px",
    textTransform: "capitalize",
    color: theme.palette.border.dark,
    borderColor: theme.palette.border.main,
    "&:hover": {
        borderColor: theme.palette.border.dark,
    },
}));

const NextButton = styled(Button)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    textTransform: "capitalize",
    background: theme.palette.primary.main,
    "&:hover": {
        background: theme.palette.primary.dark,
    },
}));

const CustomerForm = ({
    handleSubmit,
    handleBack,
    activeStep,
    steps,
    buttonText,
    customer_list,
    sending_partner,
}) => {
    const dispatch = useDispatch();
    const reference = JSON.parse(localStorage.getItem("reference"));
    const country = JSON.parse(localStorage.getItem("country"));

    useEffect(() => {
        dispatch({ type: "ADD_PARTNER_RESET" });
        dispatch({ type: "UPDATE_PARTNER_RESET" });
    }, [dispatch]);

    //hit api for customer, payout, sending

    return (
        <Form onSubmit={handleSubmit}>
            <Container container direction="column">
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="country"
                                label="Sending Country"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue3,
                                    Validator.maxLength3,
                                ]}
                            >
                                <option value="" disabled>
                                    Select Country
                                </option>
                                {country &&
                                    country.map((data) => (
                                        <option
                                            value={data.iso3}
                                            key={data.iso3}
                                        >
                                            {data.country}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="sending_agent_id"
                                label="Sending Partner"
                                type="number"
                                small={12}
                                component={SelectField}
                                validate={Validator.emptyValidator}
                            >
                                <option value="" disabled>
                                    Select Sending Partner
                                </option>
                                {sending_partner &&
                                    sending_partner.map((data) => (
                                        <option
                                            value={data.agent_id}
                                            key={data.agent_id}
                                        >
                                            {data.name}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="sending_branch_id"
                                label="Sending Branch"
                                type="number"
                                small={12}
                                component={SelectField}
                                validate={Validator.emptyValidator}
                            >
                                <option value="" disabled>
                                    Select Sending Branch
                                </option>
                                {sending_partner &&
                                    sending_partner.map((data) => (
                                        <option
                                            value={data.agent_id}
                                            key={data.agent_id}
                                        >
                                            {data.name}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="customer_id"
                                label="Customer"
                                type="number"
                                small={12}
                                component={SelectField}
                                validate={Validator.emptyValidator}
                            >
                                <option value="" disabled>
                                    Select Customer
                                </option>
                                {customer_list &&
                                    customer_list.map((data) => (
                                        <option
                                            value={data.customer_id}
                                            key={data.customer_id}
                                        >
                                            {data.first_name}{" "}
                                            {data?.middle_name
                                                ? data?.middle_name
                                                : ""}{" "}
                                            {data?.last_name}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                    </FormWrapper>
                </Grid>
                <Grid item>
                    <Divider sx={{ pt: 1.2 }} />
                </Grid>
                <Grid item>
                    <ButtonWrapper
                        container
                        columnGap={2}
                        direction="row"
                        alignItems="center"
                    >
                        <Grid item xs />
                        <Grid item>
                            <BackButton
                                size="small"
                                variant="outlined"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                            >
                                Previous
                            </BackButton>
                        </Grid>
                        <Grid item>
                            {activeStep !== steps.length && (
                                <NextButton
                                    size="small"
                                    variant="outlined"
                                    type="submit"
                                >
                                    {buttonText}
                                </NextButton>
                            )}
                        </Grid>
                    </ButtonWrapper>
                </Grid>
            </Container>
        </Form>
    );
};

export default reduxForm({ form: ["form"] })(CustomerForm);
