import * as React from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import MuiButton from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const Button = styled(MuiButton)(({ theme }) => ({
    background: theme.palette.surface.primarySecond,
    color: theme.palette.primary.main,
    border: 0,
    "&:hover": {
        background: theme.palette.surface.primarySecond,
    },
}));

export default function PopoverButton({ children, variant = "icon", ...rest }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div>
            {variant === "icon" ? (
                <IconButton onClick={handleClick} {...rest}>
                    <MoreHorizIcon />
                </IconButton>
            ) : (
                <Button
                    onClick={handleClick}
                    endIcon={open ? <KeyboardArrowUpRoundedIcon /> : <KeyboardArrowDownRoundedIcon />}
                    {...rest}
                >
                    Actions
                </Button>
            )}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <List disablePadding>
                    {typeof children === "function" ? children({ onClose: handleClose }) : children}
                </List>
            </Popover>
        </div>
    );
}

PopoverButton.propTypes = {
    variant: PropTypes.oneOf(["icon", "button"]),
};
