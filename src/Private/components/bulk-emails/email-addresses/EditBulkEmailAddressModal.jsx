import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import BulkEmailAddressForm from "./BulkEmailAddressForm";

export default function EditBulkEmailAddressModal() {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading,
        bulk_email_address_id: bulkEmailAddressId,
        initial_form_state: initialFormState,
    } = useSelector((state) => state.update_bulk_email_address);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_UPDATE_BULK_EMAIL_ADDRESS_MODAL" });
    }, []);

    const handleSubmit = (data) => {
        dispatch({ type: "UPDATE_BULK_EMAIL_ADDRESS", bulk_email_address_id: bulkEmailAddressId, data });
    };

    if (!isOpen) <></>;

    return (
        <Modal open={isOpen} onClose={handleClose} title="Edit Email Address">
            <BulkEmailAddressForm
                onSubmit={handleSubmit}
                isAddMode={false}
                onCancel={handleClose}
                isProcessing={loading}
                initialState={initialFormState}
            />
        </Modal>
    );
}
