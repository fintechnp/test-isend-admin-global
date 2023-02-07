import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import FundingSourceForm from "./FundingSourceForm";
import fundingSourceActions from "Private/features/funding-sources/fundingSourceActions";

export default function AddFundingSourceModal() {
    const dispatch = useDispatch();

    const { is_modal_open: isOpen, loading } = useSelector((state) => state.add_funding_source);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_ADD_FUNDING_SOURCE_MODAL" });
    }, []);

    const handleSubmit = (data) => {
        dispatch(fundingSourceActions.add_funding_source(data));
    };

    if (!isOpen) <></>;

    return (
        <Modal open={isOpen} onClose={handleClose} title="Add Funding Source">
            <FundingSourceForm
                isAddMode={true}
                onSubmit={handleSubmit}
                onCancel={handleClose}
                form="add_funding_source_form"
                isProcessing={loading}
            />
        </Modal>
    );
}
