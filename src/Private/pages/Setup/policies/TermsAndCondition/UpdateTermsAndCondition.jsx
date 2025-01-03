import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import DocumentFileForm from "../components/DocumentFileForm";

import { DocumentFileActions } from "../store";
import documentFileType from "../data/documentFilteType";

const UpdateTermsAndCondition = () => {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading: l_loading,
        success: l_success,
    } = useSelector((state) => state.update_document_file);

    const { response: tcResponse } = useSelector((state) => state.get_document_file_list);

    const TCDocumentTitle = tcResponse?.data?.title;

    useEffect(() => {
        dispatch(
            DocumentFileActions.get_document_file({
                type: documentFileType.TermsAndConditions,
            }),
        );
    }, [dispatch]);

    const handleUpdate = (data) => {
        dispatch(DocumentFileActions.update_document_file(data));
    };

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_UPDATE_DOCUMENT_FILE_MODAL" });
    }, []);

    useEffect(() => {
        if (l_success) {
            dispatch({ type: "CLOSE_UPDATE_DOCUMENT_FILE_MODAL" });
            dispatch({ type: "UPDATE_DOCUMENT_FILE_RESET" });
        }
    }, [l_success]);

    return (
        <Modal title="Update Title" open={isOpen} onClose={handleClose}>
            <DocumentFileForm
                defaultType={documentFileType.TermsAndConditions}
                isAddMode={false}
                loading={l_loading}
                onSubmit={handleUpdate}
                initialValues={{
                    title: TCDocumentTitle ?? "",
                }}
                handleClose={handleClose}
            />
        </Modal>
    );
};

export default UpdateTermsAndCondition;
