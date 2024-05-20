import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";

const FilterButton = React.forwardRef(
    ({ isLoading, children, isAddMode, submitText, submittingText, isOpen, ...rest }, ref) => (
        <Button
            ref={ref}
            size="large"
            variant="outlined"
            disabled={isLoading}
            disableElevation
            startIcon={isOpen ? <FilterAltOffRoundedIcon /> : <FilterAltRoundedIcon />}
            {...rest}
        >
            Filter
        </Button>
    ),
);

export default FilterButton;

FilterButton.propTypes = {
    isLoading: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf([PropTypes.node])]),
    isOpen: PropTypes.bool,
};
