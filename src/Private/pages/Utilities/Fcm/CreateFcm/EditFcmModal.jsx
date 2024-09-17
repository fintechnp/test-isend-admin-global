import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";

import CreateForm from "./CreateForm";
import actions from "../../store/actions";

export default function EditFcmModal() {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading,
        initial_form_state: initialFormState,
    } = useSelector((state) => state.update_fcm);

    const handleClose = useCallback(() => {
        dispatch(actions.close_update_fcm_modal());
    }, []);

    const handleSubmit = (data) => {
        dispatch(actions.update_fcm(initialFormState.fcm_id, data));
    };

    if (!isOpen) return <></>;

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <CreateForm
                initialValues={{
                    body: initialFormState?.body,
                    detail_content: initialFormState?.detail_content,
                    display_notification: initialFormState?.display_notification,
                    image_url: initialFormState?.image_url,
                    redirect_url: initialFormState?.redirect_url,
                    title: initialFormState?.title,
                    type: initialFormState?.type,
                    ...(initialFormState?.customer_id && { customer_id: initialFormState?.customer_id }),
                    ...(initialFormState?.topic && { topic: initialFormState?.topic }),
                }}
                isAddMode={false}
                handleSubmit={handleSubmit}
                handleClose={handleClose}
                loading={loading}
            />
        </Modal>
    );
}
