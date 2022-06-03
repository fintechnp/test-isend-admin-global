import React from "react";
import { styled } from "@mui/material/styles";
import { Field, Form, reduxForm, reset } from "redux-form";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";

import Validator from "../../../../../App/utils/validators";
import CheckboxField from "../../../../../App/components/Fields/CheckboxField";
import SelectField from "../../../../../App/components/Fields/SelectField";

const BlockBox = styled(Box)(({ theme }) => ({
    width: "100%",
    marginTop: "12px",
    padding: "12px",
    border: `1px solid ${theme.palette.border.main}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
}));

const RefundButton = styled(LoadingButton)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    marginTop: "8px",
    textTransform: "capitalize",
    background: theme.palette.warning.main,
    "&:hover": {
        background: theme.palette.warning.dark,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

function RefundForm({ handleSubmit, loading }) {
    const reference = JSON.parse(localStorage.getItem("reference"));

    return (
        <Grid container sx={{ pb: "24px" }}>
            <Grid item xs={12}>
                <Form onSubmit={handleSubmit}>
                    <BlockBox>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                columnGap: 2,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Field
                                name="remarks"
                                type="text"
                                small={12}
                                component={SelectField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                    Validator.maxLength50,
                                ]}
                            >
                                <option value="" disabled>
                                    Select Reason
                                </option>
                                {reference &&
                                    reference
                                        ?.filter(
                                            (ref_data) =>
                                                ref_data.reference_type === 54
                                        )[0]
                                        .reference_data.map((data) => (
                                            <option
                                                value={data.value}
                                                key={data.reference_id}
                                            >
                                                {data.name}
                                            </option>
                                        ))}
                            </Field>
                            <Field
                                name="refund_charge"
                                label="Refund Charge"
                                small={4}
                                reverse="row-reverse"
                                component={CheckboxField}
                                validate={Validator.emptyValidator}
                            />
                        </Box>
                        <RefundButton
                            size="small"
                            variant="outlined"
                            loading={loading}
                            type="submit"
                        >
                            Refund
                        </RefundButton>
                    </BlockBox>
                </Form>
            </Grid>
        </Grid>
    );
}

export default reduxForm({ form: "refund_form_transaction" })(RefundForm);
