import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import MuiDialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Tooltip } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        maxWidth: "90%",
    },
    "& .MuiDialogActions-root": {
        paddingBottom: theme.spacing(2),
        columnGap: 4,
        width: "100%",
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

const DeleteButton = styled(LoadingButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    "&: hover": { color: "border.dark", opacity: 1 },
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
}));

function DeleteDialog({ loading, parent_id, id, handleDelete, tooltext }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleYes = () => {
        handleDelete(id, parent_id);
    };

    return (
        <div>
            <Tooltip title={tooltext} arrow>
                <DeleteButton
                    size="small"
                    loading={loading}
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={handleClickOpen}
                    sx={{ minWidth: "3px" }}
                >
                    <DeleteOutlinedIcon
                        sx={{
                            fontSize: "20px",
                            color: "warning.main",
                        }}
                    />
                </DeleteButton>
            </Tooltip>
            <BootstrapDialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
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
                        You won't be able to restore after deleting this. Make
                        sure before deleting.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <CancelButton
                        size="small"
                        variant="contained"
                        onClick={handleClose}
                    >
                        Cancel
                    </CancelButton>
                    <YesButton
                        size="small"
                        variant="outlined"
                        loading={loading}
                        onClick={handleYes}
                    >
                        Yes
                    </YesButton>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

export default DeleteDialog;
