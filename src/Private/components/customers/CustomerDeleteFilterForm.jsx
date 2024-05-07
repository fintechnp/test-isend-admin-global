import React from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import PageContent from "App/components/Container/PageContent";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";
import FormDatePicker from "App/core/hook-form/FormDatePicker";

import isEmpty from "App/helpers/isEmpty";
import { DeleteAccountStatus } from "Private/pages/Customers/DeleteList/data/DeleteAccountStatus";

const schema = Yup.object().shape({
    fromDate: Yup.string().test({
        name: "required_when_to_date_is_not_empty",
        message: "Form Date is required",
        test: (value, context) => {
            if (
                (isEmpty(context.parent.toDate) && isEmpty(value)) ||
                (!isEmpty(context.parent.toDate) && !isEmpty(value))
            )
                return true;
            return isEmpty(context.parent.toDate) && !isEmpty(value);
        },
    }),
    toDate: Yup.string().test({
        name: "required_when_to_date_is_not_empty",
        message: "To Date is required",
        test: (value, context) => {
            if (
                (isEmpty(context.parent.fromDate) && isEmpty(value)) ||
                (!isEmpty(context.parent.fromDate) && !isEmpty(value))
            )
                return true;
            return isEmpty(context.parent.fromDate) && !isEmpty(value);
        },
    }),
});

export default function CustomerDeleteFilterForm({ isProcessing, onSubmit, onReset }) {
    const methods = useForm({
        resolver: yupResolver(schema),
    });

    const { reset, formState, watch } = methods;

    const handleReset = () => {
        onReset();
        reset();
    };

    const fromDate = watch("from_date");
    const toDate = watch("to_date");

    return (
        <PageContent>
            <HookForm onSubmit={onSubmit} {...methods}>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="name" label="Name" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="phoneNumber" label="Phone Number" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="emailAddress" label="Email Address" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="customerId" label="Customer Id" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormDatePicker
                                    name="fromDate"
                                    label="From Date"
                                    maxDate={toDate}
                                    withStartDayTimezone
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormDatePicker name="toDate" label="To Date" minDate={fromDate} withEndDayTimezone />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormSelect
                            name="status"
                            label="Status"
                            options={[
                                {
                                    label: "Pending",
                                    value: DeleteAccountStatus.PENDING,
                                },
                                {
                                    label: "Approved",
                                    value: DeleteAccountStatus.APPROVED,
                                },
                            ]}
                        />
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
                                <CancelButton
                                    size="small"
                                    variant="outlined"
                                    onClick={handleReset}
                                    disabled={isProcessing}
                                >
                                    Reset
                                </CancelButton>
                            </Grid>
                            <Grid item>
                                <SubmitButton size="small" variant="outlined" type="submit" disabled={isProcessing}>
                                    Search
                                </SubmitButton>
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
