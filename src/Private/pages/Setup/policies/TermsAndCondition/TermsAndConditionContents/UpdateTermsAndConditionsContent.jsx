import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import DocumentFileContentForm from "../../components/DocumentFileContentForm";

import { DocumentFileActions } from "../../store";
import documentFileType from "../../data/documentFilteType";

const UpdateTermsAndConditionsContent = () => {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading: l_loading,
        success: l_success,
        initial_form_state: initialFormState,
    } = useSelector((state) => state.update_document_file_content);

    const handleUpdateList = (data) => {
        dispatch(DocumentFileActions.update_document_file_content(initialFormState?.contentId, data));
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
                defaultType={documentFileType.TermsAndConditions}
                isAddMode={false}
                loading={l_loading}
                onSubmit={handleUpdateList}
                handleClose={handleClose}
                initialValues={{
                    order_id: initialFormState?.contentOrder,
                    content_title: initialFormState?.content_title,
                    content: initialFormState?.contents,
                }}
            />
        </Modal>
    );
};

export default UpdateTermsAndConditionsContent;
