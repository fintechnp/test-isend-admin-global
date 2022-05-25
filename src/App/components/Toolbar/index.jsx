import * as React from "react";
import Cookies from "js-cookie";
import { styled, alpha } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import MuiToolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MuiBadge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import MuiMenuOpenIcon from "@mui/icons-material/MenuOpen";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountBoxIcon from "@mui/icons-material/AccountBoxOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/styles";

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
    minHeight: "56px",
    paddingLeft: "16px",
    paddingRight: "8px",
    [theme.breakpoints.down("sm")]: {
        paddingRight: "16px",
    },
}));

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    marginTop: "36px",
    "& .MuiPaper-root": {
        padding: 8,
        borderRadius: 4,
        overflow: "visible",
        marginTop: theme.spacing(1),
        minWidth: 220,
        color:
            theme.palette.mode === "light"
                ? "rgba(205, 208, 213, 0.508)"
                : theme.palette.grey[300],
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

const MenuIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.primary.dark,
    [theme.breakpoints.down("md")]: {
        display: "none",
    },
}));

const MenuOpenIcon = styled(MuiMenuOpenIcon)(({ theme, open }) => ({
    color: theme.palette.primary.dark,
    "&:hover": {
        backgroundColor: "transparent",
        cursor: "default",
    },
    ...(!open && {
        transform: "rotate(-180deg)",
    }),
}));

const MenuCloseIcon = styled(MenuIcon)(({ theme }) => ({
    color: theme.palette.primary.dark,
    "&:hover": {
        backgroundColor: "transparent",
        cursor: "default",
    },
}));

const Badge = styled(MuiBadge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: 1,
        top: 1,
        fontSize: "11px",
        border: `2.5px solid ${theme.palette.primary.contrastText}`,
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.dark,
        padding: 0,
    },
}));

const ProfileIcon = styled(IconButton)(({ theme }) => ({
    marginLeft: "8px",
    "&:hover": {
        backgroundColor: "transparent",
    },
}));

const ProfileName = styled(Typography)(({ theme }) => ({
    textAlign: "left",
    fontSize: "16px",
    color: theme.palette.text.dark,
}));

const ProfileId = styled(Typography)(({ theme }) => ({
    fontSize: "12px",
    color: theme.palette.text.main,
}));

const OpenIcon = styled(KeyboardArrowDownIcon)(({ theme }) => ({
    paddingLeft: "2px",
    fontSize: "22px",
    color: "#8F9198",
}));

export default function Appbar({ handleDrawerToggle, open }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [hover, setHover] = React.useState(false);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        setAnchorEl(null);
        navigate("/account");
    };

    const handleSettings = () => {
        setAnchorEl(null);
        navigate("/settings");
    };

    const handleLogout = () => {
        setAnchorEl(null);
        Object.keys(Cookies.get()).forEach(function (cookie) {
            Cookies.remove(cookie);
        });
        localStorage.clear();
        window.location.reload();
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <StyledMenu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            PaperProps={{
                elevation: 0,
                sx: {
                    "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                        borderLeft: `1px solid ${theme.palette.border.light}`,
                        borderTop: `1px solid ${theme.palette.border.light}`,
                    },
                },
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem
                disableGutters
                disableRipple
                sx={{
                    padding: "8px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "row",
                    backgroundColor: "background.light",
                    borderRadius: "4px",
                }}
            >
                <Avatar
                    sx={{
                        height: "72px",
                        width: "72px",
                        borderRadius: "6px",
                    }}
                    variant="rounded"
                    alt="Remy Sharp"
                    src="https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59095205-stock-illustration-businessman-profile-icon.jpg"
                />
                <Box sx={{ paddingLeft: 2 }}>
                    <ProfileName>Milan Korangi</ProfileName>
                    <ProfileId>Admin</ProfileId>
                </Box>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleProfile} disableRipple>
                <AccountBoxIcon />
                <Typography sx={{ color: "text.main" }}>My Account</Typography>
            </MenuItem>
            <MenuItem onClick={handleSettings} disableRipple>
                <SettingsOutlinedIcon />
                <Typography sx={{ color: "text.main" }}>Settings</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout} disableRipple>
                <ExitToAppIcon />
                <Typography sx={{ color: "text.main" }}>Log Out</Typography>
            </MenuItem>
        </StyledMenu>
    );

    return (
        <>
            <Toolbar disableGutters variant="dense">
                <MenuIconButton
                    size="medium"
                    edge="start"
                    disableRipple
                    aria-label="open drawer"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={handleDrawerToggle}
                >
                    {hover && <MenuOpenIcon open={open} />}
                    {!hover && <MenuCloseIcon />}
                </MenuIconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Box
                    sx={{
                        display: { xs: "none", sm: "flex" },
                        color: "primary.dark",
                    }}
                >
                    <IconButton
                        edge="false"
                        size="small"
                        disableRipple
                        color="inherit"
                    >
                        <LightModeIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        edge="start"
                        size="small"
                        disableRipple
                        color="inherit"
                    >
                        <Badge badgeContent={4} color="error">
                            <ChatBubbleOutlineIcon fontSize="small" />
                        </Badge>
                    </IconButton>
                    <ProfileIcon
                        size="small"
                        edge="end"
                        disableRipple
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <Avatar
                            sx={{
                                height: "36px",
                                width: "36px",
                                borderRadius: "6px",
                            }}
                            variant="rounded"
                            alt="Remy Sharp"
                            src="https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59095205-stock-illustration-businessman-profile-icon.jpg"
                        />
                        <OpenIcon />
                    </ProfileIcon>
                </Box>
                <Box
                    sx={{
                        display: { xs: "flex", sm: "none" },
                        color: "primary.dark",
                    }}
                >
                    <ProfileIcon
                        size="medium"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                    >
                        <Avatar
                            sx={{
                                height: "36px",
                                width: "36px",
                                borderRadius: "6px",
                                color: "primary.main",
                                backgroundColor: "#fff",
                                border: `1px solid #1761AE`,
                            }}
                            variant="rounded"
                        >
                            <MenuIcon />
                        </Avatar>
                    </ProfileIcon>
                </Box>
            </Toolbar>
            {renderMenu}
        </>
    );
}
