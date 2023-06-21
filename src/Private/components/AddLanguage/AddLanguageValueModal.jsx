import { useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import Modal from "App/components/Modal/Modal";
import AddLanguageValue from "./AddLanguageValue";
import { AddButton, UpdateButton } from "../AllButtons/Buttons";
import actions from "../../pages/Setup/AddLanguage/store/actions";

const LanguageValueModal = ({ update, update_data }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const initialValue = useMemo(() => {
        return {
            translation_type: "API",
            localization_key: update_data?.localization_key,
            localization_value: update_data?.localization_value,
        };
    }, [update_data]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = (data) => {
        dispatch(actions.update_language_value(update_data?.localization_id, data));
        setOpen(false);
    };

    const handleAdd = (data) => {
        dispatch(actions.add_language_value(data));
        setOpen(false);
    };
    return (
        <div>
            {update ? (
                <Tooltip title="Edit Localization Value" arrow>
                    <UpdateButton onClick={handleClickOpen}>
                        <EditOutlinedIcon
                            sx={{
                                fontSize: "20px",
                                "&:hover": {
                                    background: "transparent",
                                },
                            }}
                        />
                    </UpdateButton>
                </Tooltip>
            ) : (
                <AddButton size="small" variant="outlined" onClick={handleClickOpen} endIcon={<AddIcon />}>
                    Add Localization Value
                </AddButton>
            )}

            {update ? (
                <Modal title="Update Localization Value" open={open} onClose={handleClose}>
                    <AddLanguageValue update={true} initial={initialValue} onSubmit={handleUpdate} />
                </Modal>
            ) : (
                <Modal title="Add Localization Value" open={open} onClose={handleClose}>
                    <AddLanguageValue update={false} initial={initialValue} onSubmit={handleAdd} />
                </Modal>
            )}
        </div>
    );
};
export default LanguageValueModal;
