import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import BulkEmailContentForm from "./BulkEmailContentForm";

export default function AddBulkEmailContentModal() {
    const dispatch = useDispatch();

    const { is_modal_open: isOpen, loading } = useSelector((state) => state.add_bulk_email_content);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_ADD_BULK_EMAIL_CONTENT_MODAL" });
    }, []);

    const handleSubmit = (data) => {
        dispatch({ type: "ADD_BULK_EMAIL_CONTENT", data });
    };

    if (!isOpen) <></>;

    return (
        <Modal open={isOpen} onClose={handleClose} title="Add Email Content">
            <BulkEmailContentForm
                onSubmit={handleSubmit}
                isAddMode={true}
                onCancel={handleClose}
                isProcessing={loading}
            />
        </Modal>
    );
}
