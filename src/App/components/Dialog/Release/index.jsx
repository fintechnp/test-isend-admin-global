import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Tooltip } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import MuiIconButton from "@mui/material/IconButton";
import MuiTextareaAutosize from "@mui/material/TextareaAutosize";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        maxWidth: "90%",
    },
    "& .MuiDialogActions-root": {
        marginBottom: "8px",
        columnGap: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

const ReleaseIcon = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    "&: hover": {
        color: theme.palette.border.dark,
        opacity: 1,
        background: theme.palette.border.light,
    },
}));

const TextareaAutosize = styled(MuiTextareaAutosize)(({ theme }) => ({
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: `1px solid ${theme.palette.border.main}`,
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

const ReleaseButton = styled(LoadingButton)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    textTransform: "capitalize",
    background: theme.palette.primary.main,
    "&:hover": {
        background: theme.palette.primary.dark,
    },
}));

function ReleaseDialog({ loading, id, handleRelease, tooltext }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleYes = () => {
        handleRelease(id);
    };

    return (
        <div>
            <Tooltip title={tooltext} arrow>
                <ReleaseIcon
                    size="small"
                    loading={loading}
                    color="primary"
                    component="span"
                    onClick={handleClickOpen}
                    sx={{ minWidth: "3px", borderRadius: "20px" }}
                >
                    <LockOpenOutlinedIcon
                        sx={{
                            fontSize: "20px",
                            color: "border.dark",
                            "&:hover": {
                                background: "transparent",
                            },
                        }}
                    />
                </ReleaseIcon>
            </Tooltip>
            <BootstrapDialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Do you want to Release this Transaction?"}
                </DialogTitle>
                <DialogContent
                    sx={{
                        padding: "10px 28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <TextareaAutosize minRows={8} placeholder="Write Remarks" />
                </DialogContent>
                <DialogActions>
                    <CancelButton
                        size="small"
                        variant="contained"
                        onClick={handleClose}
                    >
                        Cancel
                    </CancelButton>
                    <ReleaseButton
                        size="small"
                        variant="outlined"
                        loading={loading}
                        onClick={handleYes}
                    >
                        Release
                    </ReleaseButton>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

export default ReleaseDialog;
