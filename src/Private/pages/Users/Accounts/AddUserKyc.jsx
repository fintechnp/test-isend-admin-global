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

    const { setValue, setError } = methods;

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
        console.log("🚀 ~ file: AddUserKyc.jsx:44 ~ onSubmitData ~ data:", data);
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

        const requestData = { ...dataToSend, documents: requiredDocuments };

        // dispatch(actions.add_system_user_kyc(requestData));
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
