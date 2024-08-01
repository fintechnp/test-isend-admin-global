import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import BeneficiaryForm from "./Form";
import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "../store/actions";

function CreateBeneficiary() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { success: isSuccess, loading: isLoading } = useSelector((state) => state.create_beneficiary);

    const handleSubmit = (data) => {
        dispatch(
            actions.create_beneficiary({
                ...data,
                payout_location_id: String(data?.payout_location_id),
            }),
        );
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(actions.create_beneficiary_reset());
            navigate(buildRoute(routePaths.ListCustomerBeneficiary, id));
        }
    }, [isSuccess]);

    return (
        <PageContent
            documentTitle="Create Beneficiary"
            breadcrumbs={[
                {
                    label: "Benefeciaries",
                    link: buildRoute(routePaths.ListCustomerBeneficiary, id),
                },
                {
                    label: "Create",
                },
            ]}
        >
            <PageContentContainer title="Create Beneficiary">
                <BeneficiaryForm isSubmitting={isLoading} onSubmit={handleSubmit} isAddMode />
            </PageContentContainer>
        </PageContent>
    );
}

export default React.memo(CreateBeneficiary);
