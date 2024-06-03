import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiListItem from "@mui/material/ListItem";
import CircleIcon from "@mui/icons-material/Circle";
import { Link, useLocation } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

const ListItem = styled(MuiListItem)(({ theme, open }) => ({
    "& .MuiListItemText-root": {
        color: theme.palette.grey[600],
    },
    "& .MuiSvgIcon-root": {
        fontSize: "6px",
        fill: theme.palette.grey[600],
    },
    "&:hover": {
        "& .MuiListItemText-root": {
            color: theme.palette.primary.main,
        },
        "& .MuiSvgIcon-root": {
            fill: theme.palette.primary.main,
        },
    },
    "& .MuiListItemButton-root.Mui-selected": {
        "& .MuiListItemText-root": {
            color: theme.palette.primary.main,
        },

        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
}));

const ListButton = styled(ListItemButton)(({ theme, open }) => ({
    height: '24px',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
        background: "transparent",
    },
    // padding: '4px 20px',
    // margin: '4px 0',
}));

const ListText = styled(ListItemText)(({ theme, open }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(0, 1),
    textDecoration: "none",
    lineHeight: "1rem",
}));

function SubHeader({ sub_item, open, handleListItemSelect, selectedSub, setSelectedIndex, index }) {
    const { pathname } = useLocation();

    const handleSubHeader = (item) => {
        handleListItemSelect(item.path);
        setSelectedIndex(index);
    };

    return (
        <Link to={sub_item.path} color="inherit" style={{ textDecoration: "none" }}>
            <ListItem dense disablePadding open={open}>
                <ListButton
                    open={open}
                    selected={selectedSub === sub_item?.path || pathname === sub_item?.path}
                    onClick={() => handleSubHeader(sub_item)}
                    disableRipple
                >
                    <CircleIcon />
                    <ListText primary={sub_item.text} open={open} />
                </ListButton>
            </ListItem>
        </Link>
    );
}

export default SubHeader;
