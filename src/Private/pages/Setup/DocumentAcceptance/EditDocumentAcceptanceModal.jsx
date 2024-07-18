import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import documentAcceptanceActions from "Private/features/documentAcceptance/documentAcceptanceActions";
import DocumentAcceptanceForm from "./components/DocumentAcceptanceForm";

export default function EditDocumentAcceptanceModal({ onEditSuccess }) {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading,
        initial_form_data,
        success: isSuccess,
    } = useSelector((state) => state.update_document_acceptance);

    const handleClose = useCallback(() => {
        dispatch(documentAcceptanceActions.close_update_modal());
    }, [dispatch]);

    const handleSubmit = (data) => {
        dispatch(documentAcceptanceActions.update_document_acceptance(initial_form_data.id, data));
    };

    useEffect(() => {
        if (isSuccess) {
            onEditSuccess?.();
            dispatch(documentAcceptanceActions.update_document_acceptance_reset());
        }
    }, [isSuccess]);

    if (!isOpen) <></>;

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            title="Edit Document"
            sx={{
                maxWidth: "400px",
            }}
        >
            <DocumentAcceptanceForm
                onSubmit={handleSubmit}
                handleClose={handleClose}
                loading={loading}
                isAddMode={false}
                initialValues={{
                    country: initial_form_data?.country,
                    document_type: initial_form_data?.document_type ?? "",
                    status: initial_form_data?.status ?? "",
                    document_for: initial_form_data?.document_for,
                    is_required: initial_form_data?.is_required ?? false,
                }}
            />
        </Modal>
    );
}

EditDocumentAcceptanceModal.propTypes = {
    onEditSuccess: PropTypes.func,
};
