import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { change, Field, Form, reduxForm } from "redux-form";

import TextField from "App/components/Fields/TextField";
import SelectField from "App/components/Fields/SelectField";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";
import CheckboxField from "App/components/Fields/CheckboxField";

import Validator from "App/utils/validators";
import actions from "./../../../../Setup/Partner/store/actions";


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

const StatusText = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    paddingTop: "6px",
    paddingBottom: "-6px",
}));

const ButtonWrapper = styled(Grid)(({ theme }) => ({
    paddingTop: "12px",
}));

const AccountForm = ({ handleSubmit, user_type, update, loading, buttonText, handleClose }) => {
    const dispatch = useDispatch();
    const [type, setType] = useState(null);
    const reference = JSON.parse(localStorage.getItem("reference"));
    const { response: partner_data } = useSelector((state) => state.get_all_partner);

    useEffect(() => {
        if (user_type) {
            dispatch(actions.get_all_partner());
            setType(user_type);
        }
    }, [user_type]);

    const handleType = (e) => {
        setType(e.target.value);
        if (e.target.value !== "PARTNER") {
            dispatch(change("add_user_form", "agent_id", 0));
        } else {
            dispatch(actions.get_all_partner());
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Container container direction="column">
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="first_name"
                                label="First Name"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.emptyValidator, Validator.minValue1]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field name="last_name" label="Last Name" type="text" small={12} component={TextField} />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="phone_number"
                                label="Mobile No"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.mobileValidator, Validator.minValue1]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="email"
                                label="E-mail"
                                type="email"
                                small={12}
                                component={TextField}
                                validate={[Validator.emailValidator, Validator.minValue1]}
                            />
                        </FieldWrapper>
                        {!update && (
                            <>
                                {" "}
                                <FieldWrapper item xs={12} sm={6}>
                                    <Field
                                        name="password"
                                        label="Password"
                                        type="password"
                                        small={12}
                                        autoComplete="new-password"
                                        component={TextField}
                                        validate={Validator.passwordValidator}
                                    />
                                </FieldWrapper>
                                <FieldWrapper item xs={12} sm={6}>
                                    <Field
                                        name="confirm_password"
                                        label="Confirm Password"
                                        type="password"
                                        small={12}
                                        component={TextField}
                                        validate={Validator.confirmValidator}
                                    />
                                </FieldWrapper>
                            </>
                        )}
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="user_type"
                                label="User Type"
                                type="text"
                                small={12}
                                component={SelectField}
                                onChange={handleType}
                                validate={Validator.emptyValidator}
                            >
                                <option value="" disabled>
                                    Select User Type
                                </option>
                                {reference &&
                                    reference
                                        ?.filter((ref_data) => ref_data.reference_type === 55)[0]
                                        ?.reference_data.map((data) => (
                                            <option value={data.value} key={data.reference_id}>
                                                {data.name}
                                            </option>
                                        ))}
                            </Field>
                        </FieldWrapper>
                        {type === "PARTNER" && (
                            <FieldWrapper item xs={12} sm={6}>
                                <Field
                                    name="agent_id"
                                    label="Partner"
                                    type="number"
                                    small={12}
                                    component={SelectField}
                                    validate={Validator.integerValidator}
                                >
                                    <option value="" disabled>
                                        Select Partner
                                    </option>
                                    {partner_data?.data &&
                                        partner_data?.data.map((data) => (
                                            <option value={data.agent_id} key={data.agent_id}>
                                                {data.name}
                                            </option>
                                        ))}
                                </Field>
                            </FieldWrapper>
                        )}
                        <FieldWrapper item xs={12} sm={6}>
                            <Grid container sx={{ height: "100%" }}>
                                <Grid item xs={12}>
                                    <StatusText component="p">Status</StatusText>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="is_active"
                                        label="Active"
                                        small={12}
                                        reverse="row-reverse"
                                        component={CheckboxField}
                                    />
                                </Grid>
                            </Grid>
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
                            <CancelButton onClick={handleClose} disabled={loading} />
                        </Grid>
                        <Grid item>
                            <SubmitButton disabled={loading}>{buttonText}</SubmitButton>
                        </Grid>
                    </ButtonWrapper>
                </Grid>
            </Container>
        </Form>
    );
};

export default reduxForm({ form: ["form"] })(AccountForm);
