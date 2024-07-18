import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "App/components/Loader/Loader";
import HookForm from "App/core/hook-form/HookForm";
import BusinessForm from "./components/BusinessForm";
import PageContent from "App/components/Container/PageContent";
import PageContentContainer from "App/components/Container/PageContentContainer";

import isEmpty from "App/helpers/isEmpty";
import { businessActions } from "./store";
import { relatedTo } from "Private/data/b2b";
import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import { createBusinessKybSchema } from "./schema/businessKybSchema";

export default function EditBusiness() {
    const { businessId } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { response: getBusinessByIdResponse, loading: isLoadingBusinessById } = useSelector(
        (state) => state.get_business_details,
    );

    const { loading: isLoading, success: isSuccess } = useSelector((state) => state.update_business);

    const methods = useForm({
        resolver: yupResolver(createBusinessKybSchema),
    });

    const { setValue } = methods;

    useEffect(() => {
        dispatch(businessActions.get_business_details(businessId));
    }, [businessId]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(businessActions.update_business_reset());
            navigate(-1);
        }
    }, [isSuccess]);

    useEffect(() => {
        const data = getBusinessByIdResponse?.data;
        if (!data) return;
        setValue("name", data.name);
        setValue("brandName", data.brandName);
        setValue("registrationNo", data.registrationNo);
        setValue("registeredDate", data.registeredDate);
        setValue("registeredCountryId", data.registeredCountryId);
        setValue("phoneNo", data.phoneNo);
        setValue("email", data.email);
        setValue("typeOfBusinessId", data.typeOfBusinessId);
        setValue("website", data.website);
        setValue("addressCountry", data.address.countryId);
        setValue("addressPostCode", data.address.postCode);
        setValue("addressUnit", data.address.unit);
        setValue("addressState", data.address.state);
        setValue("addressStreet", data.address.street);
        setValue("addressCity", data.address.city);
        setValue("address", data.address.address);
        setValue("contactPersonName", data.contactPersonName);
        setValue("contactPersonDesignationId", data.contactPersonDesignationId);
        setValue("contactPersonExtension", data.contactPersonExtension);
        setValue("contactPersonMobileNumber", data.contactPersonPhoneNumber);
        setValue("contactPersonPhoneNumber", data.contactPersonPhoneNumber);
        setValue("contactPersonCountryId", data.contactPersonCountryId);
        setValue("contactPersonEmail", data.contactPersonEmail);
    }, [getBusinessByIdResponse]);

    const { handleSubmit, setError } = methods;

    const onSubmitData = (data) => {
        const requiredDocuments = data.documents
            .filter((document) => !!document.documentTypeId && !!document.documentId)
            .map((document) => ({
                documentTypeId: document.documentTypeId,
                documentName: document.documentName,
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

        const requestPayload = {
            ...data,
            documents: requiredDocuments,
            relatedTo: relatedTo.BUSINESS,
            relatedId: businessId,
        };

        dispatch(businessActions.update_business(businessId, requestPayload));
    };

    return (
        <PageContent
            documentTitle="B2B | Edit Business"
            breadcrumbs={[
                {
                    label: "Businesses",
                    link: routePaths.ListBusiness,
                },
                {
                    label: businessId,
                    link: buildRoute(routePaths.ViewBusiness, businessId),
                },
                {
                    label: "Edit",
                },
            ]}
        >
            <PageContentContainer title="Edit Business">
                {isLoadingBusinessById ? (
                    <Loader />
                ) : (
                    <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                        <BusinessForm isProcessing={isLoading} isAddMode={false} />
                    </HookForm>
                )}
            </PageContentContainer>
        </PageContent>
    );
}
