import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useNavigate } from "react-router-dom";

import Toolbar from "./../Toolbar";
import DrawerList from "../List";
import Logo from "../../../assets/long-logo.svg";
import Logo_short from "../../../assets/short-logo.svg";

const drawerWidth = 280;

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
    // necessary for content to be below app bar
}));

const LogoWrapper = styled(CardMedia)(({ theme }) => ({
    maxHeight: "40px",
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
    background: theme.palette.primary.contrastText,
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

const Drawer = styled(MuiDrawer, {
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
}));

function SideDrawer({ children, menus }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [open, setOpen] = React.useState(matches);

    React.useEffect(() => {
        setOpen(matches);
    }, [matches]);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleDashboard = () => {
        navigate("/");
    };

    const drawerMenu = (
        <div style={{ overflowY: "auto" }}>
            <DrawerList items={menus()} open={open} />
        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" open={open}>
                <Box sx={{ flexGrow: 1 }}>
                    <Toolbar
                        handleDrawerToggle={handleDrawerToggle}
                        open={open}
                    />
                </Box>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <LogoWrapper
                        component="img"
                        image={open ? Logo : Logo_short}
                        alt="isend logo"
                        onClick={handleDashboard}
                    />
                </DrawerHeader>
                <Divider
                    sx={{
                        borderColor: "#ffffff",
                        opacity: 0.25,
                        margin: "0px -8px",
                    }}
                />
                {drawerMenu}
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, position: "relative" }}
            >
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}

export default SideDrawer;
