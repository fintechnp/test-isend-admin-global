import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import EmailConfigForm from "./EmailConfigForm";

import actions from "../../store/actions";
import { ListItemButton } from "@mui/material";

const EditEmailConfig = ({ data, onClose }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const { success, loading } = useSelector((state) => state.edit_email_config);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        onClose?.();
    };

    const handleSubmit = (data) => {
        dispatch(
            actions.edit_email_config(data.config_id, {
                config_for: data.config_for,
                emails: data.emails,
            }),
        );
    };

    useEffect(() => {
        if (success) {
            handleClose();
            dispatch({ type: "EDIT_EMAIL_CONFIG_RESET" });
        }
    }, [success]);

    return (
        <>
            <ListItemButton onClick={handleClickOpen}> Edit </ListItemButton>
            <Modal open={open} onClose={handleClose} title="Edit Email Configurations">
                <EmailConfigForm
                    onSubmit={handleSubmit}
                    onClose={handleClose}
                    initialValues={{ ...data, emails: JSON.parse(data.emails_json) }}
                    loading={loading}
                />
            </Modal>
        </>
    );
};

export default EditEmailConfig;
