import * as React from "react";
import PropTypes from "prop-types";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@mui/material/DialogContent";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import AccountForm from "./Form";
import Box from "@mui/material/Box";
import actions from "./../../store/actions";
import HasPermission from "Private/components/shared/HasPermission";

import useAuthUser from "Private/hooks/useAuthUser";
import { permissions } from "Private/data/permissions";

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
    // 
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
            {typeof onClose === "function" ? (
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
    const { can } = useAuthUser();

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
                    <HasPermission permission={permissions.EDIT_USER}>
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
                    </HasPermission>
                </Tooltip>
            ) : (
                <HasPermission permission={permissions.CREATE_USER}>
                    <AddButton size="small" variant="outlined" onClick={handleClickOpen} endIcon={<AddIcon />}>
                        Add Account
                    </AddButton>
                </HasPermission>
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
                            defaultValues={{
                                id: memoizedData?.id,
                                first_name: memoizedData && memoizedData?.first_name,
                                last_name: memoizedData?.last_name,
                                phone_number: memoizedData?.phone_number,
                                email: memoizedData?.email,
                                is_active: memoizedData?.is_active,
                                gender: memoizedData?.gender,
                                user_profile: memoizedData?.roles?.map((r) => r.id) ?? [],
                            }}
                            update={update}
                            onSubmit={handleUpdateUser}
                            loading={update_loading}
                            handleClose={handleClose}
                        />
                    ) : (
                        <AccountForm
                            update={update}
                            onSubmit={handleNewUser}
                            defaultValues={{ is_active: true }}
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
