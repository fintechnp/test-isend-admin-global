import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import MuiModal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
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

export default function Modal({ open, onClose, sx, children }) {
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
          p: 2,
          ...(Object.prototype.toString.call(sx) === "[object Undefined]"
            ? sx
            : {}),
        }}
      >
        {typeof onClose === "function" && (
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        )}
        {children}
      </Box>
    </MuiModal>
  );
}

Modal.defaultProps = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  sx: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};
