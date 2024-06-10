import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

import actions from "Common/store/actions";
import { FormatDate, FormatDateTime } from "App/helpers";
import PageContent from "App/components/Container/PageContent";
import dateUtils from "App/utils/dateUtils";

const DetailWrapper = styled(Grid)(({ theme }) => ({
    padding: "8px 16px 16px 16px",
    width: "100%",
    minHeight: "200px",
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

const NameBox = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
}));

const NameField = styled(Box)(({ theme }) => ({
    flexGrow: 1,
}));

const TitleWrapper = styled(Box)(({ theme }) => ({
    opacity: 0.8,
    width: "100%",
    paddingBottom: "2px",
    paddingTop: "8px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
}));

const Title = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    paddingRight: 2,
    lineHeight: 1.4,
    fontSize: "16px",
    fontWeight: 600,
}));

const Label = styled(Typography)(({ theme }) => ({
    paddingRight: "3px",
    lineHeight: 1.5,
    fontSize: "15px",
    fontWeight: 500,
}));

const Value = styled(Typography)(({ value }) => ({
    opacity: 0.8,
    lineHeight: 1.5,
    fontSize: "15px",
    fontWeight: 400,
    textTransform: value === "Email" ? "lowercase" : "capitalize",
}));

const InfoWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
}));

const LabelWrapper = styled(Box)(({ theme }) => ({
    opacitLy: 0.9,
    minWidth: "40%",
    fontSize: "15px",
    wordBreak: "break-all",
}));

const ValueWrapper = styled(Box)(({ theme }) => ({
    opacitLy: 0.8,
    fontSize: "15px",
    wordBreak: "break-all",
    color: theme.palette.text.main,
}));

const StatusWrapper = styled(Box)(({ theme }) => ({
    opacitLy: 0.8,
    fontSize: "15px",
    wordBreak: "break-all",
    color: theme.palette.text.main,
    display: "flex",
    flexDirection: "row",
}));

const Fetching = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.main,
    fontSize: "16px",
    fontWeight: 400,
}));

function stringToColor(string = "Avatar") {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function stringAvatar(first = "A", last) {
    return {
        sx: {
            bgcolor: stringToColor(first),
            height: "50px",
            width: "50px",
            textTransform: "uppercase",
        },
        children: `${first.split(" ")[0][0]}${last ? last.split(" ")[0][0] : ""}`,
    };
}

const RenderField = ({ label, value }) => {
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
            }}
        >
            <Box sx={{ width: "40%" }}>
                <Label>{label}:</Label>
            </Box>
            <Box sx={{ width: "60%" }}>
                <Value value={label}>{value ? value : "N/A"}</Value>
            </Box>
        </Box>
    );
};

const RenderTopField = ({ label, value }) => {
    return (
        <Box
            sx={{
                marginLeft: 1,
                width: "100%",
                display: "flex",
                flexDirection: "row",
            }}
        >
            <Box sx={{ minWidth: "15%" }}>
                <Label sx={{ fontWeight: 600, opacity: 0.8, lineHeight: 1.4 }}>{label}:</Label>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Value>{value ? value : "N/A"}</Value>
            </Box>
        </Box>
    );
};

function MyAccount(props) {
    const dispatch = useDispatch();

    const { response: UserData, loading: l_loading, success } = useSelector((state) => state.get_user);

    useEffect(() => {
        dispatch(actions.get_user());
    }, [dispatch]);

    if (l_loading && !success) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                <Fetching>Fetching...</Fetching>
            </Box>
        );
    }

    return (
        <PageContent title="My Account">
            <DetailWrapper container>
                <Grid item xs={12}>
                    <Header>My Account</Header>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <NameBox>
                        <Box sx={{ p: 1.5 }}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                            >
                                <Avatar {...stringAvatar(UserData?.data?.first_name, UserData?.data?.last_name)} />
                            </Badge>
                        </Box>
                        <NameField>
                            <RenderTopField label="Name" value={UserData?.data?.name ? UserData?.data?.name : ""} />
                            <RenderTopField
                                label="Role"
                                value={UserData?.data?.user_type ? UserData?.data?.user_type : ""}
                            />
                        </NameField>
                    </NameBox>
                </Grid>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Title>My Information</Title>
                        <Divider sx={{ flexGrow: 1, ml: 1 }} />
                    </TitleWrapper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Firstname" value={UserData?.data?.first_name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Lastname" value={UserData?.data?.last_name} />
                </Grid>{" "}
                <Grid item xs={12} sm={6}>
                    <RenderField label="Email" value={UserData?.data?.email ? UserData?.data?.email : ""} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Phone Number" value={UserData?.data?.phone_number} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    {UserData?.data?.last_login_ts}
                    <RenderField
                        label="Last Login"
                        value={dateUtils.getLocalDateTimeFromUTC(UserData?.data?.last_login_ts)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    {UserData?.data?.created_ts}

                    <RenderField
                        label="Created At"
                        value={dateUtils.getLocalDateTimeFromUTC(UserData?.data?.created_ts)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InfoWrapper>
                        <LabelWrapper>Status:</LabelWrapper>
                        <ValueWrapper sx={{ wordBreak: "break-all" }}>
                            {UserData?.data?.is_active ? (
                                <Tooltip title="Active" arrow>
                                    <StatusWrapper>
                                        <CheckCircleOutlineIcon fontSize="small" sx={{ color: "success.main" }} />
                                        <Typography sx={{ paddingLeft: "8px" }}>Active</Typography>
                                    </StatusWrapper>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Inactive" arrow>
                                    <StatusWrapper>
                                        <DoNotDisturbOnIcon fontSize="small" sx={{ color: "warning.main" }} />
                                        <Typography sx={{ paddingLeft: "8px" }}>Inactive</Typography>
                                    </StatusWrapper>
                                </Tooltip>
                            )}
                        </ValueWrapper>
                    </InfoWrapper>
                </Grid>
            </DetailWrapper>
        </PageContent>
    );
}

export default MyAccount;
