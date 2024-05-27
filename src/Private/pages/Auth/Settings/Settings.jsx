import React from "react";
import { Helmet } from "react-helmet-async";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";

import ChangePassword from "./components/ChangePassword";
import SwitchBoxSettings from "./components/SwitchBoxSettings";

const SettingWrapper = styled(Grid)(({ theme }) => ({
    padding: "8px 16px 16px 16px",
    width: "100%",
    borderRadius: "6px",
    background: theme.palette.background.light,
}));

const Header = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    lineHeight: 1.5,
    fontSize: "20px",
    fontWeight: 600,
    padding: "4px 0px",
}));

function Settings(props) {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.change_theme?.mode);

    const handleTheme = (event) => {
        dispatch({ type: "SET_THEME", mode: !mode });
    };

    const handleChat = (event) => {
        // setChecked(event.target.checked);
    };

    const handleMessage = (event) => {
        // setChecked(event.target.checked);
    };

    return (
        <>
            <Helmet>
                <title>{import.meta.env.REACT_APP_NAME} | {props.title}</title>
            </Helmet>
            <SettingWrapper rowGap={1} container>
                <Grid item xs={12}>
                    <Header>Settings</Header>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <SwitchBoxSettings
                        checked={!mode}
                        title="Change Theme"
                        description="Swtich between light and dark theme."
                        handleChange={handleTheme}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SwitchBoxSettings
                        // checked={false}
                        title="Show chat notifications"
                        description="To prevent chat notifications in desktop, turn off Chat notifications."
                        handleChange={handleChat}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SwitchBoxSettings
                        // checked={false}
                        title="On/Off Messages"
                        description="Recieve messages from customer."
                        handleChange={handleMessage}
                    />
                </Grid>
            </SettingWrapper>
            <SettingWrapper rowGap={1} container mt={2}>
                <Grid item xs={12}>
                    <Header>Change Password</Header>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <ChangePassword />
                </Grid>
            </SettingWrapper>
        </>
    );
}

export default Settings;
