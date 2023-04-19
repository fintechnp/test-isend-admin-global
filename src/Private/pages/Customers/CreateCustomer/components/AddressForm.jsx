import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Field, Form, reduxForm } from "redux-form";
import { Grid, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { formValueSelector } from "redux-form";
import streetAction from "../../../Setup/StreetType/store/action";

import TextField from "../../../../../App/components/Fields/TextField";
import Validator from "../../../../../App/utils/validators";
import SelectField from "App/components/Fields/SelectField";

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

const CodeText = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    fontSize: "14px",
    paddingLeft: "8px",
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

const AddressForm = ({ handleSubmit, handleBack, activeStep, steps, id, code = 977, buttonText, form: formName }) => {
    const state = useSelector((state) => state.form[formName].values);
    const country = state.country;

    const { loading: streetTypeLoading, response: allStreetType } = useSelector((state) => state.get_street_type);

    const dispatch = useDispatch();

    useEffect(() => {
        if (state.country !== "") {
            dispatch(streetAction.get_street_type(state.country));
        }
    }, [country]);

    return (
        <Form onSubmit={handleSubmit}>
            <Container container direction="column">
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        {/* <FieldWrapper item xs={12} sm={6}>
                                <Field
                                    name="mobile_number"
                                    label="Mobile"
                                    type="text"
                                    small={12}
                                    component={TextField}
                                    validate={Validator.mobileValidator}
                                    InputProps={{
                                        startAdornment: (
                                            <Box
                                                sx={{
                                                    minWidth: "52px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <CodeText>+{code}</CodeText>
                                            </Box>
                                        ),
                                    }}
                                />
                            </FieldWrapper> */}
                        {!id && (
                            <FieldWrapper item xs={12} sm={6}>
                                <Field
                                    name="email"
                                    label="Email"
                                    type="email"
                                    small={12}
                                    component={TextField}
                                    validate={[Validator.emailValidator, Validator.minValue1]}
                                />
                            </FieldWrapper>
                        )}
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="postcode"
                                label="Post Code"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.emptyValidator, Validator.minValue1, Validator.maxLength10]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="unit"
                                label="Unit"
                                type="number"
                                small={12}
                                component={TextField}
                                validate={Validator.maxLength20}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="street"
                                label="Street"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.emptyValidator, Validator.minValue1, Validator.maxLength50]}
                            />
                        </FieldWrapper>
                        {country === "AUS" && (
                            <>
                                <FieldWrapper item xs={12} sm={6}>
                                    <Field
                                        name="street_type"
                                        label="Street Type"
                                        type="text"
                                        small={12}
                                        component={SelectField}
                                        validate={[Validator.emptyValidator]}
                                    >
                                        <option value="" disabled>
                                            Select Street Type
                                        </option>
                                        {allStreetType &&
                                            allStreetType?.data?.map((data, index) => (
                                                <option value={data.street_code} key={index}>
                                                    {data.street_name}
                                                </option>
                                            ))}
                                    </Field>
                                </FieldWrapper>
                                <FieldWrapper item xs={12} sm={6}>
                                    <Field
                                        name="street_no"
                                        label="Street No"
                                        type="text"
                                        small={12}
                                        component={TextField}
                                        validate={[
                                            Validator.emptyValidator,
                                            Validator.minValue1,
                                            Validator.maxLength50,
                                        ]}
                                    />
                                </FieldWrapper>
                            </>
                        )}
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="city"
                                label="City"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.emptyValidator, Validator.minValue1, Validator.maxLength50]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="state"
                                label="State"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={Validator.maxLength50}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="address"
                                label="Address"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={Validator.maxLength100}
                            />
                        </FieldWrapper>
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

export default reduxForm({ form: ["form"] })(AddressForm);
