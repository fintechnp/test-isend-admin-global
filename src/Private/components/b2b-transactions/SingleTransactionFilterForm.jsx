import React from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import FormButtonContainer from "App/components/Container/FormButtonContainer";
import FormSearchAutoComplete from "App/core/hook-form/FormSearchAutocomplete";

import isEmpty from "App/helpers/isEmpty";
import apiEndpoints from "Private/config/apiEndpoints";
import { yupResolver } from "@hookform/resolvers/yup";
import referenceTypeId from "Private/config/referenceTypeId";

const formValidationSchema = Yup.object().shape({
    from_date: Yup.string()
        .nullable()
        .test({
            name: "required_when_to_date_is_not_empty",
            message: "Form Date is required",
            test: (value, context) => {
                if (
                    (isEmpty(context.parent.to_date) && isEmpty(value)) ||
                    (!isEmpty(context.parent.to_date) && !isEmpty(value))
                )
                    return true;
                return isEmpty(context.parent.to_date) && !isEmpty(value);
            },
        }),
    to_date: Yup.string()
        .nullable()
        .test({
            name: "required_when_from_date_is_not_empty",
            message: "To Date is required",
            test: (value, context) => {
                if (
                    (isEmpty(context.parent.from_date) && isEmpty(value)) ||
                    (!isEmpty(context.parent.from_date) && !isEmpty(value))
                )
                    return true;
                return isEmpty(context.parent.from_date) && !isEmpty(value);
            },
        }),
});

export default function SingleTransactionFilterForm({ onSubmit, onReset, loading }) {
    const reference = JSON.parse(localStorage.getItem("reference"));

    const methods = useForm({
        defaultValues: {
            sort_by: "created_ts",
            order_by: "ASC",
        },
        resolver: yupResolver(formValidationSchema),
    });

    const { reset, setValue, watch } = methods;

    const handleReset = () => {
        setValue("sort_by", "created_ts");
        setValue("order_by", "ASC");
        reset();
        onReset();
    };

    const marketMakerId = watch("markedMakerId");

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Grid container rowSpacing={2} columnSpacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <FormTextField name="transaction_id" label="Txn ID" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormSearchAutoComplete
                        name="market_maker_id"
                        label="Market Maker"
                        apiEndpoint={apiEndpoints.marketMaker.getAll}
                        paramkey="Name"
                        valueKey="marketMakerId"
                        labelKey="name"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormSearchAutoComplete
                        name="business_id"
                        label="Business Id"
                        apiEndpoint={apiEndpoints.business.getAll}
                        paramkey="Name"
                        valueKey="businessId"
                        labelKey="name"
                        defaultQueryParams={{
                            marketMakerId,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormTextField name="txn_no" label="Transaction No" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormSelect
                        name="status"
                        label="Status"
                        options={
                            reference &&
                            reference
                                ?.filter((ref_data) => ref_data.reference_type === referenceTypeId.transactionStatus)[0]
                                .reference_data.map((ref) => ({
                                    label: ref.name,
                                    value: ref.value,
                                }))
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormDatePicker name="from_date" label="From Date" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormDatePicker name="to_date" label="To Date" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormSelect
                        name="sort_by"
                        label="Sort By"
                        options={[{ label: "None", value: "created_ts" }]}
                        showChooseOption={false}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormSelect
                        name="order_by"
                        label="Sort Order"
                        options={[
                            { label: "Ascending", value: "ASC" },
                            { label: "Descending", value: "DESC" },
                        ]}
                        showChooseOption={false}
                    />
                </Grid>
                <Grid item xs={12}>
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

SingleTransactionFilterForm.propTypes = {
    onSubmit: PropTypes.func,
    onReset: PropTypes.func,
};
