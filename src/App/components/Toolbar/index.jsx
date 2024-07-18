import * as React from "react";
import Cookies from "js-cookie";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import MuiToolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";

import LogoutIcon from "../Icon/LogoutIcon";
import MyAccountIcon from "../Icon/MyAccountIcon";
import ChangePasswordIcon from "../Icon/ChangePasswordIcon";

import Greeting from "./Greeting";
import isEmpty from "App/helpers/isEmpty";
import { AuthContext } from "../../auth";
import { useConfirm } from "App/core/mui-confirm";

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
    minHeight: "56px",
    paddingLeft: "16px",
    paddingRight: "24px",
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
    const [imageError, setImageError] = React.useState(false);

    const { currentUser } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const confirm = useConfirm();

    const isMenuOpen = Boolean(anchorEl);

    const profilePicture = currentUser?.profile_picture;

    const showProfilePicture = isEmpty(profilePicture) || imageError;

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
            ?.trim()
            ?.split(" ")
            ?.filter((v) => !!v)
            ?.map((v) => v.toString().trim().toUpperCase());

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
                <Box className="GreetingContainer--root" ml={1}>
                    <Greeting />
                    <Typography color="text.secondary" fontSize="0.857rem">
                        {currentUser?.name}
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
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
                    {showProfilePicture ? (
                        <Avatar
                            variant="circular"
                            sx={{
                                height: "36px",
                                width: "36px",
                                fontSize: "14px",
                                textTransform: "capitalize",
                                background: (theme) => theme.palette.primary.main,
                            }}
                            {...stringAvatar(currentUser?.name)}
                        />
                    ) : (
                        <Avatar
                            variant="circular"
                            sx={{
                                height: "36px",
                                width: "36px",
                                fontSize: "14px",
                                textTransform: "capitalize",
                                background: (theme) => theme.palette.primary.main,
                            }}
                            src={profilePicture}
                            {...stringAvatar(currentUser?.name)}
                        />
                    )}
                </ProfileIcon>
            </Toolbar>
            {renderMenu}
        </>
    );
}
