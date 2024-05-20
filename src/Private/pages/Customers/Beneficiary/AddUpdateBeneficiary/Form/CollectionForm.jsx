import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Field, Form, change, getFormValues, reduxForm } from "redux-form";
import { Grid, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { formValueSelector } from "redux-form";

import TextField from "../../../../../../App/components/Fields/TextField";
import SelectField from "../../../../../../App/components/Fields/SelectField";
import Validator from "../../../../../../App/utils/validators";
import locationActions from "./../../../../Setup/PayoutLocation/store/actions";
import deliveryOptionActions from "Private/pages/Setup/DeliveryOption/store/actions";

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

const CollectionForm = ({
    handleSubmit,
    handleBack,
    activeStep,
    steps,
    update,
    buttonText,
    pcountry,
    payment_type,
    delivery_option_id,
}) => {
    const formName = update ? "update_beneficiary_form" : "add_beneficiary_form";

    const formValues = useSelector((state) => getFormValues(formName)(state));

    const dispatch = useDispatch();
    const [option, setOption] = useState(null);
    const [filterSchema, setFilterSchema] = useState({
        page_number: 1,
        page_size: 100,
        country: "",
        payment_type: "",
        sort_by: "created_ts",
        order_by: "DESC",
    });
    const { response: deliveryoption_data, loading: d_loading } = useSelector((state) => state.get_all_delivery_option);
    const { response: payoutloaction_data, loading: p_loading } = useSelector((state) => state.get_all_payout_location);

    const reference = JSON.parse(localStorage.getItem("reference"));

    const [additionalPayoutInformation, setAdditionalPayoutInformation] = useState(undefined);

    useEffect(() => {
        const additionalPayoutInformation = reference
            ?.filter((ref_data) => ref_data?.reference_type === 40)?.[0]
            ?.reference_data?.find((d) => d.name?.toUpperCase() === formValues?.country?.toUpperCase());

        if (additionalPayoutInformation && formValues?.payment_type === "B") {
            setAdditionalPayoutInformation(additionalPayoutInformation);
            dispatch(change(formName, "branch_identifier_type", additionalPayoutInformation?.value ?? null));
            dispatch(
                change(
                    formName,
                    "beneficiary_form_payout_branch_identifier_value_regex",
                    additionalPayoutInformation?.description ?? "",
                ),
            );
        } else {
            setAdditionalPayoutInformation(undefined);
            dispatch(change(formName, "branch_identifier_type", null));
            dispatch(change(formName, "branch_identifier_value", null));
        }
    }, [formValues?.country, formValues?.delivery_option_id, formValues?.payment_type]);

    useEffect(() => {
        if (pcountry && payment_type) {
            const updatedFilterSchema = {
                ...filterSchema,
                payout_country: pcountry,
                payment_type: payment_type,
            };
            setFilterSchema(updatedFilterSchema);
        }
    }, [pcountry, payment_type]);

    useEffect(() => {
        if (formValues?.country) {
            dispatch(
                deliveryOptionActions.get_all_delivery_option({
                    payout_country: formValues.country,
                    page_number: 1,
                    page_size: 1000,
                }),
            );
        }
    }, [formValues?.country]);

    const payoutLocationLabel =
        formValues?.payment_type === "B"
            ? "Bank"
            : formValues?.payment_type === "W"
                ? "Choose Wallet"
                : formValues?.payment_type === "C"
                    ? "Choose cash pickup location"
                    : "Payout Location";

    useEffect(() => {
        if (formValues?.payment_type && formValues?.country) {
            dispatch(
                locationActions.get_all_payout_location({
                    country: formValues.country,
                    payment_type: formValues.payment_type,
                    page_number: 1,
                    page_size: 2000,
                }),
            );
        }
    }, [formValues?.payment_type, formValues?.country]);

    const handleOption = (e, deliveryoption) => {
        if (deliveryoption) {
            const filt_data = deliveryoption.filter((del) => del?.delivery_option_id == e.target.value);
            if (filt_data !== undefined || filt_data.length !== 0) {
                const updatedFilterSchema = {
                    ...filterSchema,
                    country: filt_data[0]?.country_code,
                    payment_type: filt_data[0]?.payment_type,
                };
                setFilterSchema(updatedFilterSchema);
                setOption(filt_data[0]);
                if (update) {
                    dispatch(change("update_beneficiary_form", "payment_type", filt_data[0]?.payment_type));
                } else {
                    dispatch(change("add_beneficiary_form", "payment_type", filt_data[0]?.payment_type));
                }
            }
        }
    };


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
                                onChange={(e) => handleOption(e, deliveryoption_data?.data)}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    Select Delivery Option
                                </option>
                                {deliveryoption_data?.data &&
                                    deliveryoption_data?.data?.map((deliver) => (
                                        <option value={deliver.delivery_option_id} key={deliver.delivery_option_id}>
                                            {deliver.delivery_name}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        {option?.payment_type === "B" || formValues?.payment_type === "B" ? (
                            <>
                                <FieldWrapper item xs={12} sm={6}>
                                    <Field
                                        name="payout_location_id"
                                        label={payoutLocationLabel}
                                        type="text"
                                        small={12}
                                        component={SelectField}
                                    >
                                        <option value="" disabled>
                                            Select Payout Location
                                        </option>
                                        {payoutloaction_data?.data &&
                                            payoutloaction_data?.data?.map((deliver) => (
                                                <option
                                                    value={deliver?.payout_location_id}
                                                    key={deliver?.payout_location_id}
                                                >
                                                    {deliver?.location_name}
                                                </option>
                                            ))}
                                    </Field>
                                </FieldWrapper>
                                <FieldWrapper item xs={12} sm={6}>
                                    <Field
                                        name="account_number"
                                        label="Account Number"
                                        type="text"
                                        small={12}
                                        component={TextField}
                                        validate={[Validator.emptyValidator, Validator.minValue1]}
                                    />
                                </FieldWrapper>

                                {additionalPayoutInformation && (
                                    <FieldWrapper item xs={12} sm={6}>
                                        <Field
                                            label={formValues?.branch_identifier_type ?? "undefned"}
                                            name="branch_identifier_value"
                                            type="text"
                                            small={12}
                                            component={TextField}
                                            validate={
                                                (Validator.emptyValidator,
                                                    Validator.beneficiaryFormBranchIdentifierValueValidate)
                                            }
                                        />
                                    </FieldWrapper>
                                )}

                            </>
                        ) : (
                            <FieldWrapper item xs={12} sm={6}>
                                <Field
                                    name="payout_location_id"
                                    label={payoutLocationLabel}
                                    type="text"
                                    small={12}
                                    component={SelectField}
                                >
                                    <option value="" disabled>
                                        Select Payout Location
                                    </option>
                                    {payoutloaction_data?.data &&
                                        payoutloaction_data?.data?.map((deliver) => (
                                            <option
                                                value={deliver?.payout_location_id}
                                                key={deliver?.payout_location_id}
                                            >
                                                {deliver?.location_name}
                                            </option>
                                        ))}
                                </Field>
                            </FieldWrapper>
                        )}
                    </FormWrapper>
                </Grid>
                <Grid item>
                    <Divider sx={{ pt: 1.2 }} />
                </Grid>
                <Grid item>
                    <ButtonWrapper container columnGap={2} direction="row" alignItems="center">
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
                                <NextButton size="small" variant="outlined" type="submit">
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
