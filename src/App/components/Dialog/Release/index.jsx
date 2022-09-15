import * as React from "react";
import { styled } from "@mui/material/styles";
import { Field, Form, reduxForm, reset, change } from "redux-form";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Tooltip } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import MuiIconButton from "@mui/material/IconButton";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";

import Validator from "../../../utils/validators";
import TextAreaField from "../../Fields/TextAreaField";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        maxWidth: "90%",
        [theme.breakpoints.up("md")]: {
            minWidth: "60%",
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

const ReleaseButton = styled(LoadingButton)(({ theme }) => ({
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

function ReleaseDialog({ id, loading, tooltext, handleSubmit, validatation }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (id) {
            dispatch(change("release_form_transaction", "id", id));
        }
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        dispatch(reset("release_form_transaction"));
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title={tooltext} arrow>
                <ReleaseIcon
                    size="small"
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
                        {validatation ? (
                            <Field
                                name="remarks"
                                placeholder="Write Remarks"
                                type="text"
                                small={12}
                                minRows={8}
                                component={TextAreaField}
                                validate={Validator.emptyValidator}
                            />
                        ) : (
                            <CallMissedOutgoingIcon
                                sx={{
                                    fontSize: "80px",
                                    color: "success.main",
                                }}
                            />
                        )}
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
                            type="submit"
                        >
                            Release
                        </ReleaseButton>
                    </DialogActions>
                </Form>
            </BootstrapDialog>
        </div>
    );
}

export default reduxForm({ form: ["form"] })(ReleaseDialog);
