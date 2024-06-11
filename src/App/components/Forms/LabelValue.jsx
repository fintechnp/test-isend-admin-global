import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function LabelValue({ label, value, ...rest }) {
    return (
        <Box display="flex" flexDirection="column" {...rest}>
            <Typography fontWeight={500}>{label}</Typography>
            <Typography color="grey.700">{value ?? "N/A"}</Typography>
        </Box>
    );
}

LabelValue.propTypes = {
    label: PropTypes.any,
    value: PropTypes.any,
};
