import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CommentFrom from "./Form";
import Drawer from "@mui/material/Drawer";

import actions from "../store/actions";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-container": {
        backdropFilter: "blur(3px)",
    },
    "& .MuiDialog-paper": {
        maxWidth: "90%",
        backgroundColor: theme.palette.background.dark,
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const UpdateButton = styled(IconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: "border.main",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    padding: "4px",
    position: "absolute",
    right: "15px",
    top: "15px",
    color: theme.palette.grey[500],
    borderRadius: "3px",
}));

function AddComment({ referenceId, referenceType, data }) {
    const methods = useForm({
        defaultValues: {
            referenceId,
            referenceType,
        },
    });
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const { response, loading } = useSelector((state) => state.get_all_comments);
    console.log("🚀 ~ AddComment ~ comments:", response);

    React.useEffect(() => {
        dispatch(
            actions.get_all_comments({
                reference_type: "Transaction",
                reference_id: referenceId,
            }),
        );
    }, [dispatch]);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTypeSubmit = (data) => {
        dispatch(actions.add_comment(data));

        dispatch(
            actions.get_all_comments({
                reference_type: "Transaction",
                reference_id: referenceId,
            }),
        );

        // handleClose();
    };

    return (
        <div>
            <CommentFrom onSubmit={handleTypeSubmit} method={methods} handleClose={handleClose} />
            <CloseButton onClick={handleClose}>
                <CloseIcon />
            </CloseButton>

            {response?.data?.map((comment, index) => (
                <Box key={index} sx={{ my: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {comment?.userName}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            {comment?.comment}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            {new Date(comment?.commentedDate).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </div>
    );
}

export default React.memo(AddComment);
