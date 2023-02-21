import React from "react";
import * as Yup from "yup";
import moment from "moment";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import FormTextField from "App/core/hook-form/FormTextField";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import FormSelectCountry from "App/core/hook-form/FormSelectCountry";
import FormButtonContainer from "App/components/Container/FormButtonContainer";

import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import FormSelect from "App/core/hook-form/FormSelect";

const schema = Yup.object().shape({
    email: Yup.string().email(),
    created_from_date: Yup.string()
        .test({
            name: "required_when_to_date_is_not_empty",
            message: "Form Date is required",
            test: (value, context) => {
                if (
                    (isEmpty(context.parent.created_to_date) && isEmpty(value)) ||
                    (!isEmpty(context.parent.created_to_date) && !isEmpty(value))
                )
                    return true;
                return isEmpty(context.parent.created_to_date) && !isEmpty(value);
            },
        })
        .required("From date is required"),
    created_to_date: Yup.string()
        .test({
            name: "required_when_to_date_is_not_empty",
            message: "To Date is required",
            test: (value, context) => {
                if (
                    (isEmpty(context.parent.created_from_date) && isEmpty(value)) ||
                    (!isEmpty(context.parent.created_from_date) && !isEmpty(value))
                )
                    return true;
                return isEmpty(context.parent.created_from_date) && !isEmpty(value);
            },
        })
        .required("From date is required"),
});

function IncompleteRegistrationFilterForm({ onSubmit, onReset }) {
    const maxDate = dateUtils.today();
    const minDate = moment(maxDate).subtract(30, "days").format("YYYY-MM-DD");

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            created_from_date: minDate,
            created_to_date: maxDate,
            sort_by: "created_ts",
            order_by: "ASC",
        },
    });

    const { reset, setValue } = methods;

    const handleReset = () => {
        setValue("created_from_date", minDate);
        setValue("created_to_date", maxDate);
        setValue("sort_by", "created_ts");
        setValue("order_by", "ASC");
        reset();
        onReset();
    };

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Grid container rowSpacing={2} columnSpacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <FormTextField name="email" label="Email" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormTextField name="mobile_number" label="Mobile Number" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormSelectCountry name="country" label="Country" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormDatePicker name="created_from_date" label="From Date" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormDatePicker name="created_to_date" label="To Date" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormDatePicker name="created_to_date" label="To Date" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormSelect
                        name="sort_by"
                        label="Sort By"
                        options={[
                            { label: "None", value: "created_ts" },
                            { label: "Email", value: "email" },
                            { label: "Phone Number", value: "phone_number" },
                        ]}
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
                        <CancelButton onClick={handleReset}>Reset</CancelButton>
                        <SubmitButton type="submit">Filter</SubmitButton>
                    </FormButtonContainer>
                </Grid>
            </Grid>
        </HookForm>
    );
}

export default IncompleteRegistrationFilterForm;
