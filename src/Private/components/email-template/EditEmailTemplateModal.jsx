import Grid from "@mui/material/Grid";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import EmailTemplateForm from "./EmailTemplateForm";
import ViewEmailTemplateModal from "./ViewEmailTemplateModal";
import ListEmailTemplateTags from "./Filter/ListEmailTemplateTags";
import emailTemplateActions from "Private/components/email-template/store/emailTemplateActions";

export default function EditEmailTemplateModal() {
    const [selectedTag, setSelectedTag] = useState("");
    const [tagClicked, setTagClicked] = useState(false);
    const [previewModal, setPreviewModal] = useState(false);
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

    return (
        <Modal open={isOpen} onClose={handleClose} sx={{ minWidth: "1200px" }} title="Edit Email Template">
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
                            header_element_id: initialFormState?.header_element_id ?? "",
                            footer_element_id: initialFormState?.footer_element_id ?? "",
                        }}
                        insertTag={selectedTag}
                        openPreviewModal={(data) => setPreviewModal(data)}
                        tagClicked={tagClicked}
                    />
                </Grid>
                <Grid item xs={4}>
                    <ListEmailTemplateTags
                        onTagClick={(tag) => {
                            setSelectedTag(tag);
                            setTagClicked(!tagClicked);
                        }}
                    />
                </Grid>
                <ViewEmailTemplateModal
                    isOpen={previewModal}
                    data={{
                        email_subject: initialFormState?.email_subject ?? "",
                        email_format: initialFormState?.email_format ?? "",
                        template_type: initialFormState?.template_type ?? "",
                        template_for: initialFormState?.template_for ?? "",
                        header_element_id: initialFormState?.header_element_id ?? "",
                        footer_element_id: initialFormState?.footer_element_id ?? "",
                    }}
                    handleClose={() => setPreviewModal(false)}
                />
            </Grid>
        </Modal>
    );
}
