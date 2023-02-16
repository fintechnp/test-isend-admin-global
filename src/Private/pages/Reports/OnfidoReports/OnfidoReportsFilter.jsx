import { Grid } from "@mui/material";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import FormButtonContainer from "App/components/Container/FormButtonContainer";
import FormTextField from "App/core/hook-form/FormTextField";
import HookForm from "App/core/hook-form/HookForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const OnfidoReportFilterForm = ({ onSubmit, onReset }) => {
    const onfidoFormSchema = Yup.object().shape({
        customer_id: Yup.number().integer().typeError("Customer ID must be number").required("Customer ID is required"),
    });
    const methods = useForm({
        resolver: yupResolver(onfidoFormSchema),
    });
    const { reset, setValue, getValues } = methods;

    const handleReset = () => {
        reset();
        onReset();
    };

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Grid container rowSpacing={2} columnSpacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <FormTextField name="customer_id" label="Customer ID" />
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
};
