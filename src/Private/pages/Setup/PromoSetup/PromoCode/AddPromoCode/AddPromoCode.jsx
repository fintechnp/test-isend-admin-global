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
import { useDispatch, useSelector } from "react-redux";
import AddTaskIcon from "@mui/icons-material/AddTask";

import PromoCodeForm from "./Form";
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

function AddCode({ promo_id }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const { success: add_success, loading: add_loading } = useSelector(
        (state) => state.add_promo_code
    );

    React.useEffect(() => {
        if (add_success) {
            setOpen(false);
            dispatch({ type: "ADD_PROMO_CODE_RESET" });
        }
    }, [add_success]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (data) => {
        dispatch(actions.add_promo_code(promo_id, data));
    };

    return (
        <div>
            <AddButton
                size="small"
                variant="outlined"
                onClick={handleClickOpen}
                endIcon={<AddIcon />}
            >
                Add Promo Code
            </AddButton>
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
                    Create Promo Code
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <PromoCodeForm
                        enableReinitialize={true}
                        onSubmit={handleSubmit}
                        form={`add_promo_code_form`}
                        loading={add_loading}
                        handleClose={handleClose}
                    />
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default React.memo(AddCode);
