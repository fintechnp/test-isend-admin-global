import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

import Row from "../Row/Row";
import Paper from "../Paper/Paper";

export default function PageContentContainer({ title, children, topRightContent }) {
    return (
        <Paper sx={{ p: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <Row alignItems="center" justifyContent="space-between">
                <Typography variant="h6">{title}</Typography>
                <Row gap="16px">{topRightContent}</Row>
            </Row>
            {children}
        </Paper>
    );
}

PageContentContainer.propTypes = {
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    topRightContent: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
