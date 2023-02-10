import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    background: theme.palette.primary.main,
    "&:hover": {
        background: theme.palette.primary.dark,
    },
    textTransform: "capitalize",
}));

const SubmitButton = React.forwardRef(({ isLoading, children, isAddMode, ...rest }, ref) => (
    <StyledButton
        ref={ref}
        type="submit"
        size="small"
        variant="contained"
        disabled={isLoading}
        disableElevation
        {...rest}
    >
        {children}
        {!children && (isAddMode ? (!isLoading ? "Submit" : "Submitting") : !isLoading ? "Update" : "Updating")}
    </StyledButton>
));

export default SubmitButton;

SubmitButton.propTypes = {
    isLoading: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf([PropTypes.node])]),
};
