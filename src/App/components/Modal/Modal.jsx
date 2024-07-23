import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

const ModalHeader = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px 8px 0 0",
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}));

const ModalBody = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3, 2),
    maxHeight: "90vh",
    overflowY: "auto",
}));

export default function Modal({ title, open, onClose, sx, children }) {
    return (
        <MuiModal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    borderRadius: "8px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                }}
            >
                {!!title && (
                    <ModalHeader>
                        {Object.prototype.toString.call(title) === "[object String]" ? (
                            <Typography variant="subtitle" fontWeight={500}>
                                {title}
                            </Typography>
                        ) : (
                            title
                        )}

                        {typeof onClose === "function" && (
                            <IconButton
                                size="small"
                                onClick={onClose}
                                sx={{
                                    "& .MuiSvgIcon-root": {
                                        fill: "#68727D",
                                    },
                                }}
                            >
                                <HighlightOffRoundedIcon fontSize="medium" color="background.paper" />
                            </IconButton>
                        )}
                    </ModalHeader>
                )}
                <Divider />
                <ModalBody sx={sx}>{children}</ModalBody>
            </Box>
        </MuiModal>
    );
}

Modal.propTypes = {
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    sx: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};
