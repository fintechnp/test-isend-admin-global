import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import HookForm from "App/core/hook-form/HookForm";
import PageContent from "App/components/Container/PageContent";
import { addUserKycValidationSchema } from "./validations/addUserKycValidation";
import MarketMakerKycForm from "Private/components/MarketMaker/MarketMakerKycForm";

import { AccountAction as actions } from "./store";
import { Loading } from "App/components";
import { businessActions } from "Private/pages/Business/store";

export default function AddUserKyc() {
    const dispatch = useDispatch();
    const { id, kycId } = useParams();
    const navigate = useNavigate();
    const methods = useForm({
        resolver: yupResolver(addUserKycValidationSchema),
    });

    const { response, loading: kycDetailLoading } = useSelector((state) => state.get_business_kyc_details);
    const { success, loading } = useSelector((state) => state.update_system_user_kyc);

    const kycData = response?.data;

    const { setValue } = methods;

    useEffect(() => {
        dispatch(businessActions.get_business_kyc_details(kycId));
    }, [kycId]);

    useEffect(() => {
        if (success) {
            navigate("/user/accounts");
        }
    }, [success]);

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
            userId: id,
            isBusinessUser: false,
            ...rest,
        };

        dispatch(actions.update_system_user_kyc(kycId, dataToSend));
    };

    if (kycDetailLoading) {
        return <Loading loading={kycDetailLoading} />;
    }
    return (
        <PageContent title="Edit User KYC">
            <HookForm onSubmit={onSubmitData} {...methods}>
                <MarketMakerKycForm formLoading={loading} isUserKyc={true} isAddMode={false} />
            </HookForm>
        </PageContent>
    );
}
