import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import BulkEmailGroupForm from "./BulkEmailGroupForm";

export default function AddBulkEmailGroupModal() {
    const dispatch = useDispatch();

    const { is_modal_open: isOpen, loading } = useSelector((state) => state.add_bulk_email_group);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_ADD_BULK_EMAIL_GROUP_MODAL" });
    }, []);

    const handleSubmit = (data) => {
        dispatch({ type: "ADD_BULK_EMAIL_GROUP", data });
    };

    if (!isOpen) <></>;

    return (
        <Modal open={isOpen} onClose={handleClose} title="Add Bulk Email Group">
            <BulkEmailGroupForm
                onSubmit={handleSubmit}
                isAddMode={true}
                onCancel={handleClose}
                isProcessing={loading}
            />
        </Modal>
    );
}
