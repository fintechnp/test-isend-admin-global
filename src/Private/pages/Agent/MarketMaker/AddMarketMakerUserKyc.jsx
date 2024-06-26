import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import routePaths from "Private/config/routePaths";
import HookForm from "App/core/hook-form/HookForm";
import PageContent from "App/components/Container/PageContent";
import PageContentContainer from "App/components/Container/PageContentContainer";
import MarketMakerKycForm from "Private/components/MarketMaker/MarketMakerKycForm";

import { relatedTo } from "Private/data/b2b";
import { MarketMakerActions as actions } from "Private/pages/Agent/MarketMaker/store";
import { marketMakerUserKycValidationSchema } from "./validation/MarketMakerKycValidation";

export default function AddMarketMakerUserKyc() {
    const methods = useForm({
        resolver: yupResolver(marketMakerUserKycValidationSchema),
    });

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { userId, agentId } = useParams();

    const { loading, success } = useSelector((state) => state.add_market_maker_kyc);

    useEffect(() => {
        if (success) {
            navigate(routePaths.ListAgent);
        }
    }, [success]);

    const {
        formState: { errors },
    } = methods;

    const onSubmitData = (data) => {
        const {
            temporaryAddressCountryId,
            temporaryAddressPostCode,
            temporaryAddressUnit,
            temporaryAddressCity,
            temporaryAddressStreet,
            temporaryAddressState,
            temporaryAddressAddress,

            permanentAddressCountryId,
            permanentAddressPostCode,
            permanentAddressUnit,
            permanentAddressCity,
            permanentAddressStreet,
            permanentAddressState,
            permanentAddressAddress,

            ...rest
        } = data;

        const dataToSend = {
            temporaryAddress: {
                countryId: temporaryAddressCountryId,
                postCode: temporaryAddressPostCode,
                unit: temporaryAddressUnit,
                city: temporaryAddressCity,
                street: temporaryAddressStreet,
                state: temporaryAddressState,
                address: temporaryAddressAddress,
            },
            permanentAddress: {
                countryId: permanentAddressCountryId,
                postCode: permanentAddressPostCode,
                unit: permanentAddressUnit,
                city: permanentAddressCity,
                street: permanentAddressStreet,
                state: permanentAddressState,
                address: permanentAddressAddress,
            },
            userId,
            isBusinessUser: true,
            relatedTo: relatedTo.AGENT,
            relatedId: agentId,
            ...rest,
        };

        dispatch(actions.add_market_maker_kyc(dataToSend));
    };

    return (
        <PageContent
            documentTitle="Agent - User KYC"
            breadcrumbs={[
                {
                    label: "Agents",
                    link: routePaths.ListAgent,
                },
                {
                    label: "Users",
                },
                {
                    label: "KYCs",
                },
                {
                    label: "Create",
                },
            ]}
        >
            <PageContentContainer>
                <HookForm onSubmit={onSubmitData} {...methods}>
                    <MarketMakerKycForm formLoading={loading} isUserKyc={true} />
                </HookForm>
            </PageContentContainer>
        </PageContent>
    );
}
