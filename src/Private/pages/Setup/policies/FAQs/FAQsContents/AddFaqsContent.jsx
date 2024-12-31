import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import DocumentFileContentForm from "../../components/DocumentFileContentForm";

import { DocumentFileActions } from "../../store";
import documentFileType from "../../data/documentFilteType";

const AddFaqsContent = () => {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading: l_loading,
        success: l_success,
    } = useSelector((state) => state.add_document_file_content);

    const { response: faqDocumentList } = useSelector((state) => state.get_document_file_list);

    const ListOrderID = faqDocumentList?.pagination?.totalCount;

    const handleSubmitFaqsList = (data) => {
        dispatch(DocumentFileActions.create_document_file_content(data));
    };

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_ADD_CREATE_DOCUMENT_FILE_CONTENT_BY_TYPE" });
    }, []);

    useEffect(() => {
        if (l_success) {
            dispatch({ type: "CLOSE_ADD_CREATE_DOCUMENT_FILE_CONTENT_BY_TYPE" });
            dispatch({ type: "CREATE_DOCUMENT_FILE_CONTENT_BY_TYPE_RESET" });
        }
    }, [l_success]);

    return (
        <Modal
            sx={{
                height: "40rem",
            }}
            title="Add FAQ Content"
            open={isOpen}
            onClose={handleClose}
        >
            <DocumentFileContentForm
                defaultType={documentFileType.Faq}
                orderID={ListOrderID}
                isAddMode={true}
                loading={l_loading}
                onSubmit={handleSubmitFaqsList}
                handleClose={handleClose}
            />
        </Modal>
    );
};

export default AddFaqsContent;
