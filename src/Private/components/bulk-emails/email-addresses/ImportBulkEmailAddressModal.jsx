import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import ImportBulkEmailAddressForm from "./ImportBulkEmailAddressForm";

export default function ImportBulkEmailAddressModal() {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading: isValidating,
        success: isValidateImportSuccess,
    } = useSelector((state) => state.import_bulk_email_address);

    const { loading: isConfirmImporting } = useSelector((state) => state.import_confirm_bulk_email_address);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_IMPORT_BULK_EMAIL_ADDRESS_MODAL" });
    }, []);

    const handleSubmit = (data) => {
        dispatch({
            type: "IMPORT_BULK_EMAIL_ADDRESS",
            group_id: data.group_id,
            data,
        });
    };

    const handleConfirm = (data) => {
        dispatch({
            type: "IMPORT_CONFIRM_BULK_EMAIL_ADDRESS",
            group_id: data.group_id,
            data,
        });
    };

    if (!isOpen) <></>;

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            title="Import Email Address"
            sx={{
                maxWidth: "700px",
            }}
        >
            <ImportBulkEmailAddressForm
                isValidateImportSuccess={isValidateImportSuccess}
                onSubmit={(data) => (isValidateImportSuccess ? handleConfirm(data) : handleSubmit(data))}
                onCancel={handleClose}
                isProcessing={isValidating || isConfirmImporting}
            />
        </Modal>
    );
}
