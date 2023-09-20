import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import HookForm from "App/core/hook-form/HookForm";
import PageContent from "App/components/Container/PageContent";
import MarketMakerKybForm from "Private/components/MarketMaker/MarketMakerKybForm";

import { MarketMakerActions as actions } from "Private/pages/MarketMaker/store";
import { marketMakerKybValidationSchema } from "./validation/MarketMakerKybValidation";

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
        const { countryId, postCode, unit, street, state, city, address, ...rest } = data;

        const dataToSend = {
            marketMakerId: marketMakerId,
            address: {
                countryId,
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
        <PageContent title="Add Agent KYB">
            <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                <MarketMakerKybForm formLoading={loading} />
            </HookForm>
        </PageContent>
    );
}
