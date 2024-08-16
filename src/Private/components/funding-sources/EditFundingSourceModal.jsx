import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import FundingSourceForm from "./FundingSourceForm";
import fundingSourceActions from "Private/features/funding-sources/fundingSourceActions";

export default function EditFundingSourceModal() {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading,
        initial_form_state: initialFormState,
    } = useSelector((state) => state.update_funding_source);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_UPDATE_FUNDING_SOURCE_MODAL" });
    }, []);

    const handleSubmit = (data) => {
        dispatch(fundingSourceActions.update_funding_source(initialFormState.fundingsource_id, data));
    };

    if (!isOpen) <></>;

    return (
        <Modal open={isOpen} onClose={handleClose} title="Edit Funding Source">
            <FundingSourceForm
                defaultValues={{
                    payment_name: initialFormState?.payment_name,
                    payment_value: initialFormState?.payment_value,
                    funding_source_type: initialFormState?.funding_source_type,
                    country: initialFormState?.country,
                    currency: initialFormState?.currency,
                    description: initialFormState?.description,
                    is_active: initialFormState?.is_active,
                }}
                isAddMode={false}
                onSubmit={handleSubmit}
                onCancel={handleClose}
                form="edit_funding_source_form"
                isProcessing={loading}
            />
        </Modal>
    );
}
