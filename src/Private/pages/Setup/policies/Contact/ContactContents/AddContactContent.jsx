import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import DocumentFileContentForm from "../../components/DocumentFileContentForm";

import { DocumentFileActions } from "../../store";
import documentFileType from "../../data/documentFilteType";

const AddContactContent = () => {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading: l_loading,
        success: l_success,
    } = useSelector((state) => state.add_document_file_content);

    const { response: contactDocumentList } = useSelector((state) => state.get_document_file_list);

    const ListOrderID = contactDocumentList?.pagination?.totalCount;

    const handleSubmitContactList = (data) => {
        dispatch(DocumentFileActions.create_document_file_content(data));
    };

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_ADD_CREATE_DOCUMENT_FILE_CONTENT_BY_TYPE" });
    }, []);

    useEffect(() => {
        if (l_success) {
            dispatch({ type: "CLOSE_ADD_CREATE_DOCUMENT_FILE_CONTENT_BY_TYPE" });
            dispatch({ type: "UPDATE_DOCUMENT_FILE_CONTENT_BY_TYPE_RESET" });
        }
    }, [l_success]);

    return (
        <Modal
            sx={{
                height: "40rem",
            }}
            title="Add Contact Content"
            open={isOpen}
            onClose={handleClose}
        >
            <DocumentFileContentForm
                defaultType={documentFileType.Contact}
                orderID={ListOrderID}
                isAddMode={true}
                loading={l_loading}
                onSubmit={handleSubmitContactList}
                handleClose={handleClose}
            />
        </Modal>
    );
};

export default AddContactContent;
