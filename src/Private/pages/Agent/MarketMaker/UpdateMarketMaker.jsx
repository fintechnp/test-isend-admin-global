import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "App/components";
import HookForm from "App/core/hook-form/HookForm";
import PageContent from "App/components/Container/PageContent";
import MarketMakerForm from "Private/components/MarketMaker/MarketMakerForm";
import PageContentContainer from "App/components/Container/PageContentContainer";

import isEmpty from "App/helpers/isEmpty";
import { MarketMakerActions as actions } from "./store";
import { editMarketMakerValidationSchema } from "./validation/MarketMakerValidation";
import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import Loader from "App/components/Loader/Loader";

export default function UpdateMarketMaker({ title }) {
    const dispatch = useDispatch();
    const { agentId } = useParams();

    const { response, loading } = useSelector((state) => state.get_market_maker_details);

    const methods = useForm({
        resolver: yupResolver(editMarketMakerValidationSchema),
    });
    const { handleSubmit, setValue, setError, formState } = methods;

    const marketMakerDetail = response?.data;

    useEffect(() => {
        dispatch(actions.get_market_maker_details(agentId));
    }, []);

    const allowedCountries = marketMakerDetail?.allowedCountries?.map((item) => item?.countryId);

    useEffect(() => {
        //detail
        setValue("name", marketMakerDetail?.name);
        setValue("registrationNo", marketMakerDetail?.registrationNo);
        setValue("typeOfBusinessId", marketMakerDetail?.typeOfBusinessId);
        setValue("registereddate", marketMakerDetail?.registeredDate);
        setValue("brandName", marketMakerDetail?.brandName);
        setValue("registeredCountryId", marketMakerDetail?.registeredCountryId);
        setValue("currencyId", marketMakerDetail?.currencyId);
        setValue("email", marketMakerDetail?.email);
        setValue("contactNo", marketMakerDetail?.contactNo);
        setValue("website", marketMakerDetail?.website);
        setValue("allowedCountryIds", allowedCountries);

        //address
        setValue("address.countryId", marketMakerDetail?.address?.countryId);
        setValue("address.postCode", marketMakerDetail?.address?.postCode);
        setValue("address.unit", marketMakerDetail?.address?.unit);
        setValue("address.street", marketMakerDetail?.address?.street);
        setValue("address.city", marketMakerDetail?.address?.city);
        setValue("address.state", marketMakerDetail?.address?.state);
        setValue("address.address", marketMakerDetail?.address?.address);

        //Contact Person
        setValue("contactPerson.name", marketMakerDetail?.contactPerson?.name);
        setValue("contactPerson.designationId", marketMakerDetail?.contactPerson?.designationId);
        setValue("contactPerson.mobileNo", marketMakerDetail?.contactPerson?.mobileNo);
        setValue("contactPerson.phoneNo", marketMakerDetail?.contactPerson?.phoneNo);
        setValue("contactPerson.extension", marketMakerDetail?.contactPerson?.extension);
        setValue("contactPerson.countryId", marketMakerDetail?.contactPerson?.countryId);
        setValue("contactPerson.email", marketMakerDetail?.contactPerson?.email);

        setValue("documents", marketMakerDetail?.documents || []);
    }, [marketMakerDetail]);

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

        const requestPayload = { ...data, documents: requiredDocuments };

        dispatch(actions.update_market_maker(agentId, requestPayload));
    };

    return (
        <PageContent
            title={title}
            documentTitle="Edit Agent"
            breadcrumbs={[
                {
                    label: "Agents",
                    link: routePaths.ListAgent,
                },
                {
                    label: agentId,
                    link: buildRoute(routePaths.ViewAgent, agentId),
                },
                {
                    label: "Edit",
                },
            ]}
        >
            <PageContentContainer>
                {loading ? (
                    <Loader />
                ) : (
                    <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                        <MarketMakerForm isAddMode={false} />
                    </HookForm>
                )}
            </PageContentContainer>
        </PageContent>
    );
}
