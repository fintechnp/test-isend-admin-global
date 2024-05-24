import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import documentAcceptanceActions from "Private/features/documentAcceptance/documentAcceptanceActions";
import DocumentAcceptanceForm from "./DocumentAcceptanceForm";

export default function AddDocumentAcceptanceModal() {
    const dispatch = useDispatch();

    const { is_modal_open: isOpen, loading } = useSelector((state) => state.add_document_acceptance);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_ADD_DOCUMENT_ACCEPTANCE_MODAL" });
    }, []);

    const handleSubmit = (data) => {
        dispatch(documentAcceptanceActions?.add_document_acceptance(data));
    };

    if (!isOpen) <></>;

    return (
        <Modal open={isOpen} onClose={handleClose} title="Add Document Acceptance Form">
            <DocumentAcceptanceForm
                onSubmit={handleSubmit}
                handleClose={handleClose}
                loading={loading}
                isAddMode={true}
            />
        </Modal>
    );
}
