import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import HookForm from "App/core/hook-form/HookForm";
import PageContent from "App/components/Container/PageContent";

import BusinessChargeForm from "Private/components/BusinessCharge/BusinessChargeForm";
import { businessChargeActions as actions } from "./store";
import { businessChargeValidationSchema } from "./validations/AddBusinessServiceChargeValidation";

export default function AddBusinessServiceCharge() {
    const dispatch = useDispatch();

    const methods = useForm({
        resolver: yupResolver(businessChargeValidationSchema),
    });

    const {
        handleSubmit,
        setValue,
        formState: { errors },
    } = methods;

    console.log("🚀 ~ file: AddBusinessServiceCharge.jsx:24 ~ AddBusinessServiceCharge ~ errors:", errors);

    useEffect(() => {
        setValue("relatedTo", "business");
    }, []);

    const onSubmitData = (data) => {
        const { chargeDetailRules, ...rest } = data;

        const newChargeDetailRules = chargeDetailRules.map((item) => {
            return {
                min_no_of_txn: +item.min_no_of_txn,
                max_no_of_txn: +item.max_no_of_txn,
                flat_amount: +item.flat_amount,
            };
        });

        const formattedDataToSend = {
            ...rest,
            chargeDetailRules: newChargeDetailRules,
        };

        dispatch(actions.add_business_charge(formattedDataToSend));
    };

    return (
        <PageContent title="Add Business Service Charge" documentTitle="Add Business Service Charge">
            <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                <BusinessChargeForm />
            </HookForm>
        </PageContent>
    );
}
