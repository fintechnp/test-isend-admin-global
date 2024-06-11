import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import buildRoute from "App/helpers/buildRoute";
import Center from "App/components/Center/Center";
import HookForm from "App/core/hook-form/HookForm";
import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";
import MarketMakerKybForm from "Private/components/MarketMaker/MarketMakerKybForm";

import { businessActions } from "Private/pages/Agent/Business/store";
import { MarketMakerActions as actions } from "Private/pages/Agent/MarketMaker/store";
import { marketMakerKybValidationSchema } from "./validation/MarketMakerKybValidation";
import isEmpty from "App/helpers/isEmpty";

export default function UpdateMarketMakerKyb({ title }) {
    const { marketMakerId, kybId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, response, success } = useSelector((state) => state.update_market_maker_kyb);

    const { response: kybDetail, loading: kybDetailLoading } = useSelector((state) => state.get_business_kyb_details);

    const methods = useForm({
        resolver: yupResolver(marketMakerKybValidationSchema),
    });

    useEffect(() => {
        dispatch(businessActions.get_business_kyb_details(kybId));
    }, [kybId]);

    useEffect(() => {
        if (success) {
            navigate(buildRoute(routePaths.agent.viewMarketMaker, marketMakerId));
        }
    }, [success]);

    const kybDetailData = kybDetail?.data || {};

    const {
        handleSubmit,
        setValue,
        formState: { errors },
        setError,
    } = methods;

    useEffect(() => {
        //Personal details
        setValue("name", kybDetailData?.name);
        setValue("registrationNo", kybDetailData?.registrationNo);
        setValue("registereddate", kybDetailData?.registeredDate);
        setValue("brandName", kybDetailData?.brandName);
        setValue("registeredCountryId", kybDetailData?.registeredCountry?.countryId);
        setValue("registeredEntity", kybDetailData?.registeredEntity);
        setValue("businessType", kybDetailData?.businessType);

        //Address

        setValue("countryId", kybDetailData?.address?.countryId);
        setValue("postCode", kybDetailData?.address?.postCode);
        setValue("unit", kybDetailData?.address?.unit);
        setValue("street", kybDetailData?.address?.street);
        setValue("city", kybDetailData?.address?.city);
        setValue("state", kybDetailData?.address?.state);
        setValue("address", kybDetailData?.address?.address);

        //Document

        setValue("documents", kybDetailData?.documents || []);
    }, [kybDetail]);

    const onSubmitData = (data) => {
        const requiredDocuments = data.documents
            .filter((document) => !!document.documentTypeId && !!document.documentId)
            .map((document) => ({
                documentTypeId: document.documentTypeId,
                documentId: document.documentId,
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

        const requestData = { ...dataToSend, documents: requiredDocuments };

        dispatch(actions.update_market_maker_kyb(kybId, requestData));
    };
    return (
        <PageContent title="Edit Agent KYB">
            <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                {kybDetailLoading ? (
                    <Center>
                        <CircularProgress />
                    </Center>
                ) : (
                    <MarketMakerKybForm formLoading={loading} isAddMode={false} />
                )}
            </HookForm>
        </PageContent>
    );
}
