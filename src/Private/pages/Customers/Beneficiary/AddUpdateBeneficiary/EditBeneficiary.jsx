import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import BeneficiaryForm from "./Form";
import buildRoute from "App/helpers/buildRoute";
import Loader from "App/components/Loader/Loader";
import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "./../store/actions";

function EditBeneficiary() {
    const { id, bene_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { success: isSuccess } = useSelector((state) => state.update_beneficiary);
    const { response, loading: isLoading } = useSelector((state) => state.get_beneficiary_byid);

    const beneficiaryData = response.data;

    const handleSubmit = (data) => {
        dispatch(
            actions.update_beneficiary(bene_id, { ...data, payout_location_id: String(data?.payout_location_id) }),
        );
    };

    useEffect(() => {
        if (bene_id) {
            dispatch(actions.get_beneficiary_byid(bene_id));
        } else {
            dispatch({ type: "GET_BENEFICIARY_BYID_RESET" });
        }
    }, [bene_id]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(actions.update_beneficiary_reset());
            navigate(buildRoute(routePaths.ListCustomerBeneficiary, id));
        }
    }, [isSuccess]);

    const defaultValues = {
        unit: beneficiaryData?.unit,
        city: beneficiaryData?.city,
        relation: beneficiaryData?.relation,
        state: beneficiaryData?.state,
        title: beneficiaryData?.title,
        street: beneficiaryData?.street,
        country: beneficiaryData?.country,
        address: beneficiaryData?.address,
        id_type: beneficiaryData?.id_type,
        currency: beneficiaryData?.currency,
        postcode: beneficiaryData?.postcode,
        last_name: beneficiaryData?.last_name,
        id_number: beneficiaryData?.id_number,
        first_name: beneficiaryData?.first_name,
        middle_name: beneficiaryData?.middle_name,
        payment_type: beneficiaryData?.payment_type,
        account_type: beneficiaryData?.account_type,
        mobile_number: beneficiaryData?.mobile_number,
        date_of_birth: beneficiaryData?.date_of_birth,
        receiver_type: beneficiaryData?.receiver_type,
        id_issue_date: beneficiaryData?.id_issue_date,
        account_number: beneficiaryData?.account_number,
        id_expiry_date: beneficiaryData?.id_expiry_date,
        id_issued_country: beneficiaryData?.id_issued_country,
        delivery_option_id: beneficiaryData?.delivery_option_id,
        payout_location_id: beneficiaryData?.payout_location_id,
        phone_country_code: beneficiaryData?.phone_country_code,
        reason_for_remittance: beneficiaryData?.reason_for_remittance,
        branch_identifier_type: beneficiaryData?.branch_identifier_type,
        branch_identifier_value: beneficiaryData?.branch_identifier_value,
    };

    if (isLoading) return <Loader />;

    return (
        <PageContent
            documentTitle="Edit Beneficiary"
            breadcrumbs={[
                {
                    label: "Benefeciaries",
                    link: buildRoute(routePaths.ListCustomerBeneficiary, id),
                },
                {
                    label: "Edit",
                },
            ]}
        >
            <PageContentContainer title="Edit Beneficiary">
                <BeneficiaryForm
                    isSubmitting={isLoading}
                    onSubmit={handleSubmit}
                    isAddMode={false}
                    defaultValues={defaultValues}
                />
            </PageContentContainer>
        </PageContent>
    );
}

export default React.memo(EditBeneficiary);
