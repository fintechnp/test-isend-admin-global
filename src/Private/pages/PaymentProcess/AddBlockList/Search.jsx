import React from "react";
import { styled } from "@mui/material/styles";
import { Field, Form, reduxForm, reset } from "redux-form";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";

import Validator from "../../../../App/utils/validators";
import SelectField from "../../../../App/components/Fields/SelectField";
import TextField from "../../../../App/components/Fields/TextField";

const Container = styled(Grid)(({ theme }) => ({
    width: "100%",
    marginTop: "8px",
    padding: "8px 0px",
    borderRadius: "4px",
    border: `1px solid ${theme.palette.border.main}`,
}));

const FormWrapper = styled(Grid)(({ theme }) => ({
    padding: "0px 12px",
}));

const FieldWrapper = styled(Grid)(({ theme }) => ({
    padding: "1px 4px",
}));

const ButtonWrapper = styled(Grid)(({ theme }) => ({
    padding: "4px 0px",
    paddingRight: "4px",
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
    },
}));

function Search({ handleSubmit, loading }) {
    const [id, setId] = React.useState("transaction_id");
    const [name, setName] = React.useState("Transaction Id");

    const handleId = (e) => {
        setId(e.target.value);
        if (e.target.value === "pin_number") {
            setName("Pin Number");
        } else {
            setName("Transaction id");
        }
    };

    return (
        <Container container>
            <Grid item xs={12}>
                <Form onSubmit={handleSubmit}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={8}>
                            <Field
                                name={id}
                                placeholder={name}
                                type={
                                    name === "Transaction id"
                                        ? "number"
                                        : "text"
                                }
                                small={12}
                                component={TextField}
                                validate={Validator.emptyValidator}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={4}>
                            <Field
                                name="type"
                                placeholder="Select Type"
                                type="text"
                                small={12}
                                onChange={handleId}
                                component={SelectField}
                            >
                                <option
                                    value="transaction_id"
                                    name="Transaction Id"
                                >
                                    Transaction Id
                                </option>
                                <option value="pin_number" name="Pin Number">
                                    Pin Number
                                </option>
                            </Field>
                        </FieldWrapper>
                        <Grid item xs={12}>
                            <ButtonWrapper
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                            >
                                <Grid item>
                                    <SearchButton
                                        size="small"
                                        variant="outlined"
                                        loading={loading}
                                        type="submit"
                                    >
                                        Search
                                    </SearchButton>
                                </Grid>
                            </ButtonWrapper>
                        </Grid>
                    </FormWrapper>
                </Form>
            </Grid>
        </Container>
    );
}

export default reduxForm({ form: "search_form_transaction" })(Search);
