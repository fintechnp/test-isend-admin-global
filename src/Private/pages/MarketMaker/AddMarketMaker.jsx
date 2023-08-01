import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import PageContent from "App/components/Container/PageContent";
import MarketMakerForm from "Private/components/MarketMaker/MarketMakerForm";

import { MarketMakerActions as actions } from "./store";

export default function AddMarketMaker({ title }) {
    const dispatch = useDispatch();

    const { response, loading } = useSelector((state) => state.add_market_maker);
    console.log("🚀 ~ file: AddMarketMaker.jsx:16 ~ AddMarketMaker ~ response:", response);
    const methods = useForm({
        // resolver: yupResolver(),
    });

    const { handleSubmit } = methods;

    const onSubmitData = (data) => {
        const {
            country,
            postCode,
            unit,
            street,
            state,
            city,
            address,
            contactPersonName,
            designationId,
            contactMobileNo,
            contactPhoneNo,
            contactPersonExtension,
            ...rest
        } = data;
        const formattedDataToSend = {
            ...rest,
            address: {
                country,
                postCode,
                unit,
                street,
                city,
                state,
                address,
            },
            contactPerson: {
                name: contactPersonName,
                designationId: designationId,
                mobileNo: contactMobileNo,

                phoneNo: contactPhoneNo,

                extension: contactPersonExtension,
            },
        };
        console.log("🚀 ~ file: AddMarketMaker.jsx:52 ~ onSubmitData ~ formattedDataToSend:", formattedDataToSend);
        // console.log(data);
        dispatch(actions.add_market_maker(formattedDataToSend));
    };

    const {} = methods;
    return (
        <PageContent title={title} documentTitle="Add Market Maker">
            <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                <MarketMakerForm />
            </HookForm>
        </PageContent>
    );
}
