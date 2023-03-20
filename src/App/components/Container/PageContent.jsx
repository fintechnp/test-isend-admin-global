import React, { useEffect } from "react";
import app from "App/config/app";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Spacer from "../Spacer/Spacer";

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
    shouldForwardProp: (prop) => prop !== "disableBorder",
})(({ theme, disableBorder }) => ({
    margin: "8px 0px",
    borderRadius: "6px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    ...(disableBorder
        ? {}
        : {
              padding: theme.spacing(2),
              border: `1px solid ${theme.palette.border.light}`,
          }),
    background: theme.palette.background.dark,
    maxWidth: `calc(100vw - ${280 + 65}px)`,
    overflowX: "auto",
}));

export default function PageContent({ children, title, documentTitle, topRightEndContent, disableBorder }) {
    useEffect(() => {
        const pageTitle = documentTitle ?? title;
        window.document.title = app.name + (pageTitle ? ` | ${pageTitle}` : "");
    }, []);

    return (
        <Container disableBorder={disableBorder}>
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
            <Spacer />
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
};

PageContent.defaultProps = {
    disableBorder: false,
};
