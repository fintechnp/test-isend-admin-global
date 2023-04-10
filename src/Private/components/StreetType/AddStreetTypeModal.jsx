import { useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import AddStreetType from "./AddStreetType";
import Modal from "App/components/Modal/Modal";
import { AddButton, UpdateButton } from "../AllButtons/Buttons";
import actions from "../../pages/Setup/StreetType/store/action";

const StreetTypeModal = ({ update, update_data }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const initialValue = useMemo(() => {
        return {
            country: update_data?.country,
            street_name: update_data?.street_name,
            street_code: update_data?.street_code,
        };
    }, [update_data]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = (data) => {
        dispatch(actions.update_street_type(update_data?.street_type_id, data));
        setOpen(false);
    };

    const handleAdd = (data) => {
        dispatch(actions.add_street_type(data));
        setOpen(false);
    };
    return (
        <div>
            {update ? (
                <Tooltip title="Edit Street Type" arrow>
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
                    Add Street Type
                </AddButton>
            )}

            {update ? (
                <Modal title="Update Street Type" open={open} onClose={handleClose}>
                    <AddStreetType update={true} initial={initialValue} onSubmit={handleUpdate} />
                </Modal>
            ) : (
                <Modal title="Add Street Type" open={open} onClose={handleClose}>
                    <AddStreetType update={false} onSubmit={handleAdd} />
                </Modal>
            )}
        </div>
    );
};
export default StreetTypeModal;
