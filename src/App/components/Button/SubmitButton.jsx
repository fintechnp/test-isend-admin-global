import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const StyledButton = styled(Button)(({ theme }) => ({
    // minWidth: "100px",
    color: "#fff",
    // borderRadius: "2px",
    background: theme.palette.primary.main,
    "&:hover": {
        background: theme.palette.primary.dark,
    },
    textTransform: "capitalize",
    display: "flex",
    gap: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
}));

const SubmitButton = React.forwardRef(
    ({ isLoading, children, isAddMode, submitText, submittingText, ...rest }, ref) => (
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
            {!children && (isAddMode ? (!isLoading ? submitText : submittingText) : !isLoading ? "Update" : "Updating")}
            {isLoading ? <CircularProgress color="inherit" size={10} /> : ""}
        </StyledButton>
    ),
);

export default SubmitButton;

SubmitButton.propTypes = {
    isLoading: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf([PropTypes.node])]),
    isAddMode: PropTypes.bool,
    submitText: PropTypes.string,
    submittingText: PropTypes.string,
};

SubmitButton.defaultProps = {
    isAddMode: true,
    submitText: "Submit",
    submittingText: "Submitting",
};
