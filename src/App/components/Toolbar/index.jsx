import * as React from "react";
import Cookies from "js-cookie";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MuiBadge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import MuiToolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MuiMenuOpenIcon from "@mui/icons-material/MenuOpen";
import AccountBoxIcon from "@mui/icons-material/AccountBoxOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { AuthContext } from "../../auth";
import { useConfirm } from "App/core/mui-confirm";
import getGreeting from "App/helpers/getGreeting";
import MyAccountIcon from "../Icon/MyAccountIcon";
import ChangePasswordIcon from "../Icon/ChangePasswordIcon";
import LogoutIcon from "../Icon/LogoutIcon";

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
        overflow: "visible",
        marginTop: theme.spacing(1),
        minWidth: 220,
        border: `1px solid ${theme.palette.grey[200]}`,
        background: theme.palette.background.dark,
        boxShadow: "0px 8px 10px 0px #0000000F",
        "& .MuiMenuItem-root": {
            height: "36px",
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
            },
        },
    },
}));

const MenuIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.appbar.icon,
    [theme.breakpoints.down("md")]: {
        display: "none",
    },
}));

const MenuOpenIcon = styled(MuiMenuOpenIcon)(({ theme, open }) => ({
    "&:hover": {
        backgroundColor: "transparent",
        cursor: "default",
    },
    ...(!open && {
        transform: "rotate(-180deg)",
    }),
}));

const MenuCloseIcon = styled(MenuIcon)(({ theme }) => ({
    "&:hover": {
        backgroundColor: "transparent",
        cursor: "default",
    },
}));

const ProfileIcon = styled(IconButton)(({ theme }) => ({
    marginLeft: "8px",
    "&:hover": {
        backgroundColor: "transparent",
    },
}));

export default function Appbar({ handleDrawerToggle, open }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [hover, setHover] = React.useState(false);
    const mode = useSelector((state) => state.change_theme?.mode);

    const confirm = useConfirm();

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleTheme = () => {
        dispatch({ type: "SET_THEME", mode: !mode });
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
        confirm({
            description: "You want to logout.",
            confirmationText: "Logout",
        }).then(() => {
            setAnchorEl(null);
            Object.keys(Cookies.get()).forEach(function (cookie) {
                Cookies.remove(cookie);
            });
            localStorage.clear();
            window.location.reload();
        });
    };

    const stringAvatar = (name) => {
        const data = name
            .trim()
            .split(" ")
            .filter((v) => !!v)
            .map((v) => v.toString().trim().toUpperCase());

        let avatar = "";

        if (data.length === 1) avatar = name.substring(0, 2);
        else if (data.length > 2) avatar = data[0][0] + "" + data[data.length - 1][0];
        else avatar = data[0][0] + "" + data[1][0];

        return {
            children: avatar,
        };
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
            <MenuItem onClick={handleProfile} disableRipple>
                <MyAccountIcon />
                <Typography sx={{ color: "text.primary", ml: 1 }}>My Account</Typography>
            </MenuItem>
            <MenuItem onClick={handleSettings} disableRipple>
                <ChangePasswordIcon />
                <Typography sx={{ color: "text.primary", ml: 1 }}>Change Password</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout} disableRipple>
                <LogoutIcon />
                <Typography sx={{ color: "text.primary", ml: 1 }}>Log Out</Typography>
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
                <Box className="GreetingContainer--root" ml={1}>
                    <Typography color="text.primary" lineHeight="20px" fontWeight={600}>
                        {getGreeting()}
                    </Typography>
                    <Typography color="text.secondary" fontSize="0.857rem">
                        Admin Panel
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <ProfileIcon
                    size="small"
                    edge="end"
                    disableRipple
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <Avatar
                        sx={{
                            height: "36px",
                            width: "36px",
                            borderRadius: "50%",
                            fontSize: "14px",
                            textTransform: "capitalize",
                            background: (theme) => theme.palette.primary.main,
                        }}
                        {...stringAvatar(currentUser?.name)}
                    />
                    <Box
                        ml={1}
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Typography lineHeight="20px" color="text.primary">
                            Admin User
                        </Typography>
                        <Typography lineHeight="16px" color="text.secondary" fontSize="0.857rem">
                            Admin
                        </Typography>
                    </Box>
                </ProfileIcon>
            </Toolbar>
            {renderMenu}
        </>
    );
}
