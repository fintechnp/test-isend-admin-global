import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import EmailConfigForm from "./EmailConfigForm";
import { AddButton } from "Private/components/AllButtons/Buttons";

import actions from "../../store/actions";

const AddEmailConfig = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const { success } = useSelector((state) => state.add_email_config);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (data) => {
        dispatch(actions.add_email_config(data));
    };

    useEffect(() => {
        if (success) {
            handleClose();
            dispatch({ type: "ADD_EMAIL_CONFIG_RESET" });
        }
    }, [success]);

    return (
        <>
            <AddButton
                size="medium"
                variant="outlined"
                onClick={handleClickOpen}
                endIcon={<AddIcon />}
                sx={{ mt: 0, borderRadius: "4px" }}
            >
                Add Email Config
            </AddButton>
            <Modal open={open} onClose={handleClose} title="Add Email Configurations">
                <EmailConfigForm onSubmit={handleSubmit} onClose={handleClose} />
            </Modal>
        </>
    );
};

export default AddEmailConfig;
