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

export default function AddUserKyc() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const methods = useForm({
        resolver: yupResolver(addUserKycValidationSchema),
    });

    const { loading, success } = useSelector((state) => state.add_system_user_kyc);
    const { response: userDetail, loading: detailLoading } = useSelector((state) => state.get_user_details_id);

    const { setValue } = methods;

    useEffect(() => {
        if (success) {
            navigate("/user/accounts");
        }
    }, [success]);

    useEffect(() => {
        dispatch(actions.get_user_details_by_id(id));
    }, [id]);

    useEffect(() => {
        setValue("firstName", userDetail?.data?.first_name);
        setValue("lastName", userDetail?.data?.last_name);
    }, [userDetail]);

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

        dispatch(actions.add_system_user_kyc(dataToSend));
    };

    if (detailLoading) {
        return <Loading loading={detailLoading} />;
    }
    return (
        <PageContent title="Add User KYC">
            <HookForm onSubmit={onSubmitData} {...methods}>
                <MarketMakerKycForm formLoading={loading} isUserKyc={true} />
            </HookForm>
        </PageContent>
    );
}
