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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import AddTaskIcon from "@mui/icons-material/AddTask";

import PromoSetupForm from "./Form";
import actions from "./../../store/actions";

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

function AddApiConfig({ update_data, update }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const { success: add_success, loading: add_loading } = useSelector(
        (state) => state.add_api_config
    );
    const { success: update_success, loading: update_loading } = useSelector(
        (state) => state.update_api_config
    );

    const memoizedData = React.useMemo(() => update_data, [update_data]);

    React.useEffect(() => {
        if (add_success || update_success || !open) {
            setOpen(false);
            dispatch({ type: "ADD_API_CONFIG_RESET" });
            dispatch({ type: "UPDATE_API_CONFIG_RESET" });
        }
    }, [dispatch, add_success, update_success, open]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleApiConfigSubmit = (data) => {
        dispatch(actions.add_api_config(data));
    };

    const handleApiConfigUpdate = (data) => {
        dispatch(actions.update_api_config(update_data?.config_id, data));
    };

    return (
        <div>
            {update ? (
                <Tooltip title="Edit Api Config" arrow>
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
                    Add Api Config
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
                    {update ? "Update" : "Create"} Api Config
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {update ? (
                        <PromoSetupForm
                            destroyOnUnmount
                            initialValues={{
                                api_partner_code:
                                    memoizedData?.api_partner_code,
                                api_url: memoizedData?.api_url,
                                api_user_id: memoizedData?.api_user_id,
                                api_user_secret: memoizedData?.api_user_secret,
                                ref1: memoizedData?.ref1,
                                ref2: memoizedData?.ref2,
                                ref3: memoizedData?.ref3,
                                remarks: memoizedData?.remarks,
                            }}
                            onSubmit={handleApiConfigUpdate}
                            buttonText="Update"
                            update={update}
                            loading={update_loading}
                            form={`update_api_config_form`}
                            handleClose={handleClose}
                        />
                    ) : (
                        <PromoSetupForm
                            update={update}
                            enableReinitialize={true}
                            onSubmit={handleApiConfigSubmit}
                            buttonText="Create"
                            form={`add_api_config_form`}
                            loading={add_loading}
                            handleClose={handleClose}
                        />
                    )}
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default React.memo(AddApiConfig);
