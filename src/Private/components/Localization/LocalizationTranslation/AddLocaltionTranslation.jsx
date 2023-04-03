import { useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import Modal from "App/components/Modal/Modal";
import { AddButton, UpdateButton } from "../../AllButtons/Buttons";
import AddTranslationForm from "./AddTranslationLocalizationForm";
import actions from "../../../pages/Setup/LocalizationDetails/store/actions";

const AddTranslationData = ({ update = false, id, updatedData }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const initialValue = useMemo(() => {
        return {
            translated_text: updatedData?.translated_text,
            language_id: updatedData?.language_id,
        };
    }, [updatedData]);

    const handleSubmitTranslation = (data) => {
        dispatch(actions.add_translation_value(data));
        setOpen(false);
    };

    const handleUpdateTranslation = (data) => {
        dispatch(actions.update_translation_value(updatedData?.translated_id, data));
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            {update ? (
                <Tooltip title="Edit Language Value" arrow>
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
                    Add Translated Value
                </AddButton>
            )}

            {update ? (
                <Modal title="Update Translation Value" open={open} onClose={handleClose}>
                    <AddTranslationForm
                        update={true}
                        id={id}
                        initial={initialValue}
                        onSubmit={handleUpdateTranslation}
                    />
                </Modal>
            ) : (
                <Modal title="Add Translation Value" open={open} onClose={handleClose}>
                    <AddTranslationForm id={id} onSubmit={handleSubmitTranslation} />
                </Modal>
            )}
        </div>
    );
};
export default AddTranslationData;
