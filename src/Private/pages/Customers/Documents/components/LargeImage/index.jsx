import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import CardMedia from "@mui/material/CardMedia";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import MuiIconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FitScreenOutlinedIcon from "@mui/icons-material/FitScreenOutlined";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import { ReferenceName } from "./../../../../../../App/helpers";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        minWidth: "70%",
        [theme.breakpoints.down("md")]: {
            minWidth: "90%",
        },
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: "border.main",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "420px",
    minHeight: "200px",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid gray",
    borderRadius: "4px",
    borderColor: "rgba(0, 0, 0, 0.23)",
    [theme.breakpoints.down("md")]: {
        minHeight: "150px",
    },
    "& .MuiCardMedia-root": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
}));

const CloseButton = styled(MuiIconButton)(({ theme }) => ({
    padding: "4px",
    position: "absolute",
    right: "15px",
    top: "15px",
    color: theme.palette.grey[500],
    borderRadius: "3px",
}));

const HeaderIcon = styled(FitScreenOutlinedIcon)(({ theme }) => ({
    color: theme.palette.primary.main,
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle
            sx={{
                m: 0,
                p: 1.8,
                pl: 2.5,
                display: "flex",
                alignItems: "center",
            }}
            {...other}
        >
            {" "}
            <Box
                sx={{
                    pr: 1.5,
                    pl: 0.5,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <HeaderIcon fontSize="large" />
            </Box>
            {children}
            {onClose ? (
                <CloseButton aria-label="close" onClick={onClose}>
                    <CloseIcon />
                </CloseButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function LargeImage({ image, side, title }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title="Enlarge Image" arrow>
                <IconButton
                    sx={{ paddingRight: "6px" }}
                    onClick={handleClickOpen}
                >
                    <SettingsOverscanIcon
                        sx={{
                            fontSize: "25px",
                            "&:hover": {
                                background: "transparent",
                            },
                        }}
                    />
                </IconButton>
            </Tooltip>
            <BootstrapDialog
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    {ReferenceName(2, title)} [{ReferenceName(48, side)}]
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <ImageWrapper>
                        <CardMedia
                            component="img"
                            image={image}
                            alt="doc img"
                        />
                    </ImageWrapper>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default React.memo(LargeImage);
