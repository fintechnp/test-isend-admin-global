import * as React from "react";
import MuiListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import MuiList from "@mui/material/List";
import { useLocation, Link } from "react-router-dom";

const List = styled(MuiList)(({ theme }) => ({
    padding: "8px",
    width: "100%",
    margin: "4px 0px",
    background: theme.palette.primary.main,
}));

const ListItem = styled(MuiListItem)(({ theme, open }) => ({
    display: "flex",
    flexDirection: "column",
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.dark,
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
        borderTop: `1px solid ${theme.palette.primary.dark}`,
        background: theme.palette.primary.contrastText,
        "& .MuiListItemText-root": {
            color: theme.palette.primary.dark,
        },
        "& .MuiListItemIcon-root": {
            color: theme.palette.primary.dark,
        },
        "&:hover": {
            opacity: 0.7,
            background: theme.palette.primary.contrastText,
        },
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
}));

const ListButton = styled(ListItemButton)(({ theme, open }) => ({
    flex: 1,
    width: "100%",
    borderRadius: "6px",
    padding: "6px 8px !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
        borderRadius: "6px",
        background: theme.palette.background.dark,
        "& .MuiListItemText-root": {
            color: theme.palette.primary.dark,
        },
        "& .MuiSvgIcon-root": {
            color: theme.palette.primary.dark,
        },
    },
}));

const SubListButton = styled(ListItemButton)(({ theme }) => ({
    width: "100%",
    padding: "3px 8px !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
        borderRadius: "6px",
        color: theme.palette.primary.dark,
        background: theme.palette.background.dark,
        "& .MuiSvgIcon-root": {
            color: theme.palette.primary.dark,
        },
        "& .MuiListItemText-root": {
            color: theme.palette.primary.dark,
        },
    },
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

const SubListText = styled(ListItemText)(({ theme, open }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
}));

function SubButton({
    sub_item,
    open,
    handleListItemSelect,
    selectedSub,
    setSelectedIndex,
    index,
}) {
    const { pathname } = useLocation();
    const [extend, setExtend] = React.useState(false);
    const [selectedLast, setSelectedLast] = React.useState("");

    const handleClick = (item) => {
        setExtend(!extend);
        handleListItemSelect(item.key);
        if (pathname !== selectedLast) {
            setSelectedLast("");
        }
    };

    const handleLastButton = (item) => {
        setSelectedLast(item.path);
        setSelectedIndex(index);
    };

    return (
        <ListItem dense disablePadding open={open}>
            <ListButton
                open={open}
                selected={selectedSub === sub_item.key}
                onClick={() => handleClick(sub_item)}
            >
                <ListText primary={sub_item.text} open={open} />
                {extend ? <ExpandLess /> : <ExpandMore />}
            </ListButton>
            <Collapse
                in={extend}
                timeout="auto"
                unmountOnExit
                sx={{ width: "100%" }}
            >
                <List disablePadding open={open}>
                    {sub_item?.children.map((item, index) => (
                        <Link
                            to={item.path}
                            color="inherit"
                            style={{ textDecoration: "none" }}
                        >
                            <SubListButton
                                key={index}
                                selected={
                                    selectedLast === item.path ||
                                    pathname === item.path
                                }
                                onClick={() => handleLastButton(item)}
                            >
                                <SubListText primary={item.text} />
                            </SubListButton>
                        </Link>
                    ))}
                </List>
            </Collapse>
        </ListItem>
    );
}

export default SubButton;
