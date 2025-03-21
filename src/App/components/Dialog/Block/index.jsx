import * as React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import MuiIconButton from "@mui/material/IconButton";
import DialogActions from "@mui/material/DialogActions";
import ListItemButton from "@mui/material/ListItemButton";
import DialogContent from "@mui/material/DialogContent";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Field, Form, reduxForm, change, reset } from "redux-form";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

import Validator from "../../../utils/validators";
import TextAreaField from "../../Fields/TextAreaField";

const BootstrapDialog = styled(Dialog)(({ theme, value }) => ({
    "& .MuiDialog-container": {
        backdropFilter: "blur(3px)",
    },
    "& .MuiDialog-paper": {
        width: value ? "90%" : "60%",
        [theme.breakpoints.up("md")]: {
            width: "60%",
        },
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

const BlockButton = styled(LoadingButton)(({ theme }) => ({
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

function BlockDialog({
    loading,
    handleSubmit,
    status,
    id,
    name,
    remark,
    enablePopoverAction,
    onClosePopover,
    ...rest
}) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (open) {
            dispatch(change(`block_form_customer${id}`, "id", id));
            dispatch(change(`block_form_customer${id}`, "is_active", status));
        }
    }, [id, open]);

    const handleClickOpen = () => {
        setOpen(true);
        dispatch(reset(`block_form_customer${id}`));
    };

    const handleClose = () => {
        dispatch(reset(`block_form_customer${id}`));
        setOpen(false);
        onClosePopover?.();
    };

    const handleChange = (e) => {
        dispatch(change(`block_form_customer${id}`, "remarks", e.target.value));
    };

    return (
        <div>
            {enablePopoverAction ? (
                <ListItemButton onClick={handleClickOpen}>{!status ? "Unblock" : "Block"}</ListItemButton>
            ) : (
                <ReleaseIcon
                    size="small"
                    color="primary"
                    component="span"
                    onClick={handleClickOpen}
                    sx={{ minWidth: "3px", borderRadius: "20px" }}
                >
                    {!status ? (
                        <Tooltip title={`Unblock ${name}`} arrow>
                            <LockOutlinedIcon
                                sx={{
                                    fontSize: "20px",
                                    color: "warning.main",
                                    "&:hover": {
                                        background: "transparent",
                                    },
                                }}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title={`Block ${name}`} arrow>
                            <LockOpenOutlinedIcon
                                sx={{
                                    fontSize: "20px",
                                    color: "success.main",
                                    "&:hover": {
                                        background: "transparent",
                                    },
                                }}
                            />
                        </Tooltip>
                    )}
                </ReleaseIcon>
            )}

            <BootstrapDialog open={open} value={remark} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title" sx={{ fontSize: "24px" }}>
                    {"Do you want to"} {status ? "Block?" : "Unblock?"}
                </DialogTitle>
                <Form onSubmit={handleSubmit}>
                    <DialogContent
                        sx={{
                            padding: "0px 24px 10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        {remark && (
                            <Field
                                name="remarks"
                                placeholder="Write Remarks"
                                type="text"
                                small={12}
                                minRows={8}
                                onChange={handleChange}
                                component={TextAreaField}
                                validate={Validator.emptyValidator}
                            />
                        )}
                        {!remark && !status && (
                            <LockOpenOutlinedIcon
                                sx={{
                                    fontSize: "120px",
                                    color: "success.main",
                                    "&:hover": {
                                        background: "transparent",
                                    },
                                }}
                            />
                        )}
                        {!remark && status && (
                            <LockOutlinedIcon
                                sx={{
                                    fontSize: "120px",
                                    color: "warning.main",
                                    "&:hover": {
                                        background: "transparent",
                                    },
                                }}
                            />
                        )}
                    </DialogContent>
                    <DialogActions>
                        <CancelButton size="small" variant="contained" onClick={handleClose}>
                            Cancel
                        </CancelButton>
                        <BlockButton size="small" variant="outlined" loading={loading} type="submit">
                            {status ? "Block" : "UnBlock"}
                        </BlockButton>
                    </DialogActions>
                </Form>
            </BootstrapDialog>
        </div>
    );
}

export default reduxForm({ form: ["form"] })(BlockDialog);

BlockDialog.propTypes = {
    enablePopoverAction: PropTypes.bool,
};
