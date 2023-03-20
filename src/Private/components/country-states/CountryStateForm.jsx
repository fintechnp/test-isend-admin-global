import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { Field, Form, reduxForm } from "redux-form";

import TextField from "App/components/Fields/TextField";
import SelectField from "App/components/Fields/SelectField";

import Validator from "App/utils/validators";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import ModalGridFormContainer from "App/components/Container/ModalGridFormContainer";

const CountryStateForm = ({ handleSubmit, isAddMode, isProcessing, onCancel }) => {
    const country = JSON.parse(localStorage.getItem("country"));

    return (
        <Form onSubmit={handleSubmit}>
            <ModalGridFormContainer>
                <Grid item xs={12} md={6}>
                    <Field
                        name="country"
                        label="Country"
                        type="number"
                        small={12}
                        component={SelectField}
                        validate={[Validator.emptyValidator, Validator.minValue1]}
                        disabled={!isAddMode}
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
                    <Field
                        name="name"
                        label="State Name"
                        type="text"
                        small={12}
                        component={TextField}
                        validate={[Validator.emptyValidator, Validator.minValue1]}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Field
                        name="code"
                        label="State Code"
                        type="text"
                        small={12}
                        component={TextField}
                        validate={[Validator.emptyValidator, Validator.minValue1]}
                    />
                </Grid>
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

export default React.memo(reduxForm({ form: ["form"] })(CountryStateForm));

CountryStateForm.propTypes = {
    isAddMode: PropTypes.bool,
    onCancel: PropTypes.func,
    isProcessing: PropTypes.bool,
};
