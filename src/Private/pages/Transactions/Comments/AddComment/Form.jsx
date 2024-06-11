import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import HookForm from "App/core/hook-form/HookForm";
import FormTextField from "App/core/hook-form/FormTextField";
import Row from "App/components/Row/Row";
import SubmitButton from "App/components/Button/SubmitButton";

const CommentForm = ({ method, loading, handleClose, onSubmit, isSubmitting }) => {
    return (
        <HookForm onSubmit={method.handleSubmit(onSubmit)} {...method}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <FormTextField name="commentText" label="Comment" />
                </Grid>
                <Grid item xs={12}>
                    <Row gap={2} justifyContent="flex-end">
                        <SubmitButton disabled={loading}>Add</SubmitButton>
                    </Row>
                </Grid>
            </Grid>
        </HookForm>
    );
};

export default CommentForm;
