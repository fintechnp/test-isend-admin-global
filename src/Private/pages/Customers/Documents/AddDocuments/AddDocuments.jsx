import * as React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@mui/material/DialogContent";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import DocumentForm from "./Form";
import actions from "../store/actions";
import { useParams } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-container": {
        backdropFilter: "blur(3px)",
    },
    "& .MuiDialog-paper": {
        maxWidth: "100%",
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const AddButton = styled(Button)(({ theme }) => ({
    padding: "6px 12px",
    textTransform: "capitalize",

    borderColor: theme.palette.border.main,
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    padding: "4px",
    position: "absolute",
    right: "15px",
    top: "15px",
    color: theme.palette.grey[500],
    borderRadius: "3px",
}));

const HeaderIcon = styled(AddTaskIcon)(({ theme }) => ({
    color: theme.palette.border.main,
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle
            sx={{
                m: 0,
                p: 1.8,
                pl: 2.5,
                display: "flex",
                alignItems: "center",
            }}
            {...other}
        >
            {" "}
            <Box
                sx={{
                    pr: 1.5,
                    pl: 0.5,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <HeaderIcon />
            </Box>
            {children}
            {onClose ? (
                <CloseButton aria-label="close" onClick={onClose}>
                    <CloseIcon />
                </CloseButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddDocuments() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const { success: add_success, loading: add_loading } = useSelector((state) => state.upload_documents);

    React.useEffect(() => {
        if (add_success) {
            setOpen(false);
            dispatch({ type: "UPLOAD_DOCUMENTS_RESET" });
        }
    }, [dispatch, add_success]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDocument = (data) => {
        var formData = new FormData();
        formData.append("name", data?.name);
        formData.append("type", data?.type);
        formData.append("side", data?.side);
        formData.append("format", data?.format);
        formData.append("document", data?.document);
        dispatch(actions.upload_documents(id, formData));
    };

    return (
        <div>
            <AddButton size="small" variant="contained" onClick={handleClickOpen} endIcon={<AddCircleOutlineIcon />}>
                Add Document
            </AddButton>
            <BootstrapDialog
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Document
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <DocumentForm
                        touchOnChange
                        enableReinitialize={true}
                        onSubmit={handleDocument}
                        loading={add_loading}
                        handleClose={handleClose}
                    />
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default React.memo(AddDocuments);
