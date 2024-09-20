import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

import HookForm from "App/core/hook-form/HookForm";
import { yupResolver } from "@hookform/resolvers/yup";
import FormSelect from "App/core/hook-form/FormSelect";
import FormCheckbox from "App/core/hook-form/FormCheckbox";
import FormTextField from "App/core/hook-form/FormTextField";
import FormPartnerSelect from "App/core/hook-form/FormPartnerSelect";
import FormSelectCountry from "App/core/hook-form/FormSelectCountry";

import PartnerType from "App/data/PartnerType";

const deliveryOptionsSchema = Yup.object().shape({
    delivery_name: Yup.string().required("Delivery name is required"),
    country_code: Yup.string().required("Country is required"),
    currency_code: Yup.string().required("Currency name is required"),
    payment_type: Yup.string().required("Payment type name is required"),
    payout_agent_id: Yup.string().required("Payment agent is required"),
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

const CancelButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.main,
    borderRadius: "8px",
    textTransform: "capitalize",
    background: theme.palette.surface.primarySecond,
    "&:hover": {
        background: theme.palette.surface.primarySecond,
    },
}));

const CreateButton = styled(LoadingButton)(({ theme }) => ({
    color: "#fff",
    borderRadius: "8px",
    textTransform: "capitalize",
    background: theme.palette.primary.main,
    "&:hover": {
        background: theme.palette.primary.dark,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

const DeliveryOptionForm = ({
    onSubmit,
    partnerList,
    update,
    handleAgent,
    loading,
    buttonText,
    payout_country,
    handleClose,
    initialValues,
}) => {
    const dispatch = useDispatch();
    const methods = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(deliveryOptionsSchema),
    });
    const { reset, setValue, getValues } = methods;

    const countryDataChanged = getValues();

    const handleSubmit = (data) => {
        onSubmit(data);
    };

    const reference = JSON.parse(localStorage.getItem("reference"));
    const country = JSON.parse(localStorage.getItem("country"));

    const countryOptions = country?.map((data) => {
        return { label: data.country, value: data.iso3 };
    });

    const currencyOptions = country?.map((data) => {
        return { label: data.currency_name, value: data.currency };
    });

    const referenceData = reference && reference?.filter((ref_data) => ref_data.reference_type === 1)[0];

    const referenceOptions = referenceData?.reference_data?.map((data) => {
        return { label: data.name, value: data.value };
    });

    const partnerOptions =
        partnerList &&
        partnerList?.map((data) => {
            return { label: data.name, value: data.agent_id };
        });

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
            setValue("currency_code", convertCurrency(e));

            // if (update) {
            //     dispatch(change("update_delivery_option_form", "currency_code", convertCurrency(e)));
            // } else {
            //     dispatch(change("add_delivery_option_form", "currency_code", convertCurrency(e)));
            // }
        };
        if (countryDataChanged.country_code) {
            handleCurrency(countryDataChanged?.country_code);
        }
    }, [countryDataChanged.country_code]);

    return (
        <HookForm onSubmit={handleSubmit} {...methods}>
            <Grid container spacing={1} sx={{ border: "1px solid #EAEBF0", padding: "8px 16px 16px 8px" }}>
                <Grid item xs={12} sm={6}>
                    <FormTextField name="delivery_name" label="Delivery Name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormSelectCountry label="Country" name="country_code" options={countryOptions} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormSelect label="Currency" name="currency_code" options={currencyOptions} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormSelect label="Payment Type" name="payment_type" options={referenceOptions} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormPartnerSelect label="Payout Agent" name="payout_agent_id" partnerType={PartnerType.PAY} />
                </Grid>
                {update && (
                    <Grid item xs={12} sm={6}>
                        <StatusText component="p">Status</StatusText>
                        <FormCheckbox name="is_active" label="Active" />
                    </Grid>
                )}
            </Grid>

            <Grid item>
                <ButtonWrapper container columnGap={2} direction="row" justifyContent="flex-end" alignItems="center">
                    <Grid item>
                        <CancelButton size="medium" variant="contained" onClick={handleClose}>
                            Cancel
                        </CancelButton>
                    </Grid>
                    <Grid item>
                        <CreateButton size="medium" variant="contained" loading={loading} type="submit">
                            {buttonText}
                        </CreateButton>
                    </Grid>
                </ButtonWrapper>
            </Grid>
        </HookForm>
    );
};

export default DeliveryOptionForm;
