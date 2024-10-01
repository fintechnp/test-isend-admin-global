import Box from "@mui/material/Box";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import EmailElementForm from "./EmailElementForm";

import emailTemplateActions from "Private/components/email-template/store/emailTemplateActions";

export default function AddEmailElementModal() {
    const dispatch = useDispatch();

    const { is_modal_open: isOpen, loading } = useSelector((state) => state.add_email_element);

    const handleSubmit = (data) => {
        dispatch(emailTemplateActions.add_email_element(data));
    };

    const handleClose = useCallback(() => {
        dispatch({
            type: "CLOSE_ADD_EMAIL_ELEMENT_MODAL",
        });
    }, []);

    return (
        <Modal open={isOpen} onClose={handleClose} title="Add Email Element">
            <Box>
                <EmailElementForm
                    isAddMode={true}
                    onSubmit={handleSubmit}
                    handleClose={handleClose}
                    loading={loading}
                />
            </Box>
        </Modal>
    );
}
