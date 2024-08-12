import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PageContent from "App/components/Container/PageContent";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { promoCodeActions } from "./store";
import PromoCodeForm from "./PromoCodeForm";
import routePaths from "Private/config/routePaths";

const AddPromoCode = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (data) => {
        console.log(data);
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
        <PageContent>
            <PageContentContainer title="Add Promo Code">
                <PromoCodeForm isLoading={isLoading} handleSubmit={handleSubmit} />
            </PageContentContainer>
        </PageContent>
    );
};

export default AddPromoCode;
