import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Field, Form, reduxForm } from "redux-form";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

import Validator from "App/utils/validators";
import TextField from "App/components/Fields/TextField";
import SelectField from "App/components/Fields/SelectField";

const Container = styled(Grid)(({ theme }) => ({
    width: "100%",
    marginTop: "8px",
    marginBottom: "12px",
    padding: "8px 0px",
    borderRadius: "4px",
    border: `1px solid ${theme.palette.border.main}`,
}));

const TitleWrapper = styled(Box)(({ theme }) => ({
    paddingBottom: "8px",
    display: "flex",
    paddingLeft: "14px",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
        alignItems: "flex-start",
        flexDirection: "column",
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: "18px",
    fontWeight: 600,
    paddingLeft: "8px",
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

function SearchForm({ handleSubmit, loading }) {
    const dispatch = useDispatch();
    const [id, setId] = React.useState("transaction_id");
    const [name, setName] = React.useState("Transaction Id");

    const handleId = (e) => {
        setId(e.target.value);
        if (e.target.value === "pin_number") {
            setName("Pin Number");
        } else {
            setName("Transaction id");
        }
        dispatch({ type: "GET_TRANSACTION_REFUND_BLOCK_RESET" });
    };

    return (
        <Container container>
            <Grid item xs={12}>
                <TitleWrapper>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <ContentPasteSearchIcon sx={{ color: "primary.main", fontSize: "28px" }} />
                        <Title> Search Transaction </Title>
                    </Box>
                </TitleWrapper>
            </Grid>
            <Grid item xs={12}>
                <Form onSubmit={handleSubmit}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={8}>
                            <Field
                                name={id}
                                placeholder={name}
                                type="text"
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
                                <option value="transaction_id" name="Transaction Id">
                                    Transaction Id
                                </option>
                                <option value="pin_number" name="Pin Number">
                                    Pin Number
                                </option>
                            </Field>
                        </FieldWrapper>
                        <Grid item xs={12}>
                            <ButtonWrapper container direction="row" justifyContent="flex-end" alignItems="center">
                                <Grid item>
                                    <Button variant="contained" type="submit" disabled={loading}>
                                        Search
                                    </Button>
                                </Grid>
                            </ButtonWrapper>
                        </Grid>
                    </FormWrapper>
                </Form>
            </Grid>
        </Container>
    );
}

export default reduxForm({ form: "search_form_transaction" })(SearchForm);
