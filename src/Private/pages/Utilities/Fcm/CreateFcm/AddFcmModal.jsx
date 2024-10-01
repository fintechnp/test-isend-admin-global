import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import actions from "../../store/actions";

import CreateForm from "./CreateForm";

// AddBannerModal.jsx
export default function AddFcmModal() {
    const dispatch = useDispatch();

    const { is_modal_open: isOpen, loading } = useSelector((state) => state.create_fcm);

    const handleClose = useCallback(() => {
        dispatch(actions.close_add_fcm_modal());
    }, []);

    const handleSubmit = (data) => {
        dispatch(actions.create_fcm(data));
    };

    if (!isOpen) <></>;

    return (
        <Modal title="Add FCM" open={isOpen} onClose={handleClose}>
            <CreateForm isAddMode={true} handleClose={handleClose} handleSubmit={handleSubmit} loading={loading} />
        </Modal>
    );
}
