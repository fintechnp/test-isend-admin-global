import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import BulkEmailAddressForm from "./BulkEmailAddressForm";

export default function AddBulkEmailAddressModal() {
    const dispatch = useDispatch();

    const { is_modal_open: isOpen, loading } = useSelector((state) => state.add_bulk_email_address);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_ADD_BULK_EMAIL_ADDRESS_MODAL" });
    }, []);

    const handleSubmit = (data) => {
        dispatch({ type: "ADD_BULK_EMAIL_ADDRESS", data });
    };

    if (!isOpen) <></>;

    return (
        <Modal open={isOpen} onClose={handleClose} title="Add Email Address">
            <BulkEmailAddressForm
                onSubmit={handleSubmit}
                isAddMode={true}
                onCancel={handleClose}
                isProcessing={loading}
            />
        </Modal>
    );
}
