import * as React from "react";
import PropTypes from "prop-types";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";

import isEmpty from "App/helpers/isEmpty";

const SmallAvatar = styled(Avatar, {
    shouldForwardProp: (prop) => prop !== "disableCustomStyle",
})(({ theme, disableCustomStyle }) => ({
    border: `2px solid ${theme.palette.background.paper}`,
    ...(!disableCustomStyle
        ? {
              bottom: "40%",
          }
        : undefined),
}));

const SmallAvatarSkeleton = styled(Skeleton, {
    shouldForwardProp: (prop) => prop !== "disableCustomStyle",
})(({ theme, disableCustomStyle }) => ({
    border: `2px solid ${theme.palette.background.paper}`,
    ...!(disableCustomStyle
        ? {
              bottom: "40%",
          }
        : undefined),
}));

export default function BadgeAvatar({
    avatarUrl,
    altAvatarText,
    smallAvatarUrl,
    altSmallAvatarText,
    enableSkeleton = false,
    avatarDimension = 80,
    smallAvatarDimension = 24,
    avatarSx,
    smallAvatarSx,
    disableCustomStyle = false,
    TooltipProps,
}) {
    const getAltText = (value) => {
        if (isEmpty(value)) return "";
        const arr = value.toString().toUpperCase().trim().split(" ");
        if (arr.length === 1) return arr[0].toString().substring(0, 2);
        return arr[0].toString().charAt(0) + arr[arr.length - 1].toString().charAt(0);
    };

    const Wrapper = isEmpty(TooltipProps) ? "div" : Tooltip;

    return (
        <Wrapper
            {...(!isEmpty(TooltipProps) ? TooltipProps : undefined)}
            sx={{
                ...TooltipProps?.sx,
                "&:hover": {
                    cursor: "pointer",
                },
            }}
        >
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                    !enableSkeleton ? (
                        <SmallAvatar
                            src={smallAvatarUrl}
                            altSmallAvatarText={altSmallAvatarText}
                            sx={{
                                height: smallAvatarDimension,
                                width: smallAvatarDimension,
                                ...smallAvatarSx,
                                ...(smallAvatarDimension === 0
                                    ? {
                                          display: "none",
                                      }
                                    : undefined),
                            }}
                            disableCustomStyle={disableCustomStyle}
                        >
                            {altSmallAvatarText}
                        </SmallAvatar>
                    ) : (
                        <SmallAvatarSkeleton
                            variant="circular"
                            sx={{
                                height: smallAvatarDimension,
                                width: smallAvatarDimension,
                                ...(smallAvatarDimension === 0
                                    ? {
                                          display: "none",
                                      }
                                    : undefined),
                            }}
                            disableCustomStyle={disableCustomStyle}
                        />
                    )
                }
            >
                {!enableSkeleton ? (
                    <Avatar
                        sx={{
                            height: avatarDimension,
                            width: avatarDimension,
                            bgcolor: (theme) => theme.palette.primary.main,
                            fontWeight: 600,
                            ...avatarSx,
                            ...(avatarDimension === 0
                                ? {
                                      display: "none",
                                  }
                                : undefined),
                        }}
                        src={avatarUrl}
                        alt={altAvatarText}
                    >
                        {getAltText(altAvatarText)}
                    </Avatar>
                ) : (
                    <Skeleton
                        variant="circular"
                        sx={{
                            height: avatarDimension,
                            width: avatarDimension,
                            ...(avatarDimension === 0
                                ? {
                                      display: "none",
                                  }
                                : undefined),
                        }}
                    />
                )}
            </Badge>
        </Wrapper>
    );
}

BadgeAvatar.propTypes = {
    avatarUrl: PropTypes.string,
    altAvatarText: PropTypes.string,
    smallAvatarUrl: PropTypes.string,
    altSmallAvatarText: PropTypes.string,
    enableSkeleton: PropTypes.bool,
    avatarSx: PropTypes.object,
    badgeAvatarSx: PropTypes.object,
    disableCustomStyle: PropTypes.bool,
    TooltipProps: PropTypes.object,
};
