import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import FormButtonContainer from "App/components/Container/FormButtonContainer";

export default function EmailTemplateFilterForm({ onSubmit, onReset, loading }) {
    const methods = useForm();

    const { reset, setValue, watch } = methods;

    const handleReset = () => {
        setValue("SortBy", "template_id");
        setValue("OrderBy", "desc");
        reset();
        onReset();
    };

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Grid container rowSpacing={4} columnSpacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <FormTextField name="Search" label="Search" />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <FormSelect
                        name="SortBy"
                        label="Sort By"
                        options={[
                            {
                                label: "Email Subject",
                                value: "email_subject",
                            },
                            {
                                label: "Template Type",
                                value: "template_type",
                            },
                        ]}
                        showChooseOption={false}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormSelect
                        name="OrderBy"
                        label="Sort Order"
                        options={[
                            { label: "Ascending", value: "asc" },
                            { label: "Descending", value: "desc" },
                        ]}
                        showChooseOption={false}
                    />
                </Grid>
                <Grid marginBottom={3} item xs={12}>
                    <FormButtonContainer>
                        <Button color="error" variant="contained" onClick={handleReset} disabled={loading}>
                            Reset
                        </Button>
                        <Button type="submit" variant="contained" disabled={loading}>
                            Filter
                        </Button>
                    </FormButtonContainer>
                </Grid>
            </Grid>
        </HookForm>
    );
}

EmailTemplateFilterForm.propTypes = {
    onSubmit: PropTypes.func,
    loading: PropTypes.bool,
};
