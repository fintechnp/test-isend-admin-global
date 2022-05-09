import * as React from "react";
import MuiListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";

const ListItem = styled(MuiListItem)(({ theme, open }) => ({
    flex: 1,
    margin: "3px 0px",
    background: theme.palette.primary.dark,
    "&:hover": {
        borderRadius: "6px",
        background: theme.palette.primary.main,
        "& .MuiListItemText-root": {
            color: theme.palette.primary.contrastText,
        },
    },
    "&:focus": {
        borderRadius: "6px",
        background: theme.palette.primary.contrastText,
        "& .MuiListItemText-root": {
            color: theme.palette.primary.dark,
        },
        "& .MuiListItemIcon-root": {
            color: theme.palette.primary.dark,
        },
    },
    "& .MuiListItemButton-root.Mui-selected": {
        borderRadius: "6px",
        background: theme.palette.primary.main,
        "& .MuiListItemText-root": {
            color: theme.palette.primary.contrastText,
        },
        "& .MuiListItemIcon-root": {
            color: theme.palette.primary.dark,
        },
        "&:hover": {
            opacity: 0.6,
            color: theme.palette.primary.contrastText,
            background: theme.palette.primary.dark,
        },
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
}));

const ListButton = styled(ListItemButton)(({ theme, open }) => ({
    padding: "6px 6px !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...(!open && {
        padding: "8px 8px !important",
    }),
}));

const ListText = styled(ListItemText)(({ theme, open }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(0, 1),
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
    ...(!open && {
        display: "none",
    }),
}));

function SubHeader({
    sub_item,
    open,
    handleListItemSelect,
    selectedSub,
    setSelectedIndex,
    index,
}) {
    const { pathname } = useLocation();

    const handleSubHeader = (item) => {
        handleListItemSelect(item.path);
        setSelectedIndex(index);
    };

    return (
        <Link
            to={sub_item.path}
            color="inherit"
            style={{ textDecoration: "none" }}
        >
            <ListItem dense disablePadding open={open}>
                <ListButton
                    open={open}
                    selected={
                        selectedSub === sub_item.path ||
                        pathname === sub_item.path
                    }
                    onClick={() => handleSubHeader(sub_item)}
                >
                    <ListText primary={sub_item.text} open={open} />
                </ListButton>
            </ListItem>
        </Link>
    );
}

export default SubHeader;
