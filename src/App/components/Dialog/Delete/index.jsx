import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ListItemButton from "@mui/material/ListItemButton";
import MuiDialogContentText from "@mui/material/DialogContentText";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-container": {
        backdropFilter: "blur(3px)",
    },
    "& .MuiDialog-paper": {
        maxWidth: "90%",
        backgroundColor: theme.palette.background.dark,
    },
    // "& .MuiDialogActions-root": {
    //     paddingBottom: theme.spacing(2),
    //     columnGap: 4,
    //     width: "100%",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    // },
    "& .MuiDialogActions-root": {
        marginBottom: "8px",
        columnGap: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

const DialogContentText = styled(MuiDialogContentText)(({ theme }) => ({
    textAlign: "center",
    paddingTop: "16px",
    [theme.breakpoints.up("md")]: {
        paddingTop: "16px",
        paddingLeft: "16px",
        paddingRight: "16px",
    },
}));

const DeleteIcon = styled(LoadingButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    "&: hover": {
        color: theme.palette.border.dark,
        opacity: 1,
        background: theme.palette.border.light,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

const DeleteButton = styled(LoadingButton)(({ theme }) => ({
    textTransform: "capitalize",
    padding: "4px 12px",
    boxShadow: "none",
    color: theme.palette.primary.contrastText,
    background: theme.palette.warning.main,
    "&:hover": {
        background: theme.palette.warning.dark,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

const CancelButton = styled(Button)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    textTransform: "capitalize",
    background: theme.palette.warning.main,
    "&:hover": {
        background: theme.palette.warning.dark,
    },
}));

const YesButton = styled(LoadingButton)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    textTransform: "capitalize",
    background: theme.palette.primary.main,
    "&:hover": {
        background: theme.palette.primary.dark,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

function DeleteDialog({
    fontSize,
    loading,
    parent_id,
    id,
    handleDelete,
    tooltext,
    button = false,
    enablePopoverAction = false,
}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleYes = () => {
        handleDelete(id, parent_id);
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title={tooltext} arrow>
                {button ? (
                    enablePopoverAction ? (
                        <ListItemButton onClick={handleClickOpen}>Delete</ListItemButton>
                    ) : (
                        <DeleteButton
                            onClick={handleClickOpen}
                            endIcon={
                                <DeleteOutlineOutlinedIcon
                                    sx={{
                                        fontSize: "16px",
                                    }}
                                />
                            }
                        >
                            Delete
                        </DeleteButton>
                    )
                ) : (
                    <DeleteIcon
                        size="small"
                        loading={loading}
                        color="primary"
                        component="span"
                        onClick={handleClickOpen}
                        sx={{
                            minWidth: "3px",
                            borderRadius: fontSize ? fontSize : "20px",
                        }}
                    >
                        <DeleteOutlinedIcon
                            sx={{
                                fontSize: fontSize ? fontSize : "20px",
                                color: "warning.main",
                                "&:hover": {
                                    background: "transparent",
                                },
                            }}
                        />
                    </DeleteIcon>
                )}
            </Tooltip>
            <BootstrapDialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle textAlign="center" id="responsive-dialog-title">
                    {"Do you want to delete this?"}
                </DialogTitle>
                <DialogContent
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <DeleteForeverOutlinedIcon
                        sx={{
                            fontSize: "60px",
                            color: "warning.main",
                        }}
                    />
                    <DialogContentText>
                        You won't be able to restore after deleting this. Make sure before deleting.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <CancelButton size="small" variant="contained" onClick={handleClose}>
                        Cancel
                    </CancelButton>
                    <YesButton size="small" variant="outlined" loading={loading} onClick={handleYes}>
                        Yes
                    </YesButton>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

export default DeleteDialog;
