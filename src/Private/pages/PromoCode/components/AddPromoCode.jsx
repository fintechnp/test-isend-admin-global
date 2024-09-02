import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { promoCodeActions } from "../store";
import PromoCodeForm from "../PromoCodeForm";

const AddPromoCode = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (data) => {
        dispatch(promoCodeActions.add_promo_code(data));
    };

    const { loading: isLoading, success: isSuccess } = useSelector((state) => state.add_promo_code);

    useEffect(() => {
        if (isSuccess) {
            dispatch(promoCodeActions.add_promo_code_reset());
            navigate(routePaths.ListPromoCode);
        }
    }, [isSuccess]);

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
                    label: "Add Campaign",
                },
            ]}
            documentTitle="Add Campaign"
        >
            <PageContentContainer title="Add Campaign">
                <PromoCodeForm isAddMode={true} isLoading={isLoading} handleSubmit={handleSubmit} />
            </PageContentContainer>
        </PageContent>
    );
};

export default AddPromoCode;
