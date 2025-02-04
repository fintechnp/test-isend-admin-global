import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import DocumentFileContentForm from "../../components/DocumentFileContentForm";

import { DocumentFileActions } from "../../store";
import documentFileType from "../../data/documentFilteType";

const UpdateFaqsContent = () => {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading: l_loading,
        success: l_success,
        initial_form_state: initialFormState,
    } = useSelector((state) => state.update_document_file_content);

    const handleUpdateFaqsList = (data) => {
        dispatch(
            DocumentFileActions.update_document_file_content(initialFormState?.contentId, {
                ...data,
                order: data.order_id,
            }),
        );
    };

    useEffect(() => {
        if (l_success) {
            dispatch({ type: "CLOSE_UPDATE_DOCUMENT_FILE_CONTENT_BY_TYPE_MODAL" });
            dispatch({ type: "UPDATE_DOCUMENT_FILE_CONTENT_BY_TYPE_RESET" });
        }
    }, [l_success]);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_UPDATE_DOCUMENT_FILE_CONTENT_BY_TYPE_MODAL" });
    }, []);

    return (
        <Modal
            sx={{
                height: "40rem",
            }}
            open={isOpen}
            onClose={handleClose}
        >
            <DocumentFileContentForm
                defaultType={documentFileType.Faq}
                isAddMode={false}
                loading={l_loading}
                onSubmit={handleUpdateFaqsList}
                handleClose={handleClose}
                initialValues={{
                    order_id: initialFormState?.contentOrder,
                    content_title: initialFormState?.content_title,
                    content: initialFormState?.contents,
                    is_active: initialFormState?.is_active,
                }}
            />
        </Modal>
    );
};

export default UpdateFaqsContent;
