import Box from "@mui/material/Box";
import { styled } from "@mui/styles";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ImageLoader } from "/src/assets/isend/isend-Loader.svg";

import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";
import PageContentContainer from "App/components/Container/PageContentContainer";

import ParentPromoCodeForm from "./ParentPromoCodeForm";
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
                    <ParentPromoCodeForm isSubmitting={isLoading} isAddMode={true} handleSubmit={handleSubmit} />
                </Box>
            </PageContentContainer>
        </PageContent>
    );
};

export default AddPromoCode;
