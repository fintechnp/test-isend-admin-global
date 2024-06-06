import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import app from "App/config/app";
import routePaths from "Private/config/routePaths";

const TitleContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& .MuiTypography-root": {
        color: theme.palette.primary.main,
        fontSize: "1.4rem",
    },
    gap: theme.spacing(1),
    "& .MuiSvgIcon-root": {
        fill: theme.palette.primary.main,
        fontSize: "1.4rem",
    },
}));

const Container = styled("div", {
    shouldForwardProp: (prop) => prop !== "disableBorder" && prop !== "disablePadding",
})(({ theme, disablePadding }) => ({
    margin: "8px 0px",
    borderRadius: "6px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    ...(disablePadding
        ? undefined
        : {
              padding: "24px",
          }),
    backgroundColor: theme.palette.background.primarySecond,
    overflowX: "auto",
}));

export default function PageContent(props) {
    const {
        children,
        title,
        documentTitle,
        topRightEndContent,
        disableBorder,
        breadcrumbs,
        disableBreadcrumb,
        disablePadding,
    } = props;

    useEffect(() => {
        const pageTitle = documentTitle ?? title;
        window.document.title = app.name + (pageTitle ? ` | ${pageTitle}` : "");
    }, []);

    return (
        <Container disableBorder={disableBorder} disablePadding={disablePadding}>
            {!disableBreadcrumb && breadcrumbs.length > 0 && (
                <Box>
                    <Breadcrumbs
                        separator="›"
                        aria-label="breadcrumb"
                        sx={{
                            p: (theme) => theme.spacing(1),
                        }}
                    >
                        <Link component={RouterLink} underline="hover" color="inherit" to={routePaths.dashboard.base}>
                            <HomeRoundedIcon />
                        </Link>
                        {breadcrumbs.map((breadcrumb, index) => {
                            if (isEmpty(breadcrumb?.link)) {
                                return (
                                    <Typography
                                        key={breadcrumb.label}
                                        color="text.primary"
                                        fontWeight={breadcrumbs.length === index + 1 ? 500 : 400}
                                    >
                                        {breadcrumb.label}
                                    </Typography>
                                );
                            }
                            return (
                                <Link
                                    key={breadcrumb.label}
                                    component={RouterLink}
                                    underline="hover"
                                    color="inherit"
                                    to={breadcrumb.link}
                                    sx={{
                                        fontWeight: breadcrumbs.length === index + 1 ? 500 : 400,
                                    }}
                                >
                                    {breadcrumb.label}
                                </Link>
                            );
                        })}
                    </Breadcrumbs>
                    <Divider />
                </Box>
            )}
            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <TitleContainer>
                    {Object.prototype.toString.call(title) === "[object String]" ? (
                        <Typography variant="h6" color="primary.main">
                            {title}
                        </Typography>
                    ) : (
                        title
                    )}
                </TitleContainer>
                <Box>{topRightEndContent}</Box>
            </Box>
            <Box>{children}</Box>
        </Container>
    );
}

PageContent.propTypes = {
    title: PropTypes.any,
    documentTitle: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    topRightEndContent: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    disableBorder: PropTypes.bool,
    breadcrumbs: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.node,
            label: PropTypes.string.isRequired,
            link: PropTypes.string,
        }),
    ),
    disableBreadcrumb: PropTypes.bool,
    disablePadding: PropTypes.bool,
    disableContentPadding: PropTypes.bool,
};

PageContent.defaultProps = {
    disableBorder: false,
    breadcrumbs: [],
    disableBreadcrumb: false,
    disablePadding: false,
    disableContentPadding: false,
};
