import { marked } from "marked";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { promoCodeActions } from "../store";
import PromoCodeForm from "../PromoCodeForm";
import HtmlToPlainText from "../HtmlToPlainText";
const EditPromoCode = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: promoCodeId } = useParams();

    const { loading: isLoading, success: isSuccess } = useSelector((state) => state.update_promo_code);
    const { response } = useSelector((state) => state.get_promo_code_by_id);

    const getUpdateById = response?.data;

    const initialValues = {
        startDate: getUpdateById?.startDate || "",
        endDate: getUpdateById?.endDate || "",
        status: getUpdateById?.status || 0,
        budget: getUpdateById?.budget || 0,
        limitPerUser: getUpdateById?.limitPerUser || 0,
        limitPerPromo: getUpdateById?.limitPerCampaign || 1,
        termsAndCondition: HtmlToPlainText(getUpdateById?.termsAndCondition) || "",
        webImage: getUpdateById?.webImage || "",
        mobileImage: getUpdateById?.mobileImage || "",
        description: getUpdateById?.description || "",
    };

    useEffect(() => {
        dispatch(promoCodeActions.get_promo_code_by_id(promoCodeId));
    }, [dispatch, promoCodeId]);

    const handleSubmit = (data) => {
        const { campaign, reward, trigger, ...rest } = data;

        const filteredData = {
            startDate: data.campaign.startDate,
            endDate: data.campaign.endDate,
            status: data.campaign.status,
            budget: data.campaign.budget,
            limitPerUser: data.limitPerUser,
            limitPerPromo: data.limitPerPromo,
            description: data.description,
            webImage: data.webImage,
            mobileImage: data.mobileImage,
            termsAndCondition: marked(data.termsAndCondition),
        };

        dispatch(promoCodeActions.update_promo_code(promoCodeId, filteredData));
    };

    useEffect(() => {
        if (isSuccess) {
            navigate(routePaths.ListPromoCode);
        }
    }, [isSuccess, dispatch, navigate]);

    return (
        <PageContent
            breadcrumbs={[
                {
                    label: "Setup",
                },
                {
                    label: "List Campaign",
                    link: routePaths.ListPromoCode,
                },
                {
                    label: "Edit Campaign",
                },
            ]}
            documentTitle="Edit Campaign"
        >
            <PageContentContainer title="Edit Campaign">
                <PromoCodeForm
                    isAddMode={false}
                    isSubmitting={isLoading}
                    handleSubmit={handleSubmit}
                    initialValues={initialValues}
                />
            </PageContentContainer>
        </PageContent>
    );
};

export default EditPromoCode;
