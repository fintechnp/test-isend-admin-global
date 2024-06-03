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
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import MainButton from "../List/components/MainButton";
import MainHeader from "../List/components/MainHeader";

import Toolbar from "./../Toolbar";
import range from "App/helpers/range";
import isEmpty from "App/helpers/isEmpty";
import useDrawerItems from "App/hooks/useDrawerItems";
import SearchTextField from "../Fields/SearchTextField";
import useDetectScreen from "App/hooks/useDetectScreen";

import ISendLogo from "../Logo/ISendLogo";

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
})(() => ({
    display: "flex",
    alignItems: "center",
    height: "56px",
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
    width: open ? "264px" : "60px",
    "& .no-search-result__container": {
        display: "block !important",
    },
    "& .MuiPaper-root": {
        padding: "0px",
    },
}));

const DrawerContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isDrawerOpen",
})(({ theme, isDrawerOpen }) => ({
    height: "100svh",
    margin: "8px",
    borderRadius: "16px",
    padding: isDrawerOpen ? "16px" : "8px",
    background: theme.palette.surface[1],
    minWidth: "60px",
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
            sx={{
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
                    <DrawerHeader>
                        <ISendLogo
                            onClick={handleDashboard}
                            {...(open
                                ? {
                                      variant: "default",
                                      color: "white",
                                  }
                                : { variant: "short", color: "white" })}
                        />
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
                                },
                            }}
                            onChange={(value) => handleFilter(value)}
                            debounceTime={0}
                            onClear={() => handleFilter("")}
                            onClick={() => setOpen(true)}
                        />
                    )}
                    {isLoading && renderSkeleton()}
                    {(() => {
                        if (isLoading) renderSkeleton();
                        if (!isLoading && filteredDrawerItems.length > 0) return drawerMenu;
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
