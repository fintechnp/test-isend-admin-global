import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import styled from "@mui/material/styles/styled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import QuestionMark from "@mui/icons-material/QuestionMark";
import DialogContentText from "@mui/material/DialogContentText";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import TextButton from "App/components/Button/TextButton";

const colors = {
    success: "#A5DC86",
    error: "#F27B7B",
    warning: "#F8BB86",
    info: "#3FC3EE",
    question: "#3FC3EE",
};

const IconWrapper = styled(Box)(({ color }) => {
    return {
        borderWidth: "0.3em",
        borderStyle: "solid",
        borderColor: colors[color],
        height: "5rem",
        width: "5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
    };
});

const SuccessIcon = styled(CheckIcon)({
    color: colors.success,
});

const ErrorIcon = styled(CloseIcon)({
    color: colors.error,
});

const WarningIcon = styled(PriorityHighIcon)({
    color: colors.warning,
});

const InfoIcon = styled(PriorityHighIcon)({
    color: colors.info,
    transform: "rotate(180deg)",
});

const QuestionMarkIcon = styled(QuestionMark)({
    color: colors.question,
});

const icons = {
    success: SuccessIcon,
    error: ErrorIcon,
    warning: WarningIcon,
    info: InfoIcon,
    question: QuestionMarkIcon,
};

export default function ConfirmationDialog({ open, options, onCancel, onConfirm, onClose }) {
    const {
        title,
        description,
        content,
        confirmationText,
        cancellationText,
        dialogProps,
        confirmationButtonProps,
        cancellationButtonProps,
        titleProps,
        contentProps,
        allowClose,
        icon,
    } = options;

    return (
        <Dialog {...dialogProps} open={open} onClose={allowClose ? onClose : null}>
            <Box sx={{ width: "32em", maxWidth: "100%" }}>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ pt: 4, pb: 1 }}>
                    <IconWrapper color={icon}>
                        {React.createElement(icons[icon], { sx: { fontSize: "3rem" } })}
                    </IconWrapper>
                </Box>
                {title && (
                    <DialogTitle
                        {...titleProps}
                        sx={{ textAlign: "center", fontWeight: 600, fontSize: "1.8rem", ...titleProps.sx }}
                    >
                        {title}
                    </DialogTitle>
                )}
                {content ? (
                    <DialogContent {...contentProps} sx={{ textAlign: "center", ...contentProps.sx }}>
                        {content}
                    </DialogContent>
                ) : (
                    description && (
                        <DialogContent {...contentProps}>
                            <DialogContentText sx={{ textAlign: "center" }}>{description}</DialogContentText>
                        </DialogContent>
                    )
                )}
                <DialogActions sx={{ display: "flex", justifyContent: "space-between", px: 6, pb: 4 }}>
                    <TextButton {...cancellationButtonProps} onClick={onCancel} color="error">
                        {cancellationText}
                    </TextButton>
                    <Button
                        color="primary"
                        variant="contained"
                        {...confirmationButtonProps}
                        onClick={onConfirm}
                        sx={{ boxShadow: 0, textTransform: "none" }}
                    >
                        {confirmationText}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}

ConfirmationDialog.propTypes = {
    open: PropTypes.bool,
    options: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        content: PropTypes.node,
        confirmationText: PropTypes.string,
        cancellationText: PropTypes.string,
        dialogProps: PropTypes.object,
        confirmationButtonProps: PropTypes.object,
        cancellationButtonProps: PropTypes.object,
        titleProps: PropTypes.object,
        contentProps: PropTypes.object,
        allowClose: PropTypes.bool,
        icon: PropTypes.oneOf(["success", "error", "warning", "info", "question"]),
    }),
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    onClose: PropTypes.func,
};

ConfirmationDialog.defaultProps = {
    open: false,
    options: {
        title: "",
        description: "",
        content: "",
        confirmationText: "",
        cancellationText: "",
        dialogProps: {},
        confirmationButtonProps: {},
        cancellationButtonProps: {},
        titleProps: {},
        contentProps: {},
        allowClose: false,
        icon: "warning",
    },
    onCancel: () => {},
    onConfirm: () => {},
    onClose: () => {},
};
