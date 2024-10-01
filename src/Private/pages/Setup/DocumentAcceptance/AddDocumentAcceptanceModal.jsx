import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import DocumentAcceptanceForm from "./components/DocumentAcceptanceForm";
import documentAcceptanceActions from "Private/features/documentAcceptance/documentAcceptanceActions";

export default function AddDocumentAcceptanceModal({ selectedCountryISO3, documentFor, onAddSuccess }) {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading,
        success: isSuccess,
    } = useSelector((state) => state.add_document_acceptance);

    const handleClose = useCallback(() => {
        dispatch(documentAcceptanceActions.close_add_modal());
    }, []);

    const handleSubmit = (data) => {
        dispatch(documentAcceptanceActions.add_document_acceptance(data));
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(documentAcceptanceActions.add_document_acceptance_reset());
            onAddSuccess?.();
        }
    }, [isSuccess]);

    if (!isOpen) <></>;

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            title="Add Document for KYC/KYB"
            sx={{
                maxWidth: "400px",
            }}
        >
            <DocumentAcceptanceForm
                onSubmit={handleSubmit}
                handleClose={handleClose}
                loading={loading}
                isAddMode={true}
                selectedCountryISO3={selectedCountryISO3}
                documentFor={documentFor}
            />
        </Modal>
    );
}

AddDocumentAcceptanceModal.propTypes = {
    selectedCountryISO3: PropTypes.string,
    onAddSuccess: PropTypes.func,
    documentFor: PropTypes.string,
};
