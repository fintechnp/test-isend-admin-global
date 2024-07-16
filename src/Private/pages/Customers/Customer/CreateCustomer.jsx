import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CustomerForm from "./components/CustomerForm";
import PageContent from "App/components/Container/PageContent";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { CustomersCreateAction } from "./store";
import routePaths from "Private/config/routePaths";
import withPermission from "Private/HOC/withPermission";
import { permissions } from "Private/data/permissions";
import { SINGAPORE_ISO3 } from "App/data/SendingCountry";

function CreateCustomer() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { success: isSuccess, loading: isLoading } = useSelector((state) => state.create_customers);

    const handleSubmit = (data) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (!Array.isArray(data[key])) {
                formData.append(key, data[key]);
            }
        });

        const customerDocuments = data.customer_documents;

        if (data.country === SINGAPORE_ISO3) {
            formData.append("state", "SINGAPORE");
        }

        for (let i = 0; i < customerDocuments.length; i++) {
            if (!customerDocuments[i]?.document) break;
            const customerDocument = customerDocuments[i];
            formData.append(`customer_documents[${i}].side`, customerDocument.side);
            formData.append(`customer_documents[${i}].document`, customerDocument.document);
        }

        dispatch(CustomersCreateAction.create_customer(formData));
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(CustomersCreateAction.create_customer_reset());
            navigate(routePaths.ListCustomer);
        }
    }, [isSuccess]);

    return (
        <PageContent
            documentTitle="Create Customer"
            breadcrumbs={[
                {
                    label: "Customers",
                    link: routePaths.ListCustomer,
                },
                {
                    label: "Create",
                },
            ]}
        >
            <PageContentContainer title="Create Customer">
                <CustomerForm isSubmitting={isLoading} onSubmit={handleSubmit} isAddMode />
            </PageContentContainer>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.CREATE_CUSTOMER] })(CreateCustomer);
