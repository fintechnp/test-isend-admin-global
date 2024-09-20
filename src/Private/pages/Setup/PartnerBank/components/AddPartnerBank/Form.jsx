import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React, { useEffect, useMemo } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import PartnerType from "App/data/PartnerType";
import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import referenceTypeId from "Private/config/referenceTypeId";
import FormPartnerSelect from "App/core/hook-form/FormPartnerSelect";
import FormSelectCountry from "App/core/hook-form/FormSelectCountry";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FormSearchAutocomplete from "App/core/hook-form/FormSearchAutocomplete";

import apiEndpoints from "Private/config/apiEndpoints";
import { CurrencyName, ReferenceName } from "App/helpers";
import useReactHookForm from "App/core/hook-form/useReactHookForm";
import { PayoutLocationAction } from "Private/pages/Setup/PayoutLocation/store";

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
    bank_name: Yup.string().required("Bank Name is required"),
    country: Yup.string().required("Country is required"),
    currency: Yup.string().required("Currency is required"),
    agent_id: Yup.string().required("Agent is required"),
    payment_type: Yup.string().required("Payment Type is required"),
    external_bank_code: Yup.string().required("External Bank Code is required"),
});

const PartnerBankForm = ({
    onSubmit,
    update,
    loading,
    handleAgent,
    buttonText,
    handleClose,
    partner_payout,
    payout_country,
    initialValues,
}) => {
    const dispatch = useDispatch();
    const reference = JSON.parse(localStorage.getItem("reference"));
    const country = JSON.parse(localStorage.getItem("country"));

    const currencyOptions = country.map((c) => ({ label: c.currency_name, value: c.currency }));

    const paymentTypeOptions = reference
        .filter((ref) => ref.reference_type === referenceTypeId.paymentType)[0]
        .reference_data.map((ref) => ({ label: ref.name, value: ref.value }));

    const { response: payoutLocationData, loading: payoutLocationDetailsLoading } = useSelector(
        (state) => state.get_payout_location_details,
    );

    const payoutLocationDetails = Array.isArray(payoutLocationData) ? payoutLocationData : [payoutLocationData.data];

    const methods = useReactHookForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    const { reset, watch, setValue } = methods;

    const countryWatch = watch("country");
    const currencyWatch = watch("currency");
    const paymentTypeWatch = watch("payment_type");
    const mapWithWatch = watch("payout_location_id");

    const filterParams = useMemo(
        () => ({
            country: countryWatch,
            currency: currencyWatch,
            payment_type: paymentTypeWatch,
            sort_by: "location_name",
            order_by: "DESC",
            page_no: 0,
        }),
        [countryWatch, currencyWatch, paymentTypeWatch],
    );

    useEffect(() => {
        if (mapWithWatch) {
            dispatch(PayoutLocationAction.get_payout_location_details(mapWithWatch));
        } else {
            dispatch({ type: "GET_PAYOUT_LOCATION_DETAILS_RESET" });
        }
    }, [mapWithWatch]);

    const convertCurrency = (iso3) => {
        const currency = country.filter((data) => data.iso3 === iso3);
        if (currency) {
            return currency[0].currency;
        }
    };

    useEffect(() => {
        const handleCurrency = (e) => {
            handleAgent(e);
            setValue("currency", convertCurrency(e));
        };
        if (countryWatch) {
            handleCurrency(countryWatch);
        }
    }, [countryWatch]);

    useEffect(() => {
        if (!paymentTypeWatch && !countryWatch && !currencyWatch) {
            setValue("payout_location_id", "");
        }
    }, [paymentTypeWatch, countryWatch, currencyWatch]);

    const handleSubmit = (data) => {
        onSubmit(data);
        reset();
    };
    return (
        <HookForm onSubmit={handleSubmit} {...methods}>
            <Grid
                container
                sx={{ border: "1px solid #EAEBF0", borderRadius: "8px", padding: "8px 16px 16px 8px" }}
                spacing={1}
            >
                <Grid item xs={12} sm={4} md={4}>
                    <FormTextField name="bank_name" label="Bank Name" />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <FormSelectCountry name="country" label="Country" />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <FormSelect name="currency" label="Currency" options={currencyOptions} />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <FormPartnerSelect name="agent_id" label="Payout Agent" partnerType={PartnerType.PAY} />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <FormSelect name="payment_type" label="Payment Type" options={paymentTypeOptions} />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <FormTextField name="external_bank_code" label="External Bank Code" />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <FormTextField name="external_bank_code1" label="External Bank Code 1" />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <FormTextField name="external_bank_code2" label="External Bank Code 2" />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <FormSearchAutocomplete
                        name="payout_location_id"
                        label="Map With"
                        shouldRenderPrevData
                        pageNumberQueryKey="page_number"
                        pageSizeQueryKey="page_size"
                        apiEndpoint={
                            countryWatch && currencyWatch && paymentTypeWatch && apiEndpoints.GetAllPayoutLocations
                        }
                        filterParams={filterParams}
                        labelKey="location_name"
                        valueKey="payout_location_id"
                        searchParamName="search"
                        paramkey="search"
                        callApiAtfirst={countryWatch && currencyWatch && paymentTypeWatch ? true : false}
                    />
                </Grid>
                {payoutLocationDetails.length > 0 && (
                    <Grid item xs={12} marginBlock="1rem">
                        <PayoutLocationDetailTable data={payoutLocationDetails} />
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

export default PartnerBankForm;

const PayoutLocationDetailTable = ({ data }) => {
    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                cell: ({ row }) => <>{row.index + 1}</>,
            },
            {
                header: "Location Name",
                accessorKey: "location_name",
            },
            {
                header: "Location Code",
                accessorKey: "location_code",
            },
            {
                header: "Payment Type",
                accessorKey: "payment_type",
                cell: ({ getValue }) => (
                    <>{getValue() ? ReferenceName(referenceTypeId.paymentType, getValue()) : "-"}</>
                ),
            },
            {
                header: "Country",
                accessorKey: "country",
            },
            {
                header: "Currency",
                accessorKey: "currency",
                cell: ({ getValue }) => <>{getValue() ? CurrencyName(getValue()) : "-"}</>,
            },
        ],
        [],
    );
    return <TanstackReactTable columns={columns || []} data={data || []} />;
};
