import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import BulkEmailGroupForm from "./BulkEmailGroupForm";

export default function EditBulkEmailGroupModal() {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading,
        bulk_email_group_id: bulkEmailGroupId,
        initial_form_state: initialFormState,
    } = useSelector((state) => state.update_bulk_email_group);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_UPDATE_BULK_EMAIL_GROUP_MODAL" });
    }, []);

    const handleSubmit = (data) => {
        dispatch({ type: "UPDATE_BULK_EMAIL_GROUP", bulk_email_group_id: bulkEmailGroupId, data });
    };

    if (!isOpen) <></>;

    return (
        <Modal open={isOpen} onClose={handleClose} title="Edit Bulk Email Group">
            <BulkEmailGroupForm
                onSubmit={handleSubmit}
                isAddMode={false}
                onCancel={handleClose}
                isProcessing={loading}
                initialState={initialFormState}
            />
        </Modal>
    );
}
