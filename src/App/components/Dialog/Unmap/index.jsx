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
import PhonelinkEraseIcon from "@mui/icons-material/PhonelinkErase";
import CableIcon from "@mui/icons-material/Cable";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        "& .MuiDialog-container": {
        backdropFilter: "blur(3px)",
    },
    "& .MuiDialog-paper": {
        maxWidth: "600px",
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

const UnmapIcon = styled(LoadingButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    "&: hover": { color: "border.dark", opacity: 1 },
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

function Unmap({
    loading,
    id,
    handleMapUnmap,
    success,
    information,
    title,
    map,
    map_id,
}) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (success) {
            setOpen(false);
        }
    }, [success]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleYes = () => {
        handleMapUnmap(id, map_id);
    };

    return (
        <div>
            {map ? (
                <Tooltip title="Map Partner Bank" arrow>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={handleClickOpen}
                        endIcon={<CableIcon sx={{ fontSize: "16px" }} />}
                    >
                        Map
                    </Button>
                </Tooltip>
            ) : (
                <Tooltip title="Unmap Partner Bank" arrow>
                    <UnmapIcon
                        size="small"
                        loading={loading}
                        color="primary"
                        component="span"
                        onClick={handleClickOpen}
                        sx={{ minWidth: "3px" }}
                    >
                        <PhonelinkEraseIcon
                            sx={{
                                fontSize: "20px",
                                color: "warning.main",
                            }}
                        />
                    </UnmapIcon>
                </Tooltip>
            )}
            <BootstrapDialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
                <DialogContent
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    {map ? (
                        <CableIcon
                            sx={{
                                fontSize: "60px",
                                color: "primary.main",
                            }}
                        />
                    ) : (
                        <PhonelinkEraseIcon
                            sx={{
                                fontSize: "60px",
                                color: "warning.main",
                            }}
                        />
                    )}
                    <DialogContentText>{information}</DialogContentText>
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

export default React.memo(Unmap);
