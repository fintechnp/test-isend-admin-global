import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Field, change, Form, reduxForm } from "redux-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";

import TextField from "../../../../../../App/components/Fields/TextField";
import SelectField from "../../../../../../App/components/Fields/SelectField";
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

const Basic = ({ handleSubmit, handleBack, activeStep, steps, buttonText, update, pcountry, phone_code }) => {
    const dispatch = useDispatch();

    const [code, setCode] = useState("01");

    const reference = JSON.parse(localStorage.getItem("reference"));

    const country = JSON.parse(localStorage.getItem("country"));
    const [filterSchema, setFilterSchema] = useState({
        page_number: 1,
        page_size: 100,
        payout_country: "",
        sort_by: "created_ts",
        order_by: "DESC",
    });

    useEffect(() => {
        if (phone_code) {
            setCode(phone_code);
        }
    }, [phone_code]);

    useEffect(() => {
        if (pcountry) {
            const updatedFilterSchema = {
                ...filterSchema,
                payout_country: pcountry,
            };
            setFilterSchema(updatedFilterSchema);
        }
    }, [pcountry]);

    useEffect(() => {
        if (filterSchema?.payout_country) {
            dispatch({ type: "GET_DELIVERY_OPTION", query: filterSchema });
        }
    }, [dispatch, filterSchema]);




    return (
        <Form onSubmit={handleSubmit}>
            <Container container direction="column">
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="relation"
                                label="Relation"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={Validator.emptyValidator}
                            >
                                <option value="" disabled>
                                    Select Relation
                                </option>

                                {reference &&
                                    reference
                                        ?.filter((ref_data) => ref_data?.reference_type === 18)[0]
                                        ?.reference_data?.map((data) => (
                                            <option value={data?.value} key={data?.reference_id}>
                                                {data?.name}
                                            </option>
                                        ))}
                            </Field>
                        </FieldWrapper>

                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="first_name"
                                label="First Name"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[Validator.emptyValidator, Validator.minValue1, Validator.maxLength50]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="middle_name"
                                label="Middle Name (Optional)"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={Validator.maxLength50}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="last_name"
                                label="Last Name"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={Validator.maxLength50}
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

export default reduxForm({ form: ["form"] })(Basic);
