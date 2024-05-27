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

import isEmpty from "App/helpers/isEmpty";
import { MarketMakerActions as actions } from "./store";
import { editMarketMakerValidationSchema, marketMakerValidationSchema } from "./validation/MarketMakerValidation";

export default function UpdateMarketMaker({ title }) {
    const dispatch = useDispatch();
    const { marketMakerId } = useParams();

    const { response, loading } = useSelector((state) => state.get_market_maker_details);

    const methods = useForm({
        resolver: yupResolver(editMarketMakerValidationSchema),
    });
    const { handleSubmit, setValue, setError, formState } = methods;

    const marketMakerDetail = response?.data;

    console.log(formState.errors)

    useEffect(() => {
        dispatch(actions.get_market_maker_details(marketMakerId));
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
        setValue("countryId", marketMakerDetail?.address?.countryId);
        setValue("postCode", marketMakerDetail?.address?.postCode);
        setValue("unit", marketMakerDetail?.address?.unit);
        setValue("street", marketMakerDetail?.address?.street);
        setValue("city", marketMakerDetail?.address?.city);
        setValue("state", marketMakerDetail?.address?.state);
        setValue("address", marketMakerDetail?.address?.address);

        //Contact Person
        setValue("contactPersonName", marketMakerDetail?.contactPerson?.name);
        setValue("designationId", marketMakerDetail?.contactPerson?.designationId);
        setValue("contactMobileNo", marketMakerDetail?.contactPerson?.mobileNo);
        setValue("contactPhoneNo", marketMakerDetail?.contactPerson?.phoneNo);
        setValue("contactPersonExtension", marketMakerDetail?.contactPerson?.extension);

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

        dispatch(actions.update_market_maker(marketMakerId, requestData));
    };

    if (loading) {
        return (
            <Grid item xs={12}>
                <Loading loading={loading} />
            </Grid>
        );
    }

    return (
        <PageContent title={title} documentTitle="Edit Agent">
            <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                <MarketMakerForm isAddMode={false} />
            </HookForm>
        </PageContent>
    );
}
