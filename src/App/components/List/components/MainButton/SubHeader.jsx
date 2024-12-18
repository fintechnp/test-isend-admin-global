import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiListItem from "@mui/material/ListItem";
import CircleIcon from "@mui/icons-material/Circle";
import { Link, useLocation } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

const ListItem = styled(MuiListItem)(({ theme, open }) => ({
    // maxWidth: "220px",
    // overflow: 'auto',
    "& .MuiListItemText-root": {
        color: theme.palette.text.secondary,
    },
    "& .MuiSvgIcon-root": {
        fontSize: "6px",
        fill: theme.palette.text.secondary,
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
        // [theme.breakpoints.down("sm")]: {
        //     display: "none",
        // },
    },
}));

const ListButton = styled(ListItemButton)(({ theme, open }) => ({
    height: "28px",
    display: "flex",
    "&:hover": {
        background: "transparent",
    },
    padding: "8px 28px",
    margin: "4px 0",
}));

const ListText = styled(ListItemText)(({ theme, open, isSearching }) => ({
    padding: theme.spacing(0, 1),
    textDecoration: "none",
    lineHeight: "1rem",
}));

function SubHeader({
    sub_item,
    open,
    handleListItemSelect,
    selectedSub,
    setSelectedIndex,
    index,
    isSearching,
    setSelectedKey,
}) {
    const { pathname } = useLocation();

    const handleSubHeader = (item) => {
        handleListItemSelect(item.path);
        setSelectedIndex(index);
    };

    return (
        <Link to={sub_item.path} color="inherit" style={{ textDecoration: "none" }}>
            <ListItem
                dense
                disablePadding
                open={open}
                onClick={() => {
                    setSelectedKey("");
                }}
            >
                <ListButton
                    open={open}
                    selected={selectedSub === sub_item?.path || pathname === sub_item?.path}
                    onClick={() => handleSubHeader(sub_item)}
                    disableRipple
                >
                    <CircleIcon />
                    <ListText primary={sub_item.text} open={open} isSearching={isSearching} />
                </ListButton>
            </ListItem>
        </Link>
    );
}

export default SubHeader;
