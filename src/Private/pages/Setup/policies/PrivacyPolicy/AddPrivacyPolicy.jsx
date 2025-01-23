import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import DocumentFileForm from "../components/DocumentFileForm";

import { DocumentFileActions } from "../store";
import documentFileType from "../data/documentFilteType";

const AddPrivacyPolicy = () => {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading: l_loading,
        success: l_success,
    } = useSelector((state) => state.add_document_file);

    const handleSubmit = (data) => {
        dispatch(DocumentFileActions.create_document_file(data));
    };

    useEffect(() => {
        if (l_success) {
            dispatch({ type: "CLOSE_ADD_CREATE_FILE_MODAL" });
            dispatch({ type: "CREATE_DOCUMENT_FILE_RESET" });
        }
    }, [l_success]);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_ADD_CREATE_FILE_MODAL" });
    }, []);

    return (
        <Modal title="Add Title" open={isOpen} onClose={handleClose}>
            <DocumentFileForm
                defaultType={documentFileType.PrivacyPolicy}
                isAddMode={true}
                loading={l_loading}
                onSubmit={handleSubmit}
                handleClose={handleClose}
            />
        </Modal>
    );
};

export default AddPrivacyPolicy;
