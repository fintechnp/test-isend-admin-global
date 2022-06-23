import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Field, Form, reduxForm } from "redux-form";
import { Grid, Button, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";

import TextField from "../../../../../../App/components/Fields/TextField";
import SelectField from "../../../../../../App/components/Fields/SelectField";
import CheckboxField from "../../../../../../App/components/Fields/CheckboxField";
import Validator from "../../../../../../App/utils/validators";

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

const StatusText = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    paddingTop: "6px",
    paddingBottom: "-6px",
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

const CollectionForm = ({
    handleSubmit,
    handleBack,
    activeStep,
    steps,
    buttonText,
}) => {
    const dispatch = useDispatch();
    const reference = JSON.parse(localStorage.getItem("reference"));
    const country = JSON.parse(localStorage.getItem("country"));
    const [payment_type, setPaymentType] = useState(null);
    const [bank_name, setBankName] = useState(null);
    const [filterSchema, setFilterSchema] = useState({
        page_number: 1,
        payout_country: "",
        payment_type: "",
        sort_by: "payment_type",
        order_by: "ASC",
    });

    const { response: deliveryoption_data, loading: d_loading } = useSelector(
        (state) => state.get_all_delivery_option
    );
    const { response: payoutloaction_data, loading: p_loading } = useSelector(
        (state) => state.get_all_payout_location
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Container container direction="column">
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="delivery_option_id"
                                label="Delivery Option"
                                type="text"
                                small={12}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    Select Delivery Option
                                </option>
                                {deliveryoption_data?.data &&
                                    deliveryoption_data?.data?.map(
                                        (deliver) => (
                                            <option
                                                value={
                                                    deliver.delivery_option_id
                                                }
                                                key={deliver.delivery_option_id}
                                            >
                                                {deliver.delivery_name}
                                            </option>
                                        )
                                    )}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="payout_location_id"
                                label="Payout Location"
                                type="text"
                                small={12}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    Select Payout Location
                                </option>
                                {payoutloaction_data?.data &&
                                    payoutloaction_data?.data?.map(
                                        (deliver) => (
                                            <option
                                                value={
                                                    deliver?.payout_location_id
                                                }
                                                key={
                                                    deliver?.payout_location_id
                                                }
                                            >
                                                {deliver?.location_name}
                                            </option>
                                        )
                                    )}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="account_number"
                                label="Account Number"
                                type="text"
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
                                name="account_type	"
                                label="Account Type"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                ]}
                            >
                                <option value="" disabled>
                                    Select Account Type
                                </option>
                                <option value="S"> Saving </option>
                                <option value="C"> Current </option>
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="branch_identifier_type"
                                label="Branch Identifier Type"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={Validator.emptyValidator}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="branch_identifier_value"
                                label="Branch Identifier Value"
                                type="number"
                                small={12}
                                component={TextField}
                                validate={Validator.emptyValidator}
                            />
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

export default reduxForm({ form: ["form"] })(CollectionForm);
