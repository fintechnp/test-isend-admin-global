import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import app from "App/config/app";

const Container = styled("div")(({ theme }) => ({
  margin: "8px 0px",
  borderRadius: "6px",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.border.light}`,
  background: theme.palette.background.dark,
}));

export default function PageContent({
  children,
  title,
  documentTitle,
  topRightEndContent,
}) {
  useEffect(() => {
    const pageTitle = documentTitle ?? title;
    window.document.title = app.name + (pageTitle ? ` | ${pageTitle}` : "");
  }, []);

  return (
    <Container>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box>
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Box>{topRightEndContent}</Box>
      </Box>
      <Box>{children}</Box>
    </Container>
  );
}

PageContent.propTypes = {
  title: PropTypes.string,
  documentTitle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  topRightEndContent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};
