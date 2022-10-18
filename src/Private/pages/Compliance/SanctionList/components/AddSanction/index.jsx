import * as React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
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
import actions from "../../store/actions";

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
    color: theme.palette.secondary.contrastText,
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

function AddSanction({ update_data, update }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const { success: add_success, loading: add_loading } = useSelector(
        (state) => state.add_sanction
    );
    const { success: update_success, loading: update_loading } = useSelector(
        (state) => state.update_sanction
    );

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

    const handleSanctionSubmit = (data) => {
        dispatch(actions.add_sanction(data));
    };

    const handleUpdateSanction = (data) => {
        dispatch(actions.update_sanction(data.sanction_id, data));
    };

    return (
        <div>
            {update ? (
                <Tooltip title="Edit Sanction" arrow>
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
                    Add Sanction
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
                    {update ? "Update" : "Create New"} Sanction
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {update ? (
                        <AccountForm
                            destroyOnUnmount
                            initialValues={{
                                sanction_id: memoizedData?.tid,
                                name: memoizedData?.name,
                                type: memoizedData?.type,
                                address: memoizedData?.address,
                                country: memoizedData?.country,
                                dob: new Date(memoizedData?.dob)
                                    .toISOString()
                                    .slice(0, 10),
                                source: memoizedData?.source,
                                remarks: memoizedData?.remarks,
                                ref1: memoizedData?.ref1,
                                ref2: memoizedData?.ref2,
                            }}
                            onSubmit={handleUpdateSanction}
                            buttonText="Update"
                            update={update}
                            loading={update_loading}
                            form={`update_sanction_form`}
                            handleClose={handleClose}
                        />
                    ) : (
                        <AccountForm
                            update={update}
                            enableReinitialize={true}
                            onSubmit={handleSanctionSubmit}
                            buttonText="Create"
                            form={`add_sanction_form`}
                            loading={add_loading}
                            handleClose={handleClose}
                        />
                    )}
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default AddSanction;
