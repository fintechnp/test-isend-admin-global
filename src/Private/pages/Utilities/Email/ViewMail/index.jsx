import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import View from "./View";
import actions from "../../store/actions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-container": {
        backdropFilter: "blur(3px)",
    },
    "& .MuiDialog-paper": {
        minWidth: "75%",
        minHeight: "300px",
        [theme.breakpoints.down("md")]: {
            width: "90%",
        },
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const ViewButton = styled(IconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: theme.palette.border.main,
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

function VeiwEmail({ id }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const { response: EmailData, loading: get_loading } = useSelector(
        (state) => state.get_email_byid
    );

    React.useEffect(() => {
        if (id && open) {
            dispatch(actions.get_email_byid(id));
        }
    }, [id, open]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title="View Email" arrow>
                <ViewButton onClick={handleClickOpen}>
                    <RemoveRedEyeOutlinedIcon
                        sx={{
                            fontSize: "20px",
                            "&:hover": {
                                background: "transparent",
                            },
                        }}
                    />
                </ViewButton>
            </Tooltip>
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
                    Veiw Email
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <View loading={get_loading} data={EmailData?.data || []} />
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default React.memo(VeiwEmail);
