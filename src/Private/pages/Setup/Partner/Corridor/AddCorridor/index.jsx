import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiEditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import AddTaskIcon from "@mui/icons-material/AddTask";

import CorridorForm from "./Form";
import actions from "./../../store/actions";
import { useParams } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        "& .MuiDialog-container": {
        backdropFilter: "blur(3px)",
    },
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
    color: theme.palette.border.dark,
    "&:hover": {
        background: theme.palette.border.light,
        opacity: 1,
    },
}));

const EditOutlinedIcon = styled(MuiEditOutlinedIcon)(({ theme }) => ({
    fontSize: "20px",
    opacity: 1,
    "&:hover": {
        background: "transparent",
    },
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

function AddCorridor({ update_data, update }) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [open, setOpen] = React.useState(false);
    const { success: add_success, loading: add_loading } = useSelector(
        (state) => state.add_corridor
    );
    const { success: update_success, loading: update_loading } = useSelector(
        (state) => state.update_corridor
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

    const handleCorridorSubmit = (data) => {
        data.is_active = !data.is_active;
        dispatch(actions.add_corridor(id, data));
    };

    const handleCorridorUpdate = (data) => {
        data.is_active = !data.is_active;
        dispatch(actions.update_corridor(update_data?.tid, id, data));
    };

    return (
        <div>
            {update ? (
                <Tooltip title="Edit Corridor" arrow>
                    <UpdateButton disableRipple onClick={handleClickOpen}>
                        <EditOutlinedIcon />
                    </UpdateButton>
                </Tooltip>
            ) : (
                <AddButton
                    size="small"
                    variant="outlined"
                    onClick={handleClickOpen}
                    endIcon={<AddIcon />}
                >
                    Add Corridor
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
                    {update ? "Update" : "Create New"} Corridor
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {update ? (
                        <CorridorForm
                            destroyOnUnmount
                            initialValues={{
                                tid: memoizedData?.tid,
                                name: memoizedData?.name,
                                short_code: memoizedData?.short_code,
                                country: memoizedData?.country,
                                transaction_currency:
                                    memoizedData?.transaction_currency,
                                is_active: !memoizedData?.is_active,
                            }}
                            onSubmit={handleCorridorUpdate}
                            buttonText="Update"
                            update={update}
                            loading={update_loading}
                            form={`update_corridor_form`}
                            handleClose={handleClose}
                        />
                    ) : (
                        <CorridorForm
                            update={update}
                            enableReinitialize={true}
                            onSubmit={handleCorridorSubmit}
                            buttonText="Create"
                            form={`add_corridor_form`}
                            loading={add_loading}
                            handleClose={handleClose}
                        />
                    )}
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default React.memo(AddCorridor);
