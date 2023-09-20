import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import HookForm from "App/core/hook-form/HookForm";
import PageContent from "App/components/Container/PageContent";
import BusinessChargeForm from "Private/components/BusinessCharge/BusinessChargeForm";
import { useParams } from "react-router-dom";

import { businessChargeActions } from "./store";
import { Loading } from "App/components";

export default function UpdateBusinessServiceCharge() {
    const methods = useForm({});
    const dispatch = useDispatch();

    const { businessServiceChargeId } = useParams();

    const { response: businessChargeDetails, loading } = useSelector((state) => state.get_business_charge_details);

    useEffect(() => {
        dispatch(businessChargeActions.get_business_charge_details(businessServiceChargeId));
    }, [businessServiceChargeId]);

    const { handleSubmit, setValue } = methods;

    useEffect(() => {
        setValue("relatedTo", businessChargeDetails?.data?.relatedTo);
        setValue("relatedId", businessChargeDetails?.data?.relatedId);
        setValue("receivingCountry", businessChargeDetails?.data?.receivingCountryId);
        setValue("sendingCountry", businessChargeDetails?.data?.sendingCountryId);
        setValue("chargeDetailRules", businessChargeDetails?.data?.serviceChargeDetails);
    }, [businessChargeDetails]);

    const onSubmitData = (data) => {
        const { chargeDetailRules, sendingCountry, receivingCountry, ...rest } = data;

        const newChargeDetailRules = chargeDetailRules.map((item) => {
            return {
                min_no_of_txn: +item.min_no_of_txn,
                max_no_of_txn: +item.max_no_of_txn,
                flat_amount: +item.flat_amount,
            };
        });

        const formattedDataToSend = {
            sendingCountry,
            receivingCountry,
            chargeDetailRules: newChargeDetailRules,
        };

        dispatch(businessChargeActions.update_business_charge(businessServiceChargeId, formattedDataToSend));
    };

    return (
        <PageContent title="Edit Business Service Charge">
            <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                {loading ? <Loading loading={loading} /> : <BusinessChargeForm isAddMode={false} />}
            </HookForm>
        </PageContent>
    );
}
