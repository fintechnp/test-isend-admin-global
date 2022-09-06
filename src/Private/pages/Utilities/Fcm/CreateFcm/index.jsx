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
import { Box } from "@mui/material";

import FCMForm from "./Form";
import actions from "../../store/actions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        maxWidth: "90%",
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

const AddButton = styled(Button)(({ theme }) => ({
    padding: "6px 12px",
    textTransform: "capitalize",
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
    color: theme.palette.primary.main,
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

function CreateFcm({ update, update_data }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const memoizedData = React.useMemo(() => update_data, [update_data]);

    const { success: add_success, loading: add_loading } = useSelector(
        (state) => state.create_fcm
    );

    const { success: update_success, loading: update_loading } = useSelector(
        (state) => state.update_fcm
    );

    React.useEffect(() => {
        if (add_success || update_success) {
            setOpen(false);
        }
    }, [add_success, update_success]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFCMCreate = (data) => {
        if (data?.type === "topic") {
            dispatch(
                actions.create_fcm({
                    topic: data?.topic,
                    title: data?.title,
                    body: data?.body,
                    image_url: data?.image_url,
                    display_notification: data?.display_notification,
                    detail_content: data?.detail_content,
                })
            );
        } else {
            dispatch(
                actions.create_fcm({
                    customer_id: data?.customer_id,
                    title: data?.title,
                    body: data?.body,
                    image_url: data?.image_url,
                    display_notification: data?.display_notification,
                    detail_content: data?.detail_content,
                })
            );
        }
    };

    const handleFCMUpdate = (data) => {
        if (data?.type === "topic") {
            dispatch(
                actions.update_fcm(data?.tid, {
                    topic: data?.topic,
                    title: data?.title,
                    body: data?.body,
                    image_url: data?.image_url,
                })
            );
        } else {
            dispatch(
                actions.update_fcm(data?.tid, {
                    customer_id: data?.customer_id,
                    title: data?.title,
                    body: data?.body,
                    image_url: data?.image_url,
                })
            );
        }
    };

    return (
        <div>
            {update ? (
                <Tooltip title="Edit FCM Message" arrow>
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
                <AddButton
                    size="small"
                    variant="outlined"
                    onClick={handleClickOpen}
                    endIcon={<AddIcon />}
                >
                    Create FCM
                </AddButton>
            )}
            <BootstrapDialog
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    {update ? "Update" : "Create"} FCM Message
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {update ? (
                        <FCMForm
                            destroyOnUnmount
                            enableReinitialize
                            initialValues={{
                                tid: memoizedData?.tid,
                                title: memoizedData?.title,
                                topic: memoizedData?.topic,
                                body: memoizedData?.body,
                                customer_id: memoizedData?.customer_id,
                                image_url: memoizedData?.image_url,
                            }}
                            customer_id={memoizedData?.customer_id}
                            onSubmit={handleFCMUpdate}
                            update={update}
                            loading={update_loading}
                            form={`update_fcm_form`}
                            handleClose={handleClose}
                        />
                    ) : (
                        <FCMForm
                            destroyOnUnmount={true}
                            initialValues={{
                                type: "topic",
                            }}
                            update={update}
                            onSubmit={handleFCMCreate}
                            loading={add_loading}
                            handleClose={handleClose}
                            form={`create_fcm_form`}
                        />
                    )}
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default React.memo(CreateFcm);
