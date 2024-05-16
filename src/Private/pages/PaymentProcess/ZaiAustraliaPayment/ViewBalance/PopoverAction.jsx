import * as React from "react";

import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";

import PropTypes from "prop-types";

export default function PopoverAction(props) {
    const { onCheckBalance, onMakePayment, onRefundPayment } = props;

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
            <Button
                aria-describedby={id}
                variant="outlined"
                onClick={handleClick}
                endIcon={open ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
            >
                Actions
            </Button>
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
                    {onCheckBalance && (
                        <>
                            <ListItemButton
                                onClick={() => {
                                    onCheckBalance?.();
                                    handleClose();
                                }}
                            >
                                Check Balance
                            </ListItemButton>
                            <Divider />
                        </>
                    )}
                    {onMakePayment && (
                        <>
                            <ListItemButton
                                onClick={() => {
                                    onMakePayment?.();
                                    handleClose();
                                }}
                            >
                                Make Payment
                            </ListItemButton>
                            <Divider />
                        </>
                    )}
                    {onRefundPayment && (
                        <ListItemButton
                            onClick={() => {
                                onRefundPayment?.();
                                handleClose();
                            }}
                        >
                            Refund Payment
                        </ListItemButton>
                    )}
                </List>
            </Popover>
        </div>
    );
}

PopoverAction.propTypes = {
    onCheckBalance: PropTypes.func,
    onMakePayment: PropTypes.func,
    onRefundPayment: PropTypes.func,
};
