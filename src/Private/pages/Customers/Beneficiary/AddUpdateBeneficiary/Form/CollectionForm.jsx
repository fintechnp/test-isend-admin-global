import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import LoadingBackdrop from "App/components/Loading/LoadingBackdrop";

import { useReactHookFormContext } from "App/core/hook-form/useReactHookForm";
import locationActions from "./../../../../Setup/PayoutLocation/store/actions";
import deliveryOptionActions from "Private/pages/Setup/DeliveryOption/store/actions";
import { getPaymentType } from "../../data/paymentType";

const CollectionForm = () => {
    const dispatch = useDispatch();
    const [option, setOption] = useState(null);
    const { getValues, setValue } = useReactHookFormContext();
    const [additionalPayoutInformation, setAdditionalPayoutInformation] = useState(undefined);

    const reference = JSON.parse(localStorage.getItem("reference"));

    const { response: deliveryoption_data, laoding: d_loading } = useSelector((state) => state.get_all_delivery_option);
    const deliveryoption_data_map = deliveryoption_data?.data?.map((deliver) => ({
        value: deliver.delivery_option_id,
        label: deliver.delivery_name,
    }));

    const { response: payoutloaction_data, loading: p_loading } = useSelector((state) => state.get_all_payout_location);
    const payoutlocation_data_map = payoutloaction_data?.data?.map((deliver) => ({
        value: deliver?.payout_location_id,
        label: deliver?.location_name,
    }));

    useEffect(() => {
        const additionalPayoutInformation = reference
            ?.filter((ref_data) => ref_data?.reference_type === 40)?.[0]
            ?.reference_data?.find((d) => d.name?.toUpperCase() === getValues("country")?.toUpperCase());

        if (additionalPayoutInformation && getValues("payment_type") === "B") {
            setAdditionalPayoutInformation(additionalPayoutInformation);
            setValue("branch_identifier_type", additionalPayoutInformation?.value ?? null);
            setValue(
                "beneficiary_form_payout_branch_identifier_value_regex",
                additionalPayoutInformation?.description ?? "",
            );
        } else {
            setAdditionalPayoutInformation(undefined);
            setValue("branch_identifier_type", null);
            setValue("branch_identifier_value", null);
        }
    }, [getValues("country"), getValues("delivery_option_id"), getValues("payment_type")]);

    useEffect(() => {
        if (getValues("country")) {
            dispatch(
                deliveryOptionActions.get_all_delivery_option({
                    payout_country: getValues("country"),
                    page_number: 1,
                    page_size: 1000,
                }),
            );
        }
    }, [getValues("country")]);

    const payoutLocationLabel = getPaymentType(getValues("payment_type")) ?? "Payout Location";

    useEffect(() => {
        if (getValues("payment_type") && getValues("country")) {
            dispatch(
                locationActions.get_all_payout_location({
                    country: getValues("country"),
                    payment_type: getValues("payment_type"),
                    page_number: 1,
                    page_size: 2000,
                }),
            );
        }
    }, [getValues("payment_type"), getValues("country")]);

    const handleOption = (e, deliveryoption) => {
        if (deliveryoption) {
            const filt_data = deliveryoption.filter((del) => del?.delivery_option_id == e.target.value);
            if (filt_data !== undefined || filt_data.length !== 0) {
                setOption(filt_data[0]);
                setValue("payment_type", filt_data[0]?.payment_type);
            }
        }
    };

    return (
        <Grid container spacing="16px">
            <Grid item xs={12} md={6} lg={3}>
                <FormSelect
                    name="delivery_option_id"
                    label="Delivery Option"
                    type="text"
                    onChange={(e) => handleOption(e, deliveryoption_data?.data)}
                    options={deliveryoption_data_map}
                />
            </Grid>
            {option?.payment_type === "B" || getValues("payment_type") === "B" ? (
                <>
                    <Grid item xs={12} md={6} lg={3}>
                        <FormSelect
                            name="payout_location_id"
                            label={payoutLocationLabel}
                            type="text"
                            options={payoutlocation_data_map}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <FormTextField name="account_number" label="Account Number" />
                    </Grid>
                    {additionalPayoutInformation && (
                        <Grid item xs={12} md={6} lg={3}>
                            <FormTextField label={getValues("branch_identifier_type")} name="branch_identifier_value" />
                        </Grid>
                    )}
                </>
            ) : (
                <Grid item xs={12} md={6} lg={3}>
                    <FormSelect
                        name="payout_location_id"
                        label={payoutLocationLabel}
                        type="text"
                        options={payoutlocation_data_map}
                    />
                </Grid>
            )}
            <LoadingBackdrop open={p_loading || d_loading} />
        </Grid>
    );
};

export default CollectionForm;
