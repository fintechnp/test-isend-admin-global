import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";

import { helpCenterActions } from "../store";
import HelpCenterForm from "./HelpCenterForm";

export default function AddHelpCenterModal({ onAddSuccess }) {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading: isLoading,
        success: isSuccess,
    } = useSelector((state) => state.create_help_center);

    const handleSubmit = (data) => {
        dispatch(helpCenterActions.create_help_center(data));
    };

    const handleClose = useCallback(() => {
        dispatch(helpCenterActions.close_add_modal());
    });

    useEffect(() => {
        if (isSuccess) {
            onAddSuccess?.();
            dispatch(helpCenterActions.create_help_center_reset());
        }
    }, [isSuccess]);

    if (!isOpen) <></>;

    return (
        <Modal title="Add Help Center" onClose={handleClose} open={isOpen}>
            <HelpCenterForm isAddMode={true} onSubmit={handleSubmit} handleClose={handleClose} loading={isLoading} />
        </Modal>
    );
}

AddHelpCenterModal.propTypes = {
    onAddSuccess: PropTypes.func,
};
