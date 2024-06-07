import { useCallback } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import EmailTemplateForm from "./EmailTemplateForm";
import ListEmailTemplateTags from "./Filter/ListEmailTemplateTags";
import emailTemplateActions from "Private/components/email-template/store/emailTemplateActions";

export default function EditEmailTemplateModal() {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading,
        initial_form_state: initialFormState,
    } = useSelector((state) => state.update_email_template);

    const handleSubmit = (data) => {
        dispatch(emailTemplateActions.update_email_template(initialFormState.id, data));
    };

    const handleClose = useCallback(() => {
        dispatch({
            type: "CLOSE_UPDATE_EMAIL_TEMPLATE_MODAL",
        });
    });

    if (!isOpen) <></>;

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 4,
                    maxHeight: 500,
                }}
            >
                <EmailTemplateForm
                    isAddMode={false}
                    onSubmit={handleSubmit}
                    handleClose={handleClose}
                    loading={loading}
                    initialValues={{
                        email_subject: initialFormState?.email_subject ?? "",
                        email_format: initialFormState?.email_format ?? "",
                        template_type: initialFormState?.template_type ?? "",
                        template_for: initialFormState?.template_for ?? "",
                    }}
                />

                <ListEmailTemplateTags />
            </Box>
        </Modal>
    );
}
