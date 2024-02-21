import PageContent from "App/components/Container/PageContent";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import HookForm from "App/core/hook-form/HookForm";
import React from "react";
import { ResetButton, SearchButton } from "../AllButtons/Buttons";
import { useForm } from "react-hook-form";
import FormSelect from "App/core/hook-form/FormSelect";
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import FormTextField from "App/core/hook-form/FormTextField";

export default function CustomerDeleteFilterForm({ isProcessing, onSubmit, onReset }) {
    const methods = useForm();

    const { reset } = methods;

    const handleReset = () => {
        onReset();
        reset();
    };
    return (
        <PageContent>
            <HookForm onSubmit={onSubmit} {...methods}>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="name" label="Name" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormSelect name="sortBy" label="Sort By" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormSelect name="orderBy" label="Order By" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormSelect name="status" label="Status" />
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonWrapper
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            columnSpacing={2}
                        >
                            <Grid item>
                                <ResetButton
                                    size="small"
                                    variant="outlined"
                                    onClick={handleReset}
                                    disabled={isProcessing}
                                >
                                    Reset
                                </ResetButton>
                            </Grid>
                            <Grid item>
                                <SearchButton size="small" variant="outlined" type="submit" disabled={isProcessing}>
                                    Search
                                </SearchButton>
                            </Grid>
                        </ButtonWrapper>
                    </Grid>
                </Grid>
            </HookForm>
        </PageContent>
    );
}

CustomerDeleteFilterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    isProcessing: PropTypes.bool.isRequired,
};
