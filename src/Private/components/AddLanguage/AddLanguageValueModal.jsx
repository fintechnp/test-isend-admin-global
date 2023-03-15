import { useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import actions from "../../pages/Setup/AddLanguage/store/actions";
import Modal from "App/components/Modal/Modal";
import AddLanguageValue from "./AddLanguageValue";

const UpdateButton = styled(IconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: "border.main",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const AddButton = styled(Button)(({ theme }) => ({
    padding: "6px 12px",
    textTransform: "capitalize",
    color: theme.palette.secondary.contrastText,
    borderColor: theme.palette.border.main,
}));

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

    // const initialValue = {
    //     localization_type: "API",
    // };

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
                    Add Language Value
                </AddButton>
            )}

            {update ? (
                <Modal title="Update Language Value" open={open} onClose={handleClose}>
                    <AddLanguageValue update={true} initial={initialValue} onSubmit={handleUpdate} />
                </Modal>
            ) : (
                <Modal title="Add Language Value" open={open} onClose={handleClose}>
                    <AddLanguageValue update={false} initial={initialValue} onSubmit={handleAdd} />
                </Modal>
            )}
        </div>
    );
};
export default LanguageValueModal;
