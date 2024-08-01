import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import AttributeFamilyForm from "./components/AttributeFamilyForm";

import attributeFamilyActions from "Private/features/attributeFamily/attributeFamilyActions";

function EditCampaignAttributeModal() {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        success: isSuccess,
        initial_form_data,
        loading,
    } = useSelector((state) => state.update_attribute_family);

    const handleSubmit = (data) => {
        dispatch(attributeFamilyActions.update_attribute_family(data));
    };

    const handleClose = useCallback(() => {
        dispatch(attributeFamilyActions.close_update_modal());
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(attributeFamilyActions.update_attribute_family_reset());
        }
    }, [isSuccess]);

    if (!isOpen) <></>;

    return (
        <Modal
            onClose={handleClose}
            open={isOpen}
            title={"Add Attribute Family "}
            sx={{
                maxWidth: "450px",
            }}
        >
            <AttributeFamilyForm
                onSubmit={handleSubmit}
                handleClose={handleClose}
                loading={loading}
                isAddMode={false}
                initialValues={{
                    attributeFamilyId: initial_form_data?.attributeFamilyId,
                    attributeName: initial_form_data?.attributeName,
                    attributeTypeValue: initial_form_data?.attributeTypeValue,
                    attributeTypeValueName: initial_form_data?.attributeTypeValueName,
                }}
            />
        </Modal>
    );
}

export default EditCampaignAttributeModal;
