import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import CustomerAccountForm from "./CustomerAccountForm";
import customerActions from "Private/features/customers/customerActions";

export default function UpdateCustomerAccountModal() {
    const dispatch = useDispatch();

    const { id } = useParams();

    const {
        is_modal_open: isOpen,
        loading,
        success,
        customer_id,
    } = useSelector((state) => state.update_customer_account);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_UPDATE_CUSTOMER_ACCOUNT_MODAL" });
    }, []);

    const handleSubmit = (data) => {
        dispatch({
            type: "UPDATE_CUSTOMER_ACCOUNT",
            customer_id: customer_id,
            data,
        });
    };

    useEffect(() => {
        if (success) {
            dispatch({ type: "UPDATE_CUSTOMER_ACCOUNT_RESET" });
            dispatch({ type: "GET_CUSTOMER_BYID", id: customer_id });
        }
    }, [dispatch, success]);

    if (!isOpen) <></>;

    return (
        <Modal open={isOpen} onClose={handleClose} title="Update Customer Account">
            <CustomerAccountForm onSubmit={handleSubmit} onCancel={handleClose} isProcessing={loading} />
        </Modal>
    );
}
