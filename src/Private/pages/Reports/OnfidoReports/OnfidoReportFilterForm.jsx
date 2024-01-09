import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import FormButtonContainer from "App/components/Container/FormButtonContainer";

const OnfidoReportFilterForm = ({ onSubmit, onReset, loading }) => {
    const onfidoFormSchema = Yup.object().shape({
        customer_id: Yup.number().integer().typeError("Customer ID must be number").required("Customer ID is required"),
    });
    const methods = useForm({
        resolver: yupResolver(onfidoFormSchema),
        defaultValues: {
            sort_by: "created_ts",
            order_by: "ASC",
        },
    });
    const { reset, setValue } = methods;

    const handleReset = () => {
        setValue("sort_by", "created_ts");
        setValue("order_by", "ASC");
        reset();
        onReset();
    };

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Grid container rowSpacing={2} columnSpacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <FormTextField name="customer_id" label="Customer ID" />
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
                        <CancelButton onClick={handleReset} disabled={loading}>Reset</CancelButton>
                        <SubmitButton type="submit" disabled={loading}>Filter</SubmitButton>
                    </FormButtonContainer>
                </Grid>
            </Grid>
        </HookForm>
    );
};

export default OnfidoReportFilterForm;
