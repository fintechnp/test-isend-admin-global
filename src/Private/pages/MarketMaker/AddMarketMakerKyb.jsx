import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import HookForm from "App/core/hook-form/HookForm";
import { yupResolver } from "@hookform/resolvers/yup";
import PageContent from "App/components/Container/PageContent";
import MarketMakerKybForm from "Private/components/MarketMaker/MarketMakerKybForm";

import { marketMakerKybValidationSchema } from "./validation/MarketMakerKybValidation";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MarketMakerActions as actions } from "Private/pages/MarketMaker/store";
import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";

export default function AddMarketMakerKyb({ title }) {
    const { marketMakerId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, response, success } = useSelector((state) => state.add_market_maker_kyb);
    const methods = useForm({
        resolver: yupResolver(marketMakerKybValidationSchema),
    });

    useEffect(() => {
        if (success) {
            navigate(buildRoute(routePaths.agent.viewMarketMaker, marketMakerId));
        }
    }, [success]);

    const { handleSubmit } = methods;

    const onSubmitData = (data) => {
        const { country, postCode, unit, street, state, city, address, ...rest } = data;
        const dataToSend = {
            marketMakerId: marketMakerId,
            address: {
                country,
                postCode,
                unit,
                street,
                city,
                state,
                address,
            },
            ...rest,
        };

        dispatch(actions.add_market_maker_kyb(dataToSend));
    };
    return (
        <PageContent title={title || "Add Market Maker KYB"} documentTitle="Add Market Maker Kyb">
            <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                <MarketMakerKybForm formLoading={loading} />
            </HookForm>
        </PageContent>
    );
}
