import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import MuiIconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import FitScreenOutlinedIcon from "@mui/icons-material/FitScreenOutlined";

import Row from "App/components/Row/Row";
import TextButton from "App/components/Button/TextButton";

import Image from "../Image";
import { ReferenceName } from "App/helpers";
import { ListItemButton } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-container": {
        backdropFilter: "blur(3px)",
    },
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
    maxHeight: "90svh",
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
        height: "70vh",
        width: "auto",
        objectFit: "cover",
    },
    "& img": {
        height: "70vh",
        width: "auto",
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

function LargeImage({ image, side, title, enablePopoverAction, enableImage }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {enablePopoverAction ? (
                <ListItemButton onClick={handleClickOpen}>View Image</ListItemButton>
            ) : enableImage ? (
                <Box onClick={handleClickOpen} height="100px" textAlign="center">
                    <img src={image} style={{ height: "100%", width: "auto", objectFit: "contain" }} />
                </Box>
            ) : (
                <Tooltip title="Enlarge Image" arrow>
                    <IconButton sx={{ paddingRight: "6px" }} onClick={handleClickOpen}>
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
            )}
            <BootstrapDialog
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Row alignItems="center" justifyContent="space-between">
                        <Typography>
                            {ReferenceName(2, title)} [{ReferenceName(48, side)}
                        </Typography>
                        <TextButton
                            sx={{ marginRight: "40px" }}
                            onClick={() => {
                                window.open(image, "_blank");
                            }}
                        >
                            Open this document in new tab
                        </TextButton>
                    </Row>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <ImageWrapper>
                        <CardMedia component="img" image={image} alt="doc img" />
                    </ImageWrapper>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default React.memo(LargeImage);
