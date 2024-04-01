import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch, useSelector } from "react-redux";

import actions from "../store/actions";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

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

const CloseButton = styled(IconButton)(({ theme }) => ({
    padding: "4px",
    position: "absolute",
    right: "15px",
    top: "15px",
    color: theme.palette.grey[500],
    borderRadius: "3px",
}));

function GetAttachment({ attachmentType, attachmentId, data }) {
    const methods = useForm({
        defaultValues: {
            attachmentId,
            attachmentType,
        },
    });

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        dispatch(
            actions.get_all_attachments({
                attachmentType: "Transaction",
                attachmentId: referenceId,
            }),
        );
    }, [dispatch]);

    const { response, loading } = useSelector((state) => state.get_all_attachments);

    return (
        <div>
            {response?.data?.map((attachments, index) => (
                <Box key={index} sx={{ my: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {attachments?.userName}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            {attachments?.attachmnetName}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            {
                                <a
                                    href={attachments?.attachment}
                                    target="_blank"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <img
                                        src={attachments?.attachment}
                                        alt={attachments?.attachmnetName}
                                        style={{
                                            width: "100%",
                                            height: "200px",
                                            objectFit: "cover",
                                        }}
                                    ></img>
                                </a>
                            }
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        {new Date(attachments?.uploadedDate).toLocaleDateString()}
                    </Typography>
                </Box>
            ))}
        </div>
    );
}

export default React.memo(GetAttachment);
