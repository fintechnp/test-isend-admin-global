import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "App/components";
import isEmpty from "App/helpers/isEmpty";
import HookForm from "App/core/hook-form/HookForm";
import PageContent from "App/components/Container/PageContent";
import BusinessChargeForm from "Private/components/BusinessCharge/BusinessChargeForm";

import { businessChargeActions } from "./store";
import { businessChargeValidationSchema } from "./validations/AddBusinessServiceChargeValidation";

export default function UpdateBusinessServiceCharge() {
    const methods = useForm({
        resolver: yupResolver(businessChargeValidationSchema),
    });
    const dispatch = useDispatch();

    const { businessServiceChargeId } = useParams();

    const { response: businessChargeDetails, loading } = useSelector((state) => state.get_business_charge_details);

    useEffect(() => {
        dispatch(businessChargeActions.get_business_charge_details(businessServiceChargeId));
    }, [businessServiceChargeId]);

    const { handleSubmit, setValue, setError } = methods;

    const newServiceChargeDetails = businessChargeDetails?.data?.serviceChargeDetails?.map((item) => {
        return {
            min_no_of_txn: String(item.min_no_of_txn),
            max_no_of_txn: String(item.max_no_of_txn),
            flat_amount: String(item.flat_amount),
        };
    });

    useEffect(() => {
        setValue("relatedTo", businessChargeDetails?.data?.relatedTo);
        setValue("relatedId", businessChargeDetails?.data?.relatedId);
        setValue("receivingCountry", businessChargeDetails?.data?.receivingCountryId);
        setValue("sendingCountry", businessChargeDetails?.data?.sendingCountryId);
        setValue("chargeDetailRules", newServiceChargeDetails);
    }, [businessChargeDetails]);

    const onSubmitData = (data) => {
        const { chargeDetailRules, sendingCountry, receivingCountry, ...rest } = data;

        const newChargeDetailRules = chargeDetailRules.map((item) => {
            return {
                min_no_of_txn: Number(item.min_no_of_txn),
                max_no_of_txn: Number(item.max_no_of_txn),
                flat_amount: Number(item.flat_amount),
            };
        });

        let hasError = false;

        newChargeDetailRules.forEach((rule, index) => {
            if (isEmpty(rule.min_no_of_txn)) {
                hasError = true;
                setError(`chargeDetailRules.${index}.min_no_of_txn`, { message: "Required" });
            }

            if (isEmpty(rule.max_no_of_txn)) {
                hasError = true;
                setError(`chargeDetailRules.${index}.max_no_of_txn`, { message: "Required" });
            }

            if ((rule.max_no_of_txn ?? 0) <= (rule.min_no_of_txn ?? 0)) {
                hasError = true;
                setError(`chargeDetailRules.${index}.max_no_of_txn`, {
                    message: "Max amount must be greater than min amount",
                });
            }
            if (isEmpty(rule.flat_amount)) {
                hasError = true;
                setError(`chargeDetailRules.${index}.flat_amount`, { message: "Required" });
            }
        });

        const formattedDataToSend = {
            sendingCountry,
            receivingCountry,
            chargeDetailRules: newChargeDetailRules,
        };

        if (!hasError)
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
