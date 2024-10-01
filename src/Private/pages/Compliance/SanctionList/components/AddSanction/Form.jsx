import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { change, Field, Form, reduxForm } from "redux-form";
import { Grid, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import Divider from "@mui/material/Divider";

import TextField from "../../../../../../App/components/Fields/TextField";
import SelectField from "../../../../../../App/components/Fields/SelectField";
import CheckboxField from "../../../../../../App/components/Fields/CheckboxField";
import Validator from "../../../../../../App/utils/validators";

const Container = styled(Grid)(({ theme }) => ({
    maxWidth: "900px",
    borderRadius: "5px",
    [theme.breakpoints.up("sm")]: {
        minWidth: "350px",
    },
}));

const FormWrapper = styled(Grid)(({ theme }) => ({
    padding: "6px 0px 16px",
    backgroundColor: theme.palette.background.light,
}));

const FieldWrapper = styled(Grid)(({ theme }) => ({
    padding: "1px 16px",
}));

const ButtonWrapper = styled(Grid)(({ theme }) => ({
    paddingTop: "12px",
}));

const CancelButton = styled(Button)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    textTransform: "capitalize",
    background: theme.palette.warning.main,
    "&:hover": {
        background: theme.palette.warning.dark,
    },
}));

const CreateButton = styled(LoadingButton)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    textTransform: "capitalize",
    background: theme.palette.primary.main,
    "&:hover": {
        background: theme.palette.primary.dark,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

const PaymentRulesForm = ({ handleSubmit, update, loading, buttonText, handleClose }) => {
    const country = JSON.parse(localStorage.getItem("country"));
    const reference = JSON.parse(localStorage.getItem("reference"));

    return (
        <Form onSubmit={handleSubmit}>
            <Container container direction="column">
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="name"
                                label="Name"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.emptyValidator, Validator.minValue1]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="type"
                                label="Type"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={Validator.emptyValidator}
                            >
                                <option value="" disabled>
                                    Select Type
                                </option>
                                {reference &&
                                    reference
                                        ?.filter((ref_data) => ref_data.reference_type === 37)[0]
                                        ?.reference_data.map((data) => (
                                            <option value={data.value} key={data.reference_id}>
                                                {data.name}
                                            </option>
                                        ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="country"
                                label="Country"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[Validator.emptyValidator, Validator.minValue1]}
                            >
                                <option value="" disabled>
                                    Select Sending Country
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
                            <Field name="address" label="Address" type="text" small={12} component={TextField} />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="dob"
                                label="Date of Birth"
                                type="date"
                                small={12}
                                component={TextField}
                                inputProps={{
                                    max: new Date().toISOString().slice(0, 10),
                                }}
                                validate={Validator.emptyValidator}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="source"
                                label="Source"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.emptyValidator, Validator.minValue1]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field name="ref1" label="Reference 1" type="text" small={12} component={TextField} />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field name="ref2" label="Reference 2" type="text" small={12} component={TextField} />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="remarks"
                                label="Remarks"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.emptyValidator, Validator.minValue1]}
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
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Grid item>
                            <CancelButton size="small" variant="contained" onClick={handleClose}>
                                Cancel
                            </CancelButton>
                        </Grid>
                        <Grid item>
                            <CreateButton
                                size="small"
                                variant="outlined"
                                loading={loading}
                                endIcon={update ? <UpdateIcon /> : <AddIcon />}
                                type="submit"
                            >
                                {buttonText}
                            </CreateButton>
                        </Grid>
                    </ButtonWrapper>
                </Grid>
            </Container>
        </Form>
    );
};

export default reduxForm({ form: ["form"] })(PaymentRulesForm);
