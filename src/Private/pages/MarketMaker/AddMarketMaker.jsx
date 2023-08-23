import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import HookForm from "App/core/hook-form/HookForm";
import PageContent from "App/components/Container/PageContent";
import MarketMakerForm from "Private/components/MarketMaker/MarketMakerForm";

import { MarketMakerActions as actions } from "./store";
import { marketMakerValidationSchema } from "./validation/MarketMakerValidation";

export default function AddMarketMaker({ title, isAddMode }) {
    const dispatch = useDispatch();

    const { response, loading } = useSelector((state) => state.add_market_maker);
    const methods = useForm({
        resolver: yupResolver(marketMakerValidationSchema),
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
