import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { Field, Form, reduxForm, change } from "redux-form";

import TextField from "App/components/Fields/TextField";
import SelectField from "App/components/Fields/SelectField";

import Validator from "App/utils/validators";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import ModalGridFormContainer from "App/components/Container/ModalGridFormContainer";
import CheckboxField from "App/components/Fields/CheckboxField";

const FundingSourceForm = ({ handleSubmit, isAddMode, isProcessing, onCancel }) => {
    const country = JSON.parse(localStorage.getItem("country"));

    const dispatch = useDispatch();

    const handleChangeCountry = (e) => {
        const value = e.target.value;
        const selectedCountry = country?.filter((c) => c?.iso3 === value)?.[0];
        const currency = selectedCountry ? selectedCountry?.currency : "";
        dispatch(change(isAddMode ? "add_funding_source_form" : "edit_funding_source_form", "currency", currency));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <ModalGridFormContainer>
                <Grid item xs={12} md={6}>
                    <Field
                        name="payment_name"
                        label="Payment Name"
                        type="text"
                        small={12}
                        component={TextField}
                        validate={[Validator.emptyValidator, Validator.minValue1, Validator.maxLength100]}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Field
                        name="payment_value"
                        label="Payment Value"
                        type="text"
                        small={12}
                        component={TextField}
                        validate={[Validator.emptyValidator, Validator.minValue1, Validator.maxLength50]}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Field
                        name="country"
                        label="Country"
                        type="number"
                        small={12}
                        component={SelectField}
                        validate={[Validator.emptyValidator, Validator.minValue1]}
                        disabled={!isAddMode}
                        onChange={handleChangeCountry}
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
                </Grid>
                <Grid item xs={12} md={6}>
                    <Field name="currency" label="Currency" type="text" small={12} component={TextField} disabled />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        name="description"
                        label="Description"
                        type="text"
                        small={12}
                        component={TextField}
                        validate={[Validator.emptyValidator, Validator.minValue1, Validator.maxLength50]}
                    />
                </Grid>
                {!isAddMode && (
                    <Grid item xs={12}>
                        <Field
                            name="is_active"
                            label="Active"
                            small={12}
                            reverse="row-reverse"
                            component={CheckboxField}
                        />
                    </Grid>
                )}
                <Grid item xs={12}>
                    <ButtonWrapper>
                        <CancelButton onClick={onCancel} disabled={isProcessing}>
                            Cancel
                        </CancelButton>
                        <SubmitButton isLoading={isProcessing} isAddMode={isAddMode} />
                    </ButtonWrapper>
                </Grid>
            </ModalGridFormContainer>
        </Form>
    );
};

export default React.memo(reduxForm({ form: ["form"] })(FundingSourceForm));

FundingSourceForm.propTypes = {
    isAddMode: PropTypes.bool,
    onCancel: PropTypes.func,
    isProcessing: PropTypes.bool,
};
