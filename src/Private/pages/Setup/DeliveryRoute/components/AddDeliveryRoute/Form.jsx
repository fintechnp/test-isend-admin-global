import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

import { useForm } from "react-hook-form";
import PartnerType from "App/data/PartnerType";
import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormCheckbox from "App/core/hook-form/FormCheckbox";
import FormPartnerSelect from "App/core/hook-form/FormPartnerSelect";
import FormSelectCountry from "App/core/hook-form/FormSelectCountry";

const Container = styled(Grid)(({ theme }) => ({
    maxWidth: "900px",
    borderRadius: "5px",
    [theme.breakpoints.up("sm")]: {
        minWidth: "650px",
    },
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
        // resolver: yupResolver(deliveryOptionsSchema),
    });

    const { reset, setValue, getValues } = methods;

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

    const currencyOptions =
        country &&
        country?.map((data) => {
            return { label: data.currency_name, value: data.currency };
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
        <HookForm onSubmit={handleSubmit} {...methods}>
            <Container>
                <Grid
                    container
                    sx={{ border: "1px solid #EAEBF0", padding: "8px 16px 16px 8px", borderRadius: "8px" }}
                    spacing={1}
                >
                    <Grid item xs={12} sm={6}>
                        <FormSelect label="Payment Type" name="payment_type" options={paymentTypeOptions} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormSelectCountry label="Payout Country" name="payout_country" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormSelect label="Payout Currency" name="payout_currency" options={currencyOptions} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormPartnerSelect label="Sending Agent" name="send_agent_id" partnerType={PartnerType.SEND} />
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
                    <ButtonWrapper
                        container
                        columnGap={2}
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
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
            </Container>
        </HookForm>
    );
};

export default DeliveryRoute;
