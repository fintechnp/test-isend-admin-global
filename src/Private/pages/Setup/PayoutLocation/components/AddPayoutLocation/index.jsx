import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@mui/material/DialogContent";
import ListItemButton from "@mui/material/ListItemButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import AccountForm from "./Form";
import actions from "./../../store/actions";
import Modal from "App/components/Modal/Modal";

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

function AddPayoutLocation({ update_data, update, enablePopoverAction }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const { success: add_success, loading: add_loading } = useSelector((state) => state.add_payout_location);
    const { success: update_success, loading: update_loading } = useSelector((state) => state.update_payout_location);

    const memoizedData = React.useMemo(() => update_data, [update_data]);

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

    const handlePayoutLocationSubmit = (data) => {
        dispatch(actions.add_payout_location(data));
    };

    const handlePayoutLocationUpdate = (data) => {
        dispatch(actions.update_payout_location(data.tid, data));
    };

    return (
        <div>
            {update ? (
                enablePopoverAction ? (
                    <ListItemButton onClick={handleClickOpen}>Edit</ListItemButton>
                ) : (
                    <Tooltip title="Edit Payout Location" arrow>
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
                )
            ) : (
                <AddButton
                    size="medium"
                    variant="contained"
                    onClick={handleClickOpen}
                    endIcon={<AddCircleOutlineIcon />}
                >
                    Create Payout Location
                </AddButton>
            )}
            <Modal
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="customized-dialog-title"
                open={open}
                title={update ? "Update Payout Location" : "Create Payout Location"}
            >
                {update ? (
                    <AccountForm
                        destroyOnUnmount
                        initialValues={{
                            tid: memoizedData?.tid,
                            location_name: memoizedData?.location_name,
                            location_code: memoizedData?.location_code,
                            country: memoizedData?.country,
                            currency: memoizedData?.currency,
                            payment_type: memoizedData?.payment_type,
                            is_active: memoizedData?.is_active,
                        }}
                        onSubmit={handlePayoutLocationUpdate}
                        buttonText="Update"
                        update={update}
                        loading={update_loading}
                        form={`update_payout_location_form`}
                        handleClose={handleClose}
                    />
                ) : (
                    <AccountForm
                        update={update}
                        enableReinitialize={true}
                        onSubmit={handlePayoutLocationSubmit}
                        buttonText="Create"
                        form={`add_payout_location_form`}
                        loading={add_loading}
                        handleClose={handleClose}
                    />
                )}
            </Modal>
        </div>
    );
}

export default React.memo(AddPayoutLocation);
