import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import HookForm from "App/core/hook-form/HookForm";
import PageContent from "App/components/Container/PageContent";
import MarketMakerKycForm from "Private/components/MarketMaker/MarketMakerKycForm";

import { MarketMakerActions as actions } from "Private/pages/Agent/MarketMaker/store";
import { marketMakerKycValidationSchema } from "./validation/MarketMakerKycValidation";
import isEmpty from "App/helpers/isEmpty";

export default function AddMarketMakerKyc({ title }) {
    const methods = useForm({
        resolver: yupResolver(marketMakerKycValidationSchema),
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { marketMakerId } = useParams();

    const { loading, success } = useSelector((state) => state.add_market_maker_kyc);

    const {
        formState: { errors },
        setError,
    } = methods;

    useEffect(() => {
        if (success) {
            navigate(buildRoute(routePaths.agent.viewMarketMaker, marketMakerId));
        }
    }, [success]);

    const onSubmitData = (data) => {
        const requiredDocuments = data.documents
            .filter((document) => !!document.documentTypeId && !!document.documentId)
            .map((document) => ({
                documentTypeId: document.documentTypeId,
                documentId: document.documentId,
                documentName: document.documentName,
            }));

        const requiredEmptyDocuments = data.documents.filter((document, index) => {
            if (document.isRequired && isEmpty(document.documentId)) {
                setError(`documents.${index}.documentId`, {
                    type: "required",
                    message: "Document is required",
                });
            }
            return document.isRequired && isEmpty(document.documentId);
        });

        if (requiredEmptyDocuments.length > 0) return;

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
            ...rest,
        };

        const requestData = { ...dataToSend, documents: requiredDocuments };

        dispatch(actions.add_market_maker_kyc(requestData));
    };

    return (
        <PageContent title="Add Agent KYC">
            <HookForm onSubmit={onSubmitData} {...methods}>
                <MarketMakerKycForm formLoading={loading} />
            </HookForm>
        </PageContent>
    );
}
