import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import HookForm from "App/core/hook-form/HookForm";
import PageContent from "App/components/Container/PageContent";
import MarketMakerForm from "Private/components/MarketMaker/MarketMakerForm";

import isEmpty from "App/helpers/isEmpty";
import { MarketMakerActions as actions } from "./store";
import { marketMakerValidationSchema } from "./validation/MarketMakerValidation";

export default function AddMarketMaker() {
    const dispatch = useDispatch();

    const methods = useForm({
        resolver: yupResolver(marketMakerValidationSchema),
    });

    const { handleSubmit, setError, formState: {errors} } = methods;

    console.log(errors)

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

        const {
            countryId,
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
                countryId,
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
        const requestData = { ...formattedDataToSend, documents: requiredDocuments };
        dispatch(actions.add_market_maker(requestData));
    };

    return (
        <PageContent title="Add New Agent">
            <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                <MarketMakerForm />
            </HookForm>
        </PageContent>
    );
}
