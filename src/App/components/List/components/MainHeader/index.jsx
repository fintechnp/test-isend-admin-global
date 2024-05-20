import * as React from "react";
import MuiListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const ListItem = styled(MuiListItem)(({ theme, open }) => ({
    flex: 1,
    "&:hover": {
        borderRadius: "6px",
        background: theme.palette.background.main,
        "& .MuiListItemText-root": {
            color: theme.palette.primary.dark,
        },
        "& .MuiListItemIcon-root": {
            color: theme.palette.primary.dark,
        },
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
    "& .MuiListItemButton-root.Mui-selected": {
        borderRadius: "6px",
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
        svg: {
            fill: theme.palette.primary.dark,
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
    color: theme.palette.primary.contrastText,
    ...(!open && {
        display: "none",
    }),
}));

const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
    ({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: theme.palette.common.white,
            "&::before": {
                background: theme.palette.primary.main,
                border: `1px solid ${theme.palette.primary.dark}`,
            },
        },
        [`& .${tooltipClasses.tooltip}`]: {
            padding: "8px",
            background: theme.palette.primary.main,
            width: 250,
            fontSize: "16px",
            border: `1px solid ${theme.palette.primary.dark}`,
        },
    }),
);

function MainHeader({ item, index, open, handleListItemClick, selectedkey, setSelectedIndex }) {
    const { pathname } = useLocation();

    const handleMainHeader = (item) => {
        handleListItemClick(item.key);
        setSelectedIndex(index);
    };

    return (
        <Link to={item.path} color="inherit" style={{ textDecoration: "none" }}>
            <HtmlTooltip title={item.text} disableHoverListener={open} arrow placement="right">
                <ListItem dense disablePadding open={open}>
                    <ListButton
                        open={open}
                        selected={selectedkey === item.key || pathname === item?.path}
                        onClick={() => handleMainHeader(item)}
                        sx={{
                            svg: {
                                fill: (theme) => theme.palette.background.paper,
                            },
                            "&:hover": {
                                svg: {
                                    fill: (theme) => theme.palette.primary.dark,
                                },
                            },
                        }}
                    >
                        {typeof item.icon === "string" ? (
                            <div dangerouslySetInnerHTML={{ __html: item.icon }}></div>
                        ) : (
                            <ListIcon>{item.icon}</ListIcon>
                        )}
                        <ListText primary={item.text} open={open} />
                    </ListButton>
                </ListItem>
            </HtmlTooltip>
        </Link>
    );
}

export default MainHeader;
