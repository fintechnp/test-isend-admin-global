import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import documentAcceptanceActions from "Private/features/documentAcceptance/documentAcceptanceActions";
import DocumentAcceptanceForm from "./DocumentAcceptanceForm";

export default function EditDocumentAcceptanceModal() {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading,
        initial_form_data,
    } = useSelector((state) => state.update_document_acceptance);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_UPDATE_DOCUMENT_ACCEPTANCE_MODAL" });
    }, [dispatch]);

    if (!isOpen) <></>;

    const handleSubmit = (data) => {
        const id = initial_form_data?.document_list?.[0]?.id;

        dispatch(documentAcceptanceActions.update_document_acceptance(id, data));
    };

    return (
        <Modal open={isOpen} onClose={handleClose} title="Edit Document Acceptance">
            <DocumentAcceptanceForm
                onSubmit={handleSubmit}
                handleClose={handleClose}
                loading={loading}
                isAddMode={true}
                initialValues={{
                    country: initial_form_data?.country ?? "",
                    document_type: initial_form_data?.document_list?.document_type ?? "",
                    status: initial_form_data?.status ?? "",
                }}
            />
        </Modal>
    );
}
