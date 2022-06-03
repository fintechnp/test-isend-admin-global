import React from "react";
import { styled } from "@mui/material/styles";
import { Field, Form, reduxForm } from "redux-form";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";

import Validator from "../../../../../App/utils/validators";
import TextAreaField from "../../../../../App/components/Fields/TextAreaField";

const BlockBox = styled(Box)(({ theme }) => ({
    width: "100%",
    marginTop: "12px",
    padding: "12px",
    border: `1px solid ${theme.palette.border.main}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
}));

const BlockButton = styled(LoadingButton)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    marginTop: "8px",
    textTransform: "capitalize",
    background: theme.palette.primary.main,
    "&:hover": {
        background: theme.palette.primary.dark,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

function BlockForm({ handleSubmit, loading }) {
    return (
        <Grid container sx={{ pb: "24px" }}>
            <Grid item xs={12}>
                <Form onSubmit={handleSubmit}>
                    <BlockBox>
                        <Field
                            name="remarks"
                            placeholder="Write Remarks"
                            type="text"
                            small={12}
                            minRows={8}
                            component={TextAreaField}
                            validate={Validator.emptyValidator}
                        />
                        <BlockButton
                            size="small"
                            variant="outlined"
                            loading={loading}
                            type="submit"
                        >
                            Block
                        </BlockButton>
                    </BlockBox>
                </Form>
            </Grid>
        </Grid>
    );
}

export default reduxForm({ form: "block_form_transaction" })(BlockForm);
