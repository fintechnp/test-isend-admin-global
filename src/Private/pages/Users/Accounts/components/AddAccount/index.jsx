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

import AccountForm from "./Form";
import actions from "./../../store/actions";
import { Box } from "@mui/material";

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
    color: theme.palette.border.main,
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const AddButton = styled(Button)(({ theme }) => ({
    padding: "6px 12px",
    textTransform: "capitalize",
    // color: theme.palette.secondary.contrastText,
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
    const { children, onClose, loading, ...other } = props;

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
            {typeof onClose === 'function' ? (
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

function AddAccount({ update_data, update }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const { response: add_user, success: add_success, loading: add_loading } = useSelector((state) => state.add_user);
    const {
        response: update_user,
        success: update_success,
        loading: update_loading,
    } = useSelector((state) => state.update_user);

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

    const handleNewUser = (data) => {
        dispatch(actions.add_user(data));
    };

    const handleUpdateUser = (data) => {
        dispatch(actions.update_user(data));
    };

    return (
        <div>
            {update ? (
                <Tooltip title="Edit Account" arrow>
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
                    Add Account
                </AddButton>
            )}
            <BootstrapDialog
                onClose={add_loading || update_loading ? () => {} : handleClose}
                TransitionComponent={Transition}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={add_loading || update_loading ? () => {} : handleClose}
                >
                    {update ? "Update" : "Create New"} Account
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {update ? (
                        <AccountForm
                            destroyOnUnmount
                            initialValues={{
                                id: memoizedData?.id,
                                first_name: memoizedData && memoizedData?.first_name,
                                last_name: memoizedData?.last_name,
                                user_type: memoizedData?.user_type,
                                phone_number: memoizedData?.phone_number,
                                email: memoizedData?.email,
                                agent_id: memoizedData?.agent_id,
                                is_active: memoizedData?.is_active,
                            }}
                            onSubmit={handleUpdateUser}
                            buttonText="Update"
                            update={update}
                            user_type={update_data?.user_type}
                            loading={update_loading}
                            form={`update_user_form`}
                            handleClose={handleClose}
                        />
                    ) : (
                        <AccountForm
                            update={update}
                            enableReinitialize={true}
                            onSubmit={handleNewUser}
                            buttonText="Create"
                            form={`add_user_form`}
                            initialValues={{ is_active: false, agent_id: 0 }}
                            loading={add_loading}
                            handleClose={handleClose}
                        />
                    )}
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default AddAccount;
