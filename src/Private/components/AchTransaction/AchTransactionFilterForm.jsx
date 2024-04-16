import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";

import dateUtils from "App/utils/dateUtils";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import { useForm } from "react-hook-form";
import HookForm from "App/core/hook-form/HookForm";
import FormTextField from "App/core/hook-form/FormTextField";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";

export default function AchTransactionFilterForm({ isProcessing, onSubmit, onReset }) {
    const maxDate = dateUtils.today();
    const minDate = moment(maxDate).subtract(30, "days").format("YYYY-MM-DD");

    const methods = useForm({
        defaultValues:{
            from_date: minDate,
            to_date: maxDate,
        }
    });

    const { reset, setValue } = methods;

    const handleReset = () => {
        setValue("from_date", minDate);
        setValue("to_date", maxDate);
        onReset();
        reset();
    };
    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormTextField name="searchWord" label="Search" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormTextField name="status" label="Status" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormDatePicker name="from_date" label="From Date" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormDatePicker name="to_date" label="To Date" />
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
                            <CancelButton  onClick={handleReset} disabled={isProcessing}>
                                Reset
                            </CancelButton>
                        </Grid>
                        <Grid item>
                            <SubmitButton type="submit" disabled={isProcessing}>
                                Search
                            </SubmitButton>
                        </Grid>
                    </ButtonWrapper>
                </Grid>
            </Grid>
        </HookForm>
    );
}
AchTransactionFilterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    isProcessing: PropTypes.bool.isRequired,
};
