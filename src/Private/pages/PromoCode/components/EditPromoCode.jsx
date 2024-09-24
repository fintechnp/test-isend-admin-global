import { marked } from "marked";
import Box from "@mui/material/Box";
import { styled } from "@mui/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ImageLoader } from "/src/assets/isend/isend-Loader.svg";

import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";
import PageContentContainer from "App/components/Container/PageContentContainer";

import ParentPromoCodeForm from "./ParentPromoCodeForm";
import HtmlToPlainText from "../HtmlToPlainText";
import { promoCodeActions } from "../store";

const StyledLoaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    overflow: "auto",
}));

const EditPromoCode = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: promoCodeId } = useParams();

    const { loading: isLoading, success: isSuccess } = useSelector((state) => state.update_promo_code);
    const { response } = useSelector((state) => state.get_promo_code_by_id);

    const getUpdateById = response?.data;

    console.log(getUpdateById?.status);

    const initialValues = {
        StartDate: getUpdateById?.startDate,
        EndDate: getUpdateById?.endDate,
        Status: getUpdateById?.status,
        Budget: getUpdateById?.budget,
        LimitPerUser: getUpdateById?.limitPerUser,
        LimitPerPromo: getUpdateById?.limitPerCampaign,
        TermsAndCondition: HtmlToPlainText(getUpdateById?.termsAndCondition),
        WebImage: getUpdateById?.webImage,
        MobileImage: getUpdateById?.mobileImage,
        Description: getUpdateById?.description,
    };

    useEffect(() => {
        dispatch(promoCodeActions.get_promo_code_by_id(promoCodeId));
    }, [dispatch, promoCodeId]);

    const handleSubmit = (data) => {
        console.log(data);

        const formData = Object.fromEntries(data.entries());

        const filteredData = {
            StartDate: formData["Campaign.StartDate"],
            EndDate: formData["Campaign.EndDate"],
            Status: parseInt(formData["Campaign.Status"], 10),
            Budget: parseFloat(formData["Campaign.Budget"]),
            LimitPerUser: parseInt(formData["LimitPerUser"], 10) ?? 0,
            LimitPerPromo: parseInt(formData["LimitPerPromo"], 10) ?? 0,
            Description: formData["Description"],
            TermsAndCondition: marked(formData["TermsAndCondition"]),
        };

        const finalFormData = new FormData();

        for (const key in filteredData) {
            finalFormData.append(key, filteredData[key]);
        }

        if (data.get("WebImage")) {
            finalFormData.append("WebImage", data.get("WebImage"));
        }

        if (data.get("MobileImage")) {
            finalFormData.append("MobileImage", data.get("MobileImage"));
        }

        dispatch(promoCodeActions.update_promo_code(promoCodeId, finalFormData));
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
                {isLoading && (
                    <StyledLoaderWrapper>
                        <ImageLoader />
                    </StyledLoaderWrapper>
                )}

                <Box
                    sx={{
                        filter: isLoading ? "blur(4px)" : "none",
                    }}
                >
                    <ParentPromoCodeForm
                        isAddMode={false}
                        isSubmitting={isLoading}
                        handleSubmit={handleSubmit}
                        initialValues={initialValues}
                    />
                </Box>
            </PageContentContainer>
        </PageContent>
    );
};

export default EditPromoCode;
