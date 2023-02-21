import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import BulkEmailContentForm from "./BulkEmailContentForm";

export default function EditBulkEmailContentModal() {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading,
        bulk_email_content_id: bulkEmailContentId,
        initial_form_state: initialFormState,
    } = useSelector((state) => state.update_bulk_email_content);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_UPDATE_BULK_EMAIL_CONTENT_MODAL" });
    }, []);

    const handleSubmit = (data) => {
        dispatch({ type: "UPDATE_BULK_EMAIL_CONTENT", bulk_email_content_id: bulkEmailContentId, data });
    };

    if (!isOpen) <></>;

    return (
        <Modal open={isOpen} onClose={handleClose} title="Edit Bulk Email Content">
            <BulkEmailContentForm
                onSubmit={handleSubmit}
                isAddMode={false}
                onCancel={handleClose}
                isProcessing={loading}
                initialState={initialFormState}
            />
        </Modal>
    );
}
