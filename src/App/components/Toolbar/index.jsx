import * as React from "react";
import { useContext } from "react";
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
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";

import SearchBar from "./Search";
import { AuthContext } from "../../auth";

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
    border: `1px solid ${theme.palette.border.light}`,
    color:
      theme.palette.mode === "light"
        ? "rgba(205, 208, 213, 0.508)"
        : theme.palette.grey[300],
    background: theme.palette.background.dark,
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

const RightIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.appbar.icon,
}));

const Badge = styled(MuiBadge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 2,
    top: 2,
    fontSize: "11px",
    border: `2.5px solid ${theme.palette.appbar.main}`,
    color: theme.palette.appbar.main,
    backgroundColor: theme.palette.appbar.icon,
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
  color: theme.palette.text.main,
  textTransform: "capitalize",
}));

const RoleName = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.text.main,
  textTransform: "capitalize",
}));

const OpenIcon = styled(KeyboardArrowDownIcon)(({ theme }) => ({
  paddingLeft: "2px",
  fontSize: "22px",
  color: "#8F9198",
}));

export default function Appbar({ handleDrawerToggle, open }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hover, setHover] = React.useState(false);
  const mode = useSelector((state) => state.change_theme?.mode);

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

  const handleSearch = (e) => {};

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

  const stringAvatar = (name) => {
    const data = name
      .trim()
      .split(" ")
      .filter((v) => !!v)
      .map((v) => v.toString().trim().toUpperCase());

    let avatar = "";
    
    if (data.length === 1) avatar = name.substring(0, 2);

    else if (data.length > 2)
      avatar = data[0][0] + "" + data[data.length - 1][0];

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
      <MenuItem
        disableGutters
        disableRipple
        sx={{
          padding: "8px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "row",
          backgroundColor: "background.main",
          borderRadius: "4px",
        }}
      >
        <Avatar
          sx={{
            height: "72px",
            width: "72px",
            borderRadius: "6px",
            textTransform: "capitalize",
          }}
          variant="rounded"
          {...stringAvatar(currentUser?.name || "Admin")}
        />
        <Box sx={{ paddingLeft: 1.5, paddingRight: 0.5 }}>
          <ProfileName>{currentUser && currentUser?.name}</ProfileName>
          <RoleName>{currentUser && currentUser?.user_type}</RoleName>
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
            columnGap: "4px",
          }}
        >
          <SearchBar handleSearch={handleSearch} />
          <RightIconButton
            edge={false}
            size="small"
            disableRipple
            onClick={handleTheme}
          >
            {mode ? (
              <LightModeIcon fontSize="small" />
            ) : (
              <SettingsBrightnessIcon fontSize="small" />
            )}
          </RightIconButton>
          <RightIconButton
            edge="start"
            size="small"
            disableRipple
            onClick={() => navigate("/messages")}
          >
            <Badge badgeContent={4} color="error">
              <ChatBubbleOutlineIcon fontSize="medium" />
            </Badge>
          </RightIconButton>
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
                fontSize: "14px",
                textTransform: "capitalize",
              }}
              {...stringAvatar(currentUser?.name || "Admin")}
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
