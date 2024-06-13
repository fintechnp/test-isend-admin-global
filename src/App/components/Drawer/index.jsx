import Box from "@mui/material/Box";
import React, { useState } from "react";
import MuiList from "@mui/material/List";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";

import MainButton from "../List/components/MainButton";
import MainHeader from "../List/components/MainHeader";

import Toolbar from "./../Toolbar";
import range from "App/helpers/range";
import isEmpty from "App/helpers/isEmpty";
import useDrawerItems from "App/hooks/useDrawerItems";
import SearchTextField from "../Fields/SearchTextField";
import useDetectScreen from "App/hooks/useDetectScreen";

import Row from "../Row/Row";
import ISendLogo from "../Logo/ISendLogo";
import HamburgerMenu from "./HamburgerMenu";
import layoutUtils from "App/utils/layoutUtils";

const drawerWidth = 280;

const List = styled(MuiList)(({ theme, open }) => ({}));

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
    alignItems: "center",
    height: "30px",
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer,
    boxShadow: "none",
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
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    // border: "1px solid red",
    "& .MuiDrawer-paper": {
        ...(open
            ? openedMixin(theme)
            : {
                  ...closedMixin(theme),
                  "& .search-menu__textfield": {
                      width: "46px",
                  },
              }),
        background: "transparent",
    },
    width: open ? drawerWidth : 80,
    "& .no-search-result__container": {
        display: "block !important",
    },
    "& .MuiPaper-root": {
        padding: "0px",
    },
    "& .SideBarItemContainer-root": {
        "&::-webkit-scrollbar-thumb": {
            background: "",
        },
    },
}));

const DrawerContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isDrawerOpen",
})(({ theme, isDrawerOpen }) => ({
    height: "calc(100svh - 16px)",
    margin: "8px",
    borderRadius: "16px",
    padding: isDrawerOpen ? "16px" : "8px",
    background: theme.palette.surface[1],
    minWidth: "60px",
    overflow: "hidden",
}));

const Footer = styled(Box)(({ theme }) => ({
    position: "fixed",
    display: "flex",
    justifyContent: "flex-end",
    bottom: 0,
    background: theme.palette.background.paper,
    padding: "16px 24px",
    flexGrow: 1,
    width: "fill-available",
    color: theme.palette.text.secondary,
    zIndex: "9px",
}));

const Content = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isDrawerOpen",
})(({ isDrawerOpen }) => ({
    flexGrow: 1,
    p: 3,
    position: "relative",
    maxWidth: `calc(100vw - ${isDrawerOpen ? 300 : 64}px)`,
    overflowY: "auto",
}));

function Drawer({ children }) {
    const { isDesktop } = useDetectScreen();

    const theme = useTheme();
    const navigate = useNavigate();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [open, setOpen] = React.useState(matches);

    const [menuSearchQuery, setMenuSearchQuery] = useState("");

    const { drawerItems, filteredDrawerItems, filterItems } = useDrawerItems(menuSearchQuery);

    const { loading: isLoading } = useSelector((state) => state.get_user_menus_and_permissions);

    const handleFilter = (searchQuery) => {
        setMenuSearchQuery(searchQuery);
        filterItems(searchQuery);
    };

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
        <Box
            className="SideBarItemContainer-root"
            sx={{
                height: "calc(100svh - 160px)",
                overflowY: "auto",
            }}
        >
            <List open={open}>
                {filteredDrawerItems.map((item, index) =>
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
            </List>
        </Box>
    );

    const renderSkeleton = () => {
        return (
            <Box display="flex" flexDirection="column" px={1} mt={1}>
                {range(1, 9).map((i) => (
                    <Skeleton key={i} height="50px" />
                ))}
            </Box>
        );
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" open={open}>
                <Box sx={{ flexGrow: 1 }}>
                    <Toolbar handleDrawerToggle={handleDrawerToggle} open={open} />
                </Box>
            </AppBar>
            <CustomizedDrawer variant="permanent" open={open} className="isend__sidebar">
                <DrawerContainer className="drawer-content__container" isDrawerOpen={open}>
                    <DrawerHeader sx={{ height: "56px" }}>
                        <Row width="100%" justifyContent={open ? "space-between" : "center"} alignItems="center">
                            {open && (
                                <Box flex={1}>
                                    <ISendLogo
                                        onClick={handleDashboard}
                                        {...(open
                                            ? {
                                                  variant: "default",
                                                  color: "white",
                                              }
                                            : { variant: "short", color: "white" })}
                                    />
                                </Box>
                            )}
                            <HamburgerMenu onClick={() => setOpen((value) => !value)} />
                        </Row>
                    </DrawerHeader>
                    <Divider />
                    {isDesktop && (
                        <SearchTextField
                            className="search-menu__textfield"
                            placeholder="Search Menu"
                            sx={{
                                "& .MuiInputBase-root": {
                                    background: (theme) => theme.palette.background.paper,
                                    marginTop: "8px",
                                    transition: (theme) =>
                                        theme.transitions.create("width", {
                                            easing: theme.transitions.easing.sharp,
                                            duration: theme.transitions.duration.leavingScreen,
                                        }),
                                },
                            }}
                            onChange={(value) => handleFilter(value)}
                            debounceTime={0}
                            onClear={() => handleFilter("")}
                            onClick={() => setOpen(true)}
                        />
                    )}
                    {(() => {
                        if (isLoading) renderSkeleton();
                        if (filteredDrawerItems.length > 0) return drawerMenu;
                        if (!isEmpty(menuSearchQuery) && filteredDrawerItems.length === 0)
                            return (
                                <Box className="no-search-result__container" px={2} mt={2}>
                                    <Typography color="white">No Results !</Typography>
                                </Box>
                            );
                        return renderSkeleton();
                    })()}
                </DrawerContainer>
            </CustomizedDrawer>
            <Content component="main">
                <DrawerHeader />
                <Box mb="30px">{children}</Box>
                <Footer className="Footer-root">
                    <div dangerouslySetInnerHTML={{ __html: layoutUtils.getCopyrightText() }}></div>
                </Footer>
            </Content>
        </Box>
    );
}

export default Drawer;
