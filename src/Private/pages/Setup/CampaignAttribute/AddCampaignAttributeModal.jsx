import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import AttributeFamilyForm from "./components/AttributeFamilyForm";

import attributeFamilyActions from "Private/features/attributeFamily/attributeFamilyActions";

function AddCampaignAttributeModal() {
    const dispatch = useDispatch();

    const { is_modal_open: isOpen, success: isSuccess, loading } = useSelector((state) => state.add_attribute_family);

    const handleSubmit = (data) => {
        dispatch(attributeFamilyActions.add_attribute_family(data));
    };

    const handleClose = useCallback(() => {
        dispatch(attributeFamilyActions.close_add_modal());
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(attributeFamilyActions.add_attribute_family_reset());
        }
    }, [isSuccess]);

    if (!isOpen) <></>;

    return (
        <Modal
            onClose={handleClose}
            open={isOpen}
            title={"Edit Attribute Family "}
            sx={{
                maxWidth: "450px",
            }}
        >
            <AttributeFamilyForm onSubmit={handleSubmit} handleClose={handleClose} loading={loading} isAddMode={true} />
        </Modal>
    );
}

export default AddCampaignAttributeModal;
