import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import isEmpty from "App/helpers/isEmpty";
import HookForm from "App/core/hook-form/HookForm";
import PageContent from "App/components/Container/PageContent";
import BusinessChargeForm from "Private/components/BusinessCharge/BusinessChargeForm";
import { businessChargeValidationSchema } from "./validations/AddBusinessServiceChargeValidation";

import { businessChargeActions as actions } from "./store";
import PageContentContainer from "App/components/Container/PageContentContainer";
import routePaths from "Private/config/routePaths";

export default function AddBusinessServiceCharge() {
    const dispatch = useDispatch();

    const methods = useForm({
        resolver: yupResolver(businessChargeValidationSchema),
        defaultValues: {
            chargeDetailRules: [
                {
                    min_no_of_txn: "0",
                    max_no_of_txn: "1",
                    flat_amount: undefined,
                },
            ],
        },
    });

    const {
        handleSubmit,
        setValue,
        formState: { errors },
        setError,
    } = methods;

    useEffect(() => {
        setValue("relatedTo", "business");
    }, []);

    const onSubmitData = (data) => {
        const { chargeDetailRules, ...rest } = data;

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
            ...rest,
            chargeDetailRules: newChargeDetailRules,
        };

        if (!hasError) dispatch(actions.add_business_charge(formattedDataToSend));
    };

    return (
        <PageContent
            documentTitle="Add Business Service Charge"
            breadcrumbs={[
                {
                    label: "B2B",
                },
                {
                    label: "Business Service Charges",
                    link: routePaths.ListBusinessServiceCharge,
                },
                {
                    label: "Create",
                },
            ]}
        >
            <PageContentContainer title="Add Business Service Charge">
                <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                    <BusinessChargeForm isAddMode />
                </HookForm>
            </PageContentContainer>
        </PageContent>
    );
}
