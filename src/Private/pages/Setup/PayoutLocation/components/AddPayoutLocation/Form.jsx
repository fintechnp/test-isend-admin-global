import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormCheckbox from "App/core/hook-form/FormCheckbox";
import FormTextField from "App/core/hook-form/FormTextField";
import FormSelectCountry from "App/core/hook-form/FormSelectCountry";

import referenceTypeId from "Private/config/referenceTypeId";

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

const schema = Yup.object().shape({
    location_name: Yup.string().required("Location Name is required"),
    location_code: Yup.string().required("Location Code is required"),
    currency: Yup.string().required("Currency is required"),
    country: Yup.string().required("Country is required"),
    payment_type: Yup.string().required("Payment Type is required"),
});

const PayoutLocationForm = ({ onSubmit, update, loading, buttonText, handleClose, initialValues }) => {
    const reference = JSON.parse(localStorage.getItem("reference"));
    const paymentTypeOptions = reference
        .filter((ref) => ref.reference_type === referenceTypeId.paymentType)[0]
        .reference_data.map((ref) => ({ label: ref.name, value: ref.value }));
    const country = JSON.parse(localStorage.getItem("country"));

    const currencyOptions = country.map((c) => ({ label: c.currency_name, value: c.currency }));

    const methods = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    const { watch, setValue } = methods;
    const countryWatch = watch("country");

    const convertCurrency = (iso3) => {
        const currency = country.filter((data) => data.iso3 === iso3);
        if (currency) {
            return currency[0].currency;
        }
    };

    useEffect(() => {
        const handleCurrency = (e) => {
            setValue("currency", convertCurrency(e));
        };
        if (countryWatch) {
            handleCurrency(countryWatch);
        }
    }, [countryWatch]);

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Grid
                container
                sx={{ border: "1px solid #EAEBF0", borderRadius: "8px", padding: "8px 16px 16px 8px" }}
                spacing={1}
            >
                <Grid item xs={12} sm={6}>
                    <FormTextField name="location_name" label="Location Name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormTextField name="location_code" label="Location Code" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormSelect name="payment_type" label="Payment Type" options={paymentTypeOptions} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormSelectCountry name="country" label="Country" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormSelect name="currency" label="Currency" options={currencyOptions} />
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
                        <CreateButton size="medium" variant="outlined" loading={loading} type="submit">
                            {buttonText}
                        </CreateButton>
                    </Grid>
                </ButtonWrapper>
            </Grid>
        </HookForm>
    );
};
export default PayoutLocationForm;
