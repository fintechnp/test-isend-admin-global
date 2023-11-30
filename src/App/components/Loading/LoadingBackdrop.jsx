import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";

import CircularProgress from "./CircularProgress";

export default function LoadingBackdrop({ open, text, onClick }) {
    if (!open) return <> </>;

    return (
        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={onClick}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={3}>
                <CircularProgress />
                <Typography>{text}</Typography>
            </Box>
        </Backdrop>
    );
}

LoadingBackdrop.propTypes = {
    open: PropTypes.bool,
    text: PropTypes.string,
    onClick: PropTypes.func,
};
