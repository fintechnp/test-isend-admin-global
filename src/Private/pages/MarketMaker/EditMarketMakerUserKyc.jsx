import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import buildRoute from "App/helpers/buildRoute";
import Center from "App/components/Center/Center";
import HookForm from "App/core/hook-form/HookForm";
import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";

import { businessActions } from "Private/pages/Business/store";
import { MarketMakerActions as actions } from "Private/pages/MarketMaker/store";
import MarketMakerKycForm from "Private/components/MarketMaker/MarketMakerKycForm";
import { marketMakerUserKycValidationSchema } from "./validation/MarketMakerKycValidation";
import { Loading } from "App/components";

export default function UpdateMarketMakerKyc() {
    const { userId, kycId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const methods = useForm({
        resolver: yupResolver(marketMakerUserKycValidationSchema),
    });

    const { response, loading } = useSelector((state) => state.get_business_kyc_details);

    const { loading: updating, success: updateSuccess } = useSelector((state) => state.update_market_maker_kyc);

    const kycData = response?.data;
    console.log("🚀 ~ file: EditMarketMakerUserKyc.jsx:33 ~ UpdateMarketMakerKyc ~ kycData:", kycData);

    useEffect(() => {
        dispatch(businessActions.get_business_kyc_details(kycId));
    }, []);

    useEffect(() => {
        //Details

        setValue("firstName", kycData?.firstName);
        setValue("middleName", kycData?.middleName || "");
        setValue("lastName", kycData?.lastName);
        setValue("dateOfBirth", kycData?.dateOfBirth);
        setValue("mobileNumber", kycData?.mobileNumber);
        setValue("identityNo", kycData?.identityNo);
        setValue("identityIssuedBy", kycData?.identityIssuedBy);
        setValue("birthCountryId", kycData?.birthCountry?.countryId);
        setValue("gender", kycData?.gender);
        setValue("identityTypeId", kycData?.identityTypeId);
        setValue("identityIssuedCountryId", kycData?.identityIssuedCountryId);
        setValue("identityIssuedDate", kycData?.identityIssuedDate);
        setValue("identityExpiryDate", kycData?.identityExpiryDate);
        setValue("designationId", kycData?.designationId);

        // Temporary Address
        setValue("temporaryAddressCountryId", kycData?.temporaryAddress?.countryDetails?.countryId);
        setValue("temporaryAddressPostCode", kycData?.temporaryAddress?.postCode);
        setValue("temporaryAddressUnit", kycData?.temporaryAddress?.unit);
        setValue("temporaryAddressStreet", kycData?.temporaryAddress?.street);
        setValue("temporaryAddressCity", kycData?.temporaryAddress?.city);
        setValue("temporaryAddressState", kycData?.temporaryAddress?.state);
        setValue("temporaryAddressAddress", kycData?.temporaryAddress?.address);

        // Permanent Address
        setValue("permanentAddressCountryId", kycData?.permanentAddress?.countryDetails?.countryId);
        setValue("permanentAddressPostCode", kycData?.permanentAddress?.postCode);
        setValue("permanentAddressUnit", kycData?.permanentAddress?.unit);
        setValue("permanentAddressStreet", kycData?.permanentAddress?.street);
        setValue("permanentAddressCity", kycData?.permanentAddress?.city);
        setValue("permanentAddressState", kycData?.permanentAddress?.state);
        setValue("permanentAddressAddress", kycData?.permanentAddress?.address);

        //Document
        setValue("documents", kycData?.documents || []);
    }, [response]);

    useEffect(() => {
        if (updateSuccess) {
            navigate(routePaths.agent.listMarketMaker);
        }
    }, [updateSuccess]);

    const {
        handleSubmit,
        setValue,
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
            ...rest,
        };
        dispatch(actions.update_market_maker_kyc(kycId, dataToSend));
    };
    return (
        <PageContent title="Edit Agent User KYC ">
            <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                {loading ? (
                    <Center>
                        <Loading loading={loading} />
                    </Center>
                ) : (
                    <MarketMakerKycForm isAddMode={false} formLoading={updating} isDefaultUserKyc={true} />
                )}
            </HookForm>
        </PageContent>
    );
}
