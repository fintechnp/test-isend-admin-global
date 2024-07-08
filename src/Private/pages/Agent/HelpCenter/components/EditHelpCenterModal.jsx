import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";

import { helpCenterActions } from "../store";
import HelpCenterForm from "./HelpCenterForm";

export default function EditHelpCenterModal({ onUpdateSuccess }) {
    const dispatch = useDispatch();

    const {
        initial_form_state: initialFormState,
        is_modal_open: isOpen,
        loading,
        success: isSuccess,
    } = useSelector((state) => state.update_help_center);

    const handleSubmit = (data) => {
        dispatch(helpCenterActions.update_help_center(initialFormState.contactDetailId, data));
    };

    useEffect(() => {
        if (isSuccess) {
            onUpdateSuccess?.();
            dispatch(helpCenterActions.update_help_center_reset());
        }
    }, [isSuccess]);

    const handleClose = useCallback(() => {
        dispatch(helpCenterActions.close_edit_modal());
    });

    return (
        <Modal title="Edit Help Center" onClose={handleClose} open={isOpen}>
            <HelpCenterForm
                initialValues={{
                    email: initialFormState?.email,
                    phone_number: initialFormState?.phoneNumber,
                    contactDetailId: initialFormState?.contactDetailId,
                }}
                isAddMode={false}
                onSubmit={handleSubmit}
                handleClose={handleClose}
                loading={loading}
            />
        </Modal>
    );
}

EditHelpCenterModal.propTypes = {
    onUpdateSuccess: PropTypes.func,
};
