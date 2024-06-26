import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Row from "../Row/Row";

export default function FormGroupContainer({ title, children, actions }) {
    return (
        <Box
            sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: "6px",
            }}
        >
            <Row p="16px" justifyContent="center" alignItems="center" gap={2}>
                <Box>
                    {typeof title === "string" ? (
                        <Typography variant="subtitle1" fontWeight={600}>
                            {title}
                        </Typography>
                    ) : (
                        title
                    )}
                </Box>
                <Box flex={1}>{actions}</Box>
            </Row>
            <Divider />
            <Box p="16px">{children}</Box>
        </Box>
    );
}

FormGroupContainer.propTypes = {
    title: PropTypes.node,
    actions: PropTypes.node,
};
