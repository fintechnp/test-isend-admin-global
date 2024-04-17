import * as Yup from 'yup';
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormCheckbox from "App/core/hook-form/FormCheckbox";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";

const deliveryRouteSchema = Yup.object().shape({
    payment_type: Yup.string().required("Required"),
    payout_country: Yup.string().required("Required"),
    payout_currency: Yup.string().required("Required"),
    send_agent_id: Yup.string().required("Required"),
    payout_agent_id: Yup.string().required("Required"),
});

const Container = styled(Grid)(({ theme }) => ({
    maxWidth: "900px",
    borderRadius: "5px",
    [theme.breakpoints.up("sm")]: {
        minWidth: "350px",
    },
}));

const FormWrapper = styled(Grid)(({ theme }) => ({
    padding: "6px 0px 16px",
    backgroundColor: theme.palette.background.light,
}));

const FieldWrapper = styled(Grid)(({ theme }) => ({
    padding: "1px 16px",
}));

const StatusText = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    paddingTop: "6px",
    paddingBottom: "-6px",
}));

const ButtonWrapper = styled(Grid)(({ theme }) => ({
    paddingTop: "12px",
}));

const DeliveryRoute = ({
    // handleSubmit,
    onSubmit,
    update,
    loading,
    buttonText,
    payout_country,
    handleAgent,
    handleClose,
    partner_sending,
    initialValues,
    partner_payout,
}) => {
    const methods = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(deliveryRouteSchema),
    });

    const { setValue, getValues } = methods;

    const countryDataChanged = getValues();
    const reference = JSON.parse(localStorage.getItem("reference"));
    const country = JSON.parse(localStorage.getItem("country"));

    const paymentTypeOptions =
        reference &&
        reference
            ?.filter((ref_data) => ref_data.reference_type === 1)[0]
            .reference_data.map((data) => {
                return { label: data.name, value: data.value };
            });

    const countryOptions =
        country &&
        country?.map((data) => {
            return { label: data.country, value: data.iso3 };
        });

    const currencyOptions =
        country &&
        country?.map((data) => {
            return { label: data.currency_name, value: data.currency };
        });

    const partnerSendingOptions =
        partner_sending &&
        partner_sending?.map((data) => {
            return { label: data.name, value: data.agent_id };
        });

    const payoutAgentsOptions =
        partner_payout &&
        partner_payout?.map((data) => {
            return { label: data.name, value: data.agent_id };
        });

    const handleSubmit = (data) => {
        onSubmit(data);
    };

    useEffect(() => {
        if (payout_country && update) {
            handleAgent(payout_country);
        }
    }, [payout_country]);

    const convertCurrency = (iso3) => {
        const currency = country.filter((data) => data.iso3 === iso3);
        if (currency) {
            return currency[0].currency;
        }
    };

    useEffect(() => {
        const handleCurrency = (e) => {
            handleAgent(e);
            setValue("payout_currency", convertCurrency(e));
        };
        if (countryDataChanged.payout_country) {
            handleCurrency(countryDataChanged?.payout_country);
        }
    }, [countryDataChanged.payout_country]);

    return (
        <>
            <HookForm onSubmit={handleSubmit} {...methods}>
                <Container>
                    <Grid item xs={12}>
                        <FormWrapper container direction="row">
                            <FieldWrapper item xs={12} sm={6} style={{ marginTop: "0.5rem" }}>
                                <FormSelect label="Payment Type" name="payment_type" options={paymentTypeOptions} />
                            </FieldWrapper>
                            <FieldWrapper item xs={12} sm={6} style={{ marginTop: "0.5rem" }}>
                                <FormSelect label="Payout Country" name="payout_country" options={countryOptions} />
                            </FieldWrapper>
                            <FieldWrapper item xs={12} sm={6} style={{ marginTop: "0.5rem" }}>
                                <FormSelect label="Payout Currency" name="payout_currency" options={currencyOptions} />
                            </FieldWrapper>
                            <FieldWrapper item xs={12} sm={6} style={{ marginTop: "0.5rem" }}>
                                <FormSelect
                                    label="Sending Agent"
                                    name="send_agent_id"
                                    options={partnerSendingOptions}
                                />
                            </FieldWrapper>
                            <FieldWrapper item xs={12} sm={6} style={{ marginTop: "0.5rem" }}>
                                <FormSelect label="Payout Agent" name="payout_agent_id" options={payoutAgentsOptions} />
                            </FieldWrapper>
                            {update && (
                                <FieldWrapper item xs={12} sm={6}>
                                    <Grid container alignItems="flex-end" justifyContent="flex-end">
                                        <Grid item xs={12}>
                                            <StatusText component="p">Status</StatusText>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormCheckbox name="is_active" label="Active" />
                                        </Grid>
                                    </Grid>
                                </FieldWrapper>
                            )}
                        </FormWrapper>
                    </Grid>
                    <Grid>
                        <Grid item>
                            <Divider sx={{ pt: 1.2 }} />
                        </Grid>
                        <Grid item>
                            <ButtonWrapper
                                container
                                columnGap={2}
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                            >
                                <Grid item>
                                    <CancelButton onClick={handleClose} disabled={loading}>
                                        Cancel
                                    </CancelButton>
                                </Grid>
                                <Grid item>
                                    <SubmitButton isLoading={loading}>{buttonText}</SubmitButton>
                                </Grid>
                            </ButtonWrapper>
                        </Grid>
                    </Grid>
                </Container>
            </HookForm>
        </>
    );
};

// export default reduxForm({ form: ["form"] })(DeliveryOptionForm);
export default DeliveryRoute;
