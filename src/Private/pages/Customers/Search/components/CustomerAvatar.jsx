import * as React from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));

export default function CustomerAvatar({ name, customerAvatarUrl, countryIso2Code }) {
    return (
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={<SmallAvatar src={`https://flagcdn.com/${countryIso2Code.toLowerCase()}.svg`} />}
        >
            <Avatar alt={name} src={customerAvatarUrl} />
        </Badge>
    );
}

CustomerAvatar.propTypes = {
    name: PropTypes.string.isRequired,
    customerAvatarUrl: PropTypes.string,
    countryIso2Code: PropTypes.string.isRequired,
};
