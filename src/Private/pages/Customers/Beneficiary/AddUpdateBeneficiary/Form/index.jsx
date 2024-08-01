import * as React from "react";
import Box from "@mui/material/Box";
import { PropTypes } from "prop-types";
import { useParams } from "react-router-dom";

import BasicForm from "./BasicForm";
import AddressForm from "./AddressForm";
import CollectionForm from "./CollectionForm";

import { yupResolver } from "@hookform/resolvers/yup";
import HookStepForm from "App/core/hook-form/HookStepForm";
import useReactHookForm from "App/core/hook-form/useReactHookForm";
import createBeneficiarySchema, { form1Schema, form2Schema, form3Schema } from "../schema/createBeneficiarySchema";
import editBeneficiarySchema, {
    editForm2Schema,
    editForm3Schema,
    editForm1Schema,
} from "../schema/editBeneficiarySchema";

function BeneficiaryForm({ isSubmitting, defaultValues, isAddMode = false, onSubmit }) {
    const { id } = useParams();

    const steps = [
        {
            key: "personal-information",
            label: "Personal Information",
            component: <BasicForm />,
            schema: isAddMode ? form1Schema : editForm1Schema,
        },
        {
            key: "contact-information",
            label: "Contact Information",
            component: <AddressForm />,
            schema: isAddMode ? form2Schema : editForm2Schema,
        },
        {
            key: "payout-information",
            label: "Payout Information",
            component: <CollectionForm />,
            schema: isAddMode ? form3Schema : editForm3Schema,
        },
    ];

    const methods = useReactHookForm({
        defaultValues: isAddMode
            ? {
                  customer_id: id,
              }
            : defaultValues,
        resolver: yupResolver(isAddMode ? createBeneficiarySchema : editBeneficiarySchema),
    });

    return (
        <Box sx={{ width: "100%", pt: "16px" }}>
            <HookStepForm
                stepForms={steps}
                isAddMode={isAddMode}
                {...methods}
                isSubmitting={isSubmitting}
                onSubmit={onSubmit}
            />
        </Box>
    );
}

export default BeneficiaryForm;
BeneficiaryForm.propTypes = {
    isSubmitting: PropTypes.bool,
    defaultValues: PropTypes.object,
    isAddMode: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func,
};
