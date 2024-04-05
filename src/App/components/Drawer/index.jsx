import React, { useState } from "react";
import Box from "@mui/material/Box";
import MuiList from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import MainButton from "../List/components/MainButton";
import MainHeader from "../List/components/MainHeader";

import Toolbar from "./../Toolbar";
import isEmpty from "App/helpers/isEmpty";
import Logo from "../../../assets/isend_long.png";
import useDrawerItems from "App/hooks/useDrawerItems";
import Logo_short from "../../../assets/short-logo.svg";
import SearchTextField from "../Fields/SearchTextField";
import useDetectScreen from "App/hooks/useDetectScreen";

const drawerWidth = 280;

const List = styled(MuiList)(({ theme, open }) => ({
    ...(open && {
        padding: "8px",
    }),
    ...(!open && {
        margin: "0px",
    }),
}));

const openedMixin = (theme) => ({
    width: drawerWidth,
    background: theme.palette.primary.main,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    overflow: "visible",
    border: "none",
    "& .MuiBox-root": {
        display: "none",
    },
    "&:hover .MuiBox-root": {
        [theme.breakpoints.up("md")]: {
            display: "block",
        },
    },
    [theme.breakpoints.down("md")]: {
        width: theme.spacing(8),
    },
    [theme.breakpoints.down("sm")]: {
        padding: "0px",
        width: 0,
    },
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    overflow: "visible",
    width: 0,
    border: "none",
    "& .MuiBox-root": {
        display: "none",
    },
    "&:hover .MuiBox-root": {
        [theme.breakpoints.up("md")]: {
            display: "block",
        },
    },
    background: theme.palette.primary.main,
    [theme.breakpoints.up("sm")]: {
        padding: "8px",
        paddingTop: "0px",
        width: theme.spacing(8),
    },
});

const DrawerHeader = styled("div", {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: "48px",
}));

const LongLogoWrapper = styled(CardMedia)(({ theme }) => ({
    padding: "6px",
    maxHeight: "56px",
    width: "100%",
    objectFit: "contain",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const ShortLogoWrapper = styled(CardMedia)(({ theme }) => ({
    maxHeight: "56px",
    width: "100%",
    objectFit: "contain",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer,
    boxShadow: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    background: theme.palette.appbar.main,
    [theme.breakpoints.down("md")]: {
        marginLeft: `calc(${theme.spacing(8)} + 1px)`,
        width: `calc(100% - ${theme.spacing(8)})`,
    },
    [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
        width: `100%`,
    },
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    ...(!open && {
        [theme.breakpoints.up("sm")]: {
            marginLeft: `calc(${theme.spacing(8)} + 1px)`,
            width: `calc(100% - ${theme.spacing(8)})`,
        },
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const CustomizedDrawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
    "& .no-search-result__container": {
        display: "block !important",
    },
    "& .MuiPaper-root": {
        padding: "0px",
    },
}));

function Drawer({ children }) {
    const { isDesktop } = useDetectScreen();

    const theme = useTheme();
    const navigate = useNavigate();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [open, setOpen] = React.useState(matches);

    const [menuSearchQuery, setMenuSearchQuery] = useState("");

    const { drawerItems } = useDrawerItems(menuSearchQuery);

    React.useEffect(() => {
        setOpen(matches);
    }, [matches]);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleDashboard = () => {
        navigate("/");
    };

    const [selectedKey, setSelectedKey] = React.useState("");
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (key) => {
        setSelectedKey(key);
    };

    const drawerMenu = (
        <div
            style={{
                overflowY: "auto",
                ...(!open
                    ? {
                          padding: theme.spacing(0, 1),
                      }
                    : undefined),
            }}
        >
            <List open={open}>
                {drawerItems.map((item, index) =>
                    item.sub ? (
                        <MainButton
                            key={index}
                            open={open}
                            item={item}
                            index={index}
                            selectedIndex={selectedIndex}
                            selectedkey={selectedKey}
                            setSelectedIndex={setSelectedIndex}
                            handleListItemClick={handleListItemClick}
                            isSearching={!isEmpty(menuSearchQuery)}
                        />
                    ) : (
                        <MainHeader
                            key={index}
                            open={open}
                            item={item}
                            index={index}
                            selectedkey={selectedKey}
                            setSelectedIndex={setSelectedIndex}
                            handleListItemClick={handleListItemClick}
                        />
                    ),
                )}
                <Divider
                    sx={{
                        margin: "8px 0px",
                        borderColor: "#ffffff",
                        opacity: 0.25,
                    }}
                />
            </List>
        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" open={open}>
                <Box sx={{ flexGrow: 1 }}>
                    <Toolbar handleDrawerToggle={handleDrawerToggle} open={open} />
                </Box>
            </AppBar>
            <CustomizedDrawer variant="permanent" open={open} className="isend__sidebar">
                <DrawerHeader>
                    {open ? (
                        <LongLogoWrapper component="img" image={Logo} alt="isend logo" onClick={handleDashboard} />
                    ) : (
                        <ShortLogoWrapper
                            component="img"
                            image={Logo_short}
                            alt="isend logo"
                            onClick={handleDashboard}
                        />
                    )}
                </DrawerHeader>
                <Divider
                    sx={{
                        borderColor: "#ffffff",
                        opacity: 0.25,
                        margin: "0px",
                    }}
                />
                {isDesktop && (
                    <SearchTextField
                        placeholder="Search Menu"
                        sx={{
                            "& .MuiInputBase-root": {
                                background: (theme) => theme.palette.background.paper,
                                m: theme.spacing(1, 1, 0, 1),
                            },
                        }}
                        onChange={(value) => setMenuSearchQuery(value)}
                        debounceTime={0}
                        onClear={() => setMenuSearchQuery("")}
                        onClick={() => setOpen(true)}
                    />
                )}
                {drawerItems.length > 0 ? (
                    drawerMenu
                ) : (
                    <Box className="no-search-result__container" px={2} mt={2}>
                        <Typography color="white">No Results !</Typography>
                    </Box>
                )}
            </CustomizedDrawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    position: "relative",
                }}
            >
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}

export default Drawer;
