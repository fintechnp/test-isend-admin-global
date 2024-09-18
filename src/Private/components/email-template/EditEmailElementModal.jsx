import Box from "@mui/material/Box";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import EmailElementForm from "./EmailElementForm";

import emailTemplateActions from "Private/components/email-template/store/emailTemplateActions";

export default function EditEmailElementModal() {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading,
        initial_form_state: initialFormState,
    } = useSelector((state) => state.update_email_element);

    const handleSubmit = (data) => {
        dispatch(emailTemplateActions.update_email_element(initialFormState.element_id, data));
    };

    const handleClose = useCallback(() => {
        dispatch({
            type: "CLOSE_UPDATE_EMAIL_ELEMENT_MODAL",
        });
    }, []);

    return (
        <Modal open={isOpen} onClose={handleClose} title="Edit Email Element">
            <Box>
                <EmailElementForm
                    isAddMode={false}
                    initialValues={{
                        element_for: initialFormState?.element_for,
                        element_type: initialFormState?.element_type,
                        element_content: initialFormState?.element_content,
                        element_label: initialFormState?.element_label,
                    }}
                    onSubmit={handleSubmit}
                    handleClose={handleClose}
                    loading={loading}
                />
            </Box>
        </Modal>
    );
}
