import Grid from "@mui/material/Grid";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import EmailTemplateForm from "./EmailTemplateForm";
import ListEmailTemplateTags from "./Filter/ListEmailTemplateTags";
import emailTemplateActions from "Private/components/email-template/store/emailTemplateActions";

export default function EditEmailTemplateModal() {
    const [selectedTag, setSelectedTag] = useState("");

    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading,
        initial_form_state: initialFormState,
    } = useSelector((state) => state.update_email_template);

    const handleSubmit = (data) => {
        dispatch(emailTemplateActions.update_email_template(initialFormState.id, data));
        setSelectedTag("");
    };

    const handleClose = useCallback(() => {
        dispatch({
            type: "CLOSE_UPDATE_EMAIL_TEMPLATE_MODAL",
        });
        setSelectedTag("");
    });

    if (!isOpen) <></>;

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
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
                            email_header: initialFormState?.email_header ?? "",
                            email_footer: initialFormState?.email_footer ?? "",
                        }}
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
