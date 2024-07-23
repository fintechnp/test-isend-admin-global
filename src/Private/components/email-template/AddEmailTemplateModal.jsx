import { useCallback } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import EmailTemplateForm from "./EmailTemplateForm";
import ListEmailTemplateTags from "./Filter/ListEmailTemplateTags";

import emailTemplateActions from "Private/components/email-template/store/emailTemplateActions";

export default function AddEmailTemplateModal() {
    const dispatch = useDispatch();

    const { is_modal_open: isOpen, loading } = useSelector((state) => state.add_email_template);

    const handleSubmit = (data) => {
        console.log(data);
        dispatch(emailTemplateActions.add_email_template(data));
    };

    const handleClose = useCallback(() => {
        dispatch({
            type: "CLOSE_ADD_EMAIL_TEMPLATE_MODAL",
        });
    }, []);

    if (!isOpen) <></>;

    return (
        <Modal open={isOpen} onClose={handleClose} title="Add Email Template">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 4,
                    maxHeight: 500,
                    minHeight: 800,
                }}
            >
                <EmailTemplateForm
                    isAddMode={true}
                    onSubmit={handleSubmit}
                    handleClose={handleClose}
                    loading={loading}
                />
                <ListEmailTemplateTags />
            </Box>
        </Modal>
    );
}
