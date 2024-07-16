import React from "react";
import PropTypes from "prop-types";

import CustomerFormStep1 from "./CustomerFormStep1";
import CustomerFormStep2 from "./CustomerFormStep2";
import CustomerFormStep3 from "./CustomerFormStep3";
import CustomerFormStep4 from "./CustomerFormStep4";
import HookStepForm from "App/core/hook-form/HookStepForm";

import {
    createCustomerFormStep1Schema,
    createCustomerFormStep2Schema,
    createCustomerFormStep3Schema,
} from "../schema/createCustomerSchema";

import { CustomerType } from "../data/CustomerType";
import useReactHookForm from "App/core/hook-form/useReactHookForm";
import { CustomerDocumentSide } from "../data/CustomerDocumentSide";

import {
    updateCustomerFormStep1Schema,
    updateCustomerFormStep2Schema,
    updateCustomerFormStep3Schema,
} from "../schema/updateCustomerSchema";

export default function CustomerForm({ isSubmitting = false, onSubmit, defaultValues, isAddMode }) {
    const steps = [
        {
            key: "personal-information",
            label: "Customer's Personal Information",
            component: <CustomerFormStep1 />,
            schema: isAddMode ? createCustomerFormStep1Schema : updateCustomerFormStep1Schema,
        },
        {
            key: "address-information",
            label: "Customer's Address Information",
            component: <CustomerFormStep2 />,
            schema: isAddMode ? createCustomerFormStep2Schema : updateCustomerFormStep2Schema,
        },
        {
            key: "document-information",
            label: "Customer's Document Information",
            component: <CustomerFormStep3 />,
            schema: isAddMode ? createCustomerFormStep3Schema : updateCustomerFormStep3Schema,
        },
        {
            key: "preview-information",
            label: "Preview Information",
            component: <CustomerFormStep4 />,
        },
    ];

    const methods = useReactHookForm({
        defaultValues: isAddMode
            ? {
                  customer_type: CustomerType.INDIVIDUAL,
                  customer_documents: [
                      {
                          form_label: "Document Upload (Front)",
                          preview_label: "Document Front",
                          side: CustomerDocumentSide.FRONT,
                          document: null,
                          acceptedFiles: ["image/jpeg", "image/jpg", "image/png"],
                      },
                      {
                          form_label: "Document Upload (Back)",
                          preview_label: "Document Back",
                          side: CustomerDocumentSide.BACK,
                          document: null,
                          acceptedFiles: ["image/jpeg", "image/jpg", "image/png"],
                      },
                      {
                          form_label: "Customer Photo",
                          preview_label: "Customer Photo",
                          side: CustomerDocumentSide.FACE,
                          document: null,
                          acceptedFiles: ["image/jpeg", "image/jpg", "image/png"],
                      },
                  ],
              }
            : defaultValues,
    });

    return (
        <HookStepForm
            stepForms={steps}
            isAddMode={isAddMode}
            {...methods}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            encType="multipart/form-data"
        />
    );
}

CustomerForm.propTypes = {
    isSubmitting: PropTypes.bool,
    defaultValues: PropTypes.object,
    isAddMode: PropTypes.bool.isRequired,
};
