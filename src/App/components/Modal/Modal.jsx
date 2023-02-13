import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import MuiModal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = styled("div")(({ theme }) => ({
    cursor: "pointer",
    position: "absolute",
    top: "-12px",
    right: "-12px",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.error.main,
    borderRadius: "50%",
    "& .MuiSvgIcon-root": {
        color: theme.palette.background.paper,
    },
}));

const ModalHeader = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    borderRadius: "8px 8px 0 0",
    padding: theme.spacing(1),
}));

const ModalBody = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3, 2),
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
                    // width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    // p: 2,
                    ...(Object.prototype.toString.call(sx) === "[object Undefined]" ? sx : {}),
                }}
            >
                {typeof onClose === "function" && (
                    <CloseButton onClick={onClose}>
                        <CloseIcon />
                    </CloseButton>
                )}
                {!!title && (
                    <ModalHeader>
                        {Object.prototype.toString.call(title) === "[object String]" ? (
                            <Typography variant="h6" color="grey.600">
                                {title}
                            </Typography>
                        ) : (
                            title
                        )}
                    </ModalHeader>
                )}
                <ModalBody>{children}</ModalBody>
            </Box>
        </MuiModal>
    );
}

Modal.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    sx: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};
