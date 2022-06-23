import * as React from "react";
import MuiList from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import MuiExpandLess from "@mui/icons-material/ExpandLess";
import MuiExpandMore from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { useLocation } from "react-router-dom";

import SubHeader from "./SubHeader";

const ListItem = styled(MuiListItem)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    margin: "4px 0px",
    background: theme.palette.primary.main,
    "&:hover": {
        borderRadius: "6px",
    },
    "&:focus": {
        borderRadius: "6px",
        background: theme.palette.background.main,
        "& .MuiListItemText-root": {
            color: theme.palette.primary.dark,
        },
        "& .MuiListItemIcon-root": {
            color: theme.palette.primary.dark,
        },
    },
    "& .MuiSvgIcon-root": {
        color: theme.palette.primary.contrastText,
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    "& .MuiListItemText-root": {
        color: theme.palette.primary.contrastText,
    },
    "& .MuiListItemButton-root.Mui-selected": {
        borderRadius: "6px",
        color: theme.palette.primary.dark,
        background: theme.palette.primary.contrastText,
        "& .MuiListItemText-root": {
            color: theme.palette.primary.dark,
        },
        "& .MuiListItemIcon-root": {
            color: theme.palette.primary.dark,
        },
        "& .MuiSvgIcon-root": {
            color: theme.palette.primary.dark,
        },
        "&:hover": {
            color: theme.palette.primary.dark,
            background: theme.palette.background.dark,
        },
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
}));

const ListButton = styled(ListItemButton)(({ theme, open }) => ({
    width: "100%",
    padding: "6px 8px !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...(!open && {
        padding: "8px 8px !important",
    }),
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

const ListIcon = styled(ListItemIcon)(({ theme }) => ({
    minWidth: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.primary.contrastText,
    "& .MuiSvgIcon-root": {
        fontSize: "22px",
    },
    [theme.breakpoints.down("sm")]: {
        display: "none",
    },
}));

const ListText = styled(ListItemText)(({ theme, open }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(0, 1),
    textDecoration: "none",
    ...(!open && {
        display: "none",
    }),
    "&:hover": {
        color: theme.palette.primary.dark,
    },
}));

const ExpandMore = styled(MuiExpandMore)(({ open }) => ({
    ...(open && {
        display: "block",
    }),
    ...(!open && {
        display: "none",
    }),
}));

const ExpandLess = styled(MuiExpandLess)(({ open }) => ({
    ...(open && {
        display: "block",
    }),
    ...(!open && {
        display: "none",
    }),
}));

const List = styled(MuiList)(({ theme, open }) => ({
    flex: 1,
    padding: "8px",
    margin: "8px 0px",
    borderRadius: "4px",
    background: theme.palette.primary.dark,
    "&:hover": {
        background: theme.palette.primary.dark,
    },
}));

const StyledCollapse = styled(Collapse)(({ theme, open }) => ({
    width: "100%",
    ...(!open && {
        display: "none",
    }),
}));

function MainButton({
    item,
    open,
    selectedkey,
    handleListItemClick,
    index,
    setSelectedIndex,
}) {
    const { pathname } = useLocation();
    const [extend, setExtend] = React.useState(false);
    const [select, setSelect] = React.useState(false);
    const [selectedSub, setSelectedSub] = React.useState("");

    React.useEffect(() => {
        if (selectedkey !== item.key) {
            setExtend(false);
        }
    }, [selectedkey]);

    const handleMainButton = (index) => {
        setExtend(!extend);
        setSelect(!select);
        handleListItemClick(index);
        if (pathname !== selectedSub) {
            setSelectedSub("");
        }
    };

    const handleListItemSelect = (path) => {
        setSelectedSub(path);
    };

    return (
        <Tooltip
            title={item.text}
            disableHoverListener={open}
            arrow
            placement="right"
        >
            <ListItem dense disablePadding open={open}>
                <ListButton
                    open={open}
                    selected={
                        selectedkey === item.key
                    }
                    onClick={() => handleMainButton(item.key)}
                >
                    <ListIcon>{item.icon}</ListIcon>
                    <ListText primary={item.text} open={open} />
                    {extend ? (
                        <ExpandLess open={open} />
                    ) : (
                        <ExpandMore open={open} />
                    )}
                </ListButton>
                <StyledCollapse
                    open={open}
                    in={extend}
                    timeout="auto"
                    unmountOnExit
                >
                    <List>
                        {item?.children.map((child, ind) => (
                            <SubHeader
                                key={ind}
                                index={index}
                                sub_item={child}
                                open={open}
                                selectedSub={selectedSub}
                                setSelectedIndex={setSelectedIndex}
                                handleListItemSelect={handleListItemSelect}
                            />
                        ))}
                    </List>
                </StyledCollapse>
            </ListItem>
        </Tooltip>
    );
}

export default MainButton;
