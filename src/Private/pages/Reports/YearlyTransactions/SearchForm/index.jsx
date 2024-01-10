import React from "react";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button'
import { styled } from "@mui/material/styles";
import { Field, Form, reduxForm } from "redux-form";

import SelectField from "App/components/Fields/SelectField";
import DatePickerField from "App/components/Fields/DatePickerField";

const Container = styled(Grid)(({ theme }) => ({
    width: "100%",
    marginTop: "8px",
    marginBottom: "12px",
    padding: "8px 0px",
    borderRadius: "4px",
    border: `1px solid ${theme.palette.border.main}`,
}));


const FormWrapper = styled(Grid)(({ theme }) => ({
    padding: "0px 12px",
}));

const FieldWrapper = styled(Grid)(({ theme }) => ({
    padding: "2px 4px",
}));

const FieldWrapperLabel = styled(Grid)(({ theme }) => ({
    padding: "4px 4px",
    "& .MuiInputBase-input": {
        opacity: 0.6,
    },
}));

const ButtonWrapper = styled(Grid)(({ theme }) => ({
    padding: "4px 0px",
    paddingRight: "4px",
}));


function SearchForm({ handleSubmit, handleReset, s_loading, SendPartner, loading }) {
    const handleResetButton = (e) => {
        handleReset();
    };

    return (
        <Container container>
            <Grid item xs={12}>
                <Form onSubmit={handleSubmit}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="sending_agent_id"
                                placeholder="Send Partner"
                                type="number"
                                small={12}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    {s_loading
                                        ? "Loading..."
                                        : "Select Send Partner"}
                                </option>
                                {!s_loading && SendPartner?.length === 0 && (
                                    <option value="" disabled>
                                        No Partners
                                    </option>
                                )}
                                {SendPartner &&
                                    SendPartner.map((data) => (
                                        <option
                                            value={data.agent_id}
                                            key={data?.tid}
                                        >
                                            {data.name}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapperLabel item xs={12} sm={6}>
                            <Field
                                name="transaction_year"
                                showLabel={true}
                                disableFuture
                                placeholder="Select Year"
                                views={["year"]}
                                inputFormat="YYYY"
                                small={12}
                                component={DatePickerField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FieldWrapperLabel>
                        <Grid item xs={12}>
                            <ButtonWrapper
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                columnSpacing={2}
                            >
                                <Grid item>
                                    <Button
                                        size="small"
                                        color="error"
                                        variant="contained"
                                        onClick={handleResetButton}
                                        disabled={loading}
                                    >
                                        Reset
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        type="submit"
                                        disabled={loading}

                                    >
                                        Filter
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

export default reduxForm({ form: "search_form_yearly_reports" })(SearchForm);
