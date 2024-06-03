import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import MuiList from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import MuiListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import MuiExpandLess from "@mui/icons-material/ExpandLess";
import MuiExpandMore from "@mui/icons-material/ExpandMore";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import SubHeader from "./SubHeader";

const ListDropdownItem = styled(
    MuiListItem,
    {
        shou
    },
)(({ theme, isSearching }) => ({
    borderRadius: "4px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    margin: "8px 0px",
    "&:hover": {
        borderRadius: "4px",
    },
    "& .MuiListItemText-root": {
        color: theme.palette.common.white,
    },
    "& .MuiListItemButton-root.Mui-selected": {
        background: theme.palette.common.white,
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
            background: theme.palette.common.white,
        },
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
        svg: {
            fill: theme.palette.primary.main,
        },
    },
    ...(isSearching
        ? {
              background: theme.palette.common.white,
          }
        : undefined),
}));

const ListHeader = styled(ListItemButton)(({ theme, open }) => ({
    width: "100%",
    padding: "4px 8px !important",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: "4px",
    background: theme.palette.background.dark,
    "& .MuiSvgIcon-root": {
        color: theme.palette.text.main,
    },
    "& .MuiListItemText-root": {
        color: theme.palette.text.main,
    },
}));

const ListButton = styled(ListItemButton, {
    shouldForwardProp: (prop) => prop !== "isSearching",
})(({ theme, open, isSearching }) => ({
    width: "100%",
    display: "flex",
    height: "36px",
    ...(isSearching
        ? {
              backgroundColor: theme.palette.common.white,
          }
        : undefined),
    svg: {
        height: "20px",
        fill: theme.palette.background.paper,
    },
    padding: "9px 11px",
    "&:hover": {
        background: theme.palette.common.white,
        "& .MuiSvgIcon-root": {
            color: theme.palette.primary.main,
        },
        "& .MuiListItemText-root": {
            color: theme.palette.primary.main,
        },
        svg: {
            fill: theme.palette.primary.main,
        },
    },
}));

const ListIcon = styled(ListItemIcon)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

// dropdown children container
const List = styled(MuiList)(({ theme, isSearching }) => ({
    flex: 1,
    background: theme.palette.common.white,
    "& .MuiListItemText-root": {
        color: theme.palette.grey[600],
    },
}));

const StyledCollapse = styled(Collapse)(({ theme, open }) => ({
    width: "100%",
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
            background: theme.palette.surface[1],
            width: 260,
            border: `1px solid ${theme.palette.primary.dark}`,
        },
    }),
);

function MainButton({ item, open, selectedkey, handleListItemClick, index, setSelectedIndex, isSearching }) {
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
        <HtmlTooltip
            title={
                <React.Fragment>
                    <List>
                        <ListHeader disabled>
                            {typeof item.icon === "string" ? (
                                <div dangerouslySetInnerHTML={{ __html: item.icon }}></div>
                            ) : (
                                <ListIcon>{item.icon}</ListIcon>
                            )}
                            <ListText primary={item.text} open={!open} />
                        </ListHeader>
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
                </React.Fragment>
            }
            disableHoverListener={open}
            arrow
            placement="right"
        >
            <ListDropdownItem dense disablePadding open={open} isSearching={isSearching}>
                <ListButton
                    open={open || isSearching}
                    selected={selectedkey === item.key}
                    onClick={() => handleMainButton(item.key)}
                >
                    {typeof item.icon === "string" ? (
                        <Box className="IconContainer--root" dangerouslySetInnerHTML={{ __html: item.icon }}></Box>
                    ) : (
                        <ListIcon>{item.icon}</ListIcon>
                    )}
                    <ListText primary={item.text} open={open} />
                    {extend ? <ExpandLess open={open} /> : <ExpandMore open={open} />}
                </ListButton>
                <StyledCollapse open={open || isSearching} in={extend || isSearching} timeout="auto" unmountOnExit>
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
            </ListDropdownItem>
        </HtmlTooltip>
    );
}

export default MainButton;

MainButton.propTypes = {
    isSearching: PropTypes.bool,
};
