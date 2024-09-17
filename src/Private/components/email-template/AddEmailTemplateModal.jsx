import Grid from "@mui/material/Grid";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import EmailTemplateForm from "./EmailTemplateForm";
import ListEmailTemplateTags from "./Filter/ListEmailTemplateTags";

import ViewEmailTemplateModal from "./ViewEmailTemplateModal";
import emailTemplateActions from "Private/components/email-template/store/emailTemplateActions";

export default function AddEmailTemplateModal() {
    const [selectedTag, setSelectedTag] = useState("");
    const [tagClicked, setTagClicked] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const [previewModal, setPreviewModal] = useState(false);

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

    return (
        <Modal open={isOpen} onClose={handleClose} title="Add Email Template" sx={{ minWidth: "1200px" }}>
            <Grid container columnSpacing={2}>
                <Grid item xs={8}>
                    <EmailTemplateForm
                        isAddMode={true}
                        onSubmit={handleSubmit}
                        handleClose={handleClose}
                        loading={loading}
                        insertTag={selectedTag}
                        setPreviewData={(data) => setPreviewData(data)}
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
                    data={previewData}
                    handleClose={() => setPreviewModal(false)}
                />
            </Grid>
        </Modal>
    );
}
