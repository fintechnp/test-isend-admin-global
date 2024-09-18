import Grid from "@mui/material/Grid";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import EmailTemplateForm from "./EmailTemplateForm";
import ListEmailTemplateTags from "./Filter/ListEmailTemplateTags";

import emailTemplateActions from "Private/components/email-template/store/emailTemplateActions";

export default function AddEmailTemplateModal() {
    const [selectedTag, setSelectedTag] = useState("");
    const dispatch = useDispatch();

    const { is_modal_open: isOpen, loading } = useSelector((state) => state.add_email_template);

    const handleSubmit = (data) => {
        dispatch(emailTemplateActions.add_email_template(data));
        setSelectedTag("");
    };

    const handleClose = useCallback(() => {
        dispatch({
            type: "CLOSE_ADD_EMAIL_TEMPLATE_MODAL",
        });
        setSelectedTag("");
    }, []);

    if (!isOpen) <></>;

    return (
        <Modal open={isOpen} onClose={handleClose} title="Add Email Template">
            <Grid container columnSpacing={2}>
                <Grid item xs={8}>
                    <EmailTemplateForm
                        isAddMode={true}
                        onSubmit={handleSubmit}
                        handleClose={handleClose}
                        loading={loading}
                        insertTag={selectedTag}
                    />
                </Grid>
                <Grid item xs={4}>
                    <ListEmailTemplateTags onTagClick={(tag) => setSelectedTag(tag)} />
                </Grid>
            </Grid>
        </Modal>
    );
}
