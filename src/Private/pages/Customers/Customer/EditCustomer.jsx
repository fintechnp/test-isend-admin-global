import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "App/components/Loader/Loader";
import CustomerForm from "./components/CustomerForm";
import PageContent from "App/components/Container/PageContent";
import PageContentContainer from "App/components/Container/PageContentContainer";

import buildRoute from "App/helpers/buildRoute";
import { CustomersCreateAction } from "./store";
import routePaths from "Private/config/routePaths";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";

function EditCustomer() {
    const { id: customerId } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {
        response: getCustomerByIdResponse,
        error,
        loading: isLoading,
    } = useSelector((state) => state.get_customer_by_id);

    const { loading: isSubmitting, success: isSuccess } = useSelector((state) => state.update_customers);

    const customer = getCustomerByIdResponse?.data;

    useEffect(() => {
        dispatch(CustomersCreateAction.get_customer_by_id(customerId));
    }, []);

    const handleSubmit = (data) => {
        dispatch(CustomersCreateAction.update_customer(customerId, data));
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(CustomersCreateAction.update_customer_reset());
            navigate(buildRoute(routePaths.ViewCustomer, customerId));
        }
    }, [isSuccess]);

    const defaultValues = {
        country: customer?.country,
        first_name: customer?.first_name,
        middle_name: customer?.middle_name,
        last_name: customer?.last_name,
        postcode: customer?.postcode,
        unit: customer?.unit,
        street: customer?.street,
        street_no: customer?.street_no,
        street_type: customer?.street_type,
        city: customer?.city,
        state: customer?.state,
        address: customer?.address,
        gender: customer?.gender,
        id_type: customer?.id_type,
        id_number: customer?.id_number,
        id_issue_date: customer?.id_issue_date?.substring(0, 10),
        id_expiry_date: customer?.id_expiry_date?.substring(0, 10),
        id_issued_country: customer?.id_issued_country,
        date_of_birth: customer?.date_of_birth?.substring(0, 10),
        birth_country: customer?.birth_country,
        citizenship_country: customer?.citizenship_country,
        occupation: customer?.occupation,
        source_of_income: customer?.source_of_income,
        ssn_number: customer?.ssn_number,
    };

    if (isLoading) return <Loader />;

    return (
        <PageContent
            documentTitle="Edit Customer"
            breadcrumbs={[
                {
                    label: "Customers",
                    link: routePaths.ListCustomer,
                },
                {
                    label: customerId,
                    link: buildRoute(routePaths.ViewCustomer, customerId),
                },
                {
                    label: "Edit",
                },
            ]}
        >
            <PageContentContainer title="Edit Customer">
                <CustomerForm
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    defaultValues={defaultValues}
                    isAddMode={false}
                />
            </PageContentContainer>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.EDIT_CUSTOMER] })(EditCustomer);
