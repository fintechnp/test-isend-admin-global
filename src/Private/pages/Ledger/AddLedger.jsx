import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import routePaths from "Private/config/routePaths";
import HookForm from "App/core/hook-form/HookForm";
import LedgerForm from "Private/components/Ledger/LedgerForm";
import PageContent from "App/components/Container/PageContent";
import { ledgerValidationSchema } from "./validation/addLedgerValidationSchema";

import { ledgerActions as actions } from "./store";

export default function AddLedger() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const methods = useForm({
        resolver: yupResolver(ledgerValidationSchema),
    });

    const { loading, success } = useSelector((state) => state.add_ledger);

    useEffect(() => {
        if (success) {
            navigate(routePaths.agent.listLedger);
        }
    }, [success]);

    const { handleSubmit } = methods;

    const onSubmitData = (data) => {
        // const { country, ...rest } = data;

        const dataToSend = {
            narration: data?.narration,
            createLedgerDetail: data?.createLedgerDetail?.map((item) => ({
                accountId: +item?.accountId,
                transactionType: +item?.transactionType,
                amount: +item?.amount,
                remarks: item?.remarks,
            })),
        };

        dispatch(actions.add_ledger(dataToSend));
    };
    return (
        <PageContent title="Add Ledger">
            <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                <LedgerForm loading={loading} />
            </HookForm>
        </PageContent>
    );
}
