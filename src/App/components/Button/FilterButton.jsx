import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const FilterButton = React.forwardRef(
    ({ isLoading, children, isAddMode, submitText, submittingText, isOpen, ...rest }, ref) => (
        <Button
            ref={ref}
            size="large"
            variant="contained"
            disabled={isLoading}
            disableElevation
            startIcon={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.6667 4.8335H10.6667C10.3934 4.8335 10.1667 4.60683 10.1667 4.3335C10.1667 4.06016 10.3934 3.8335 10.6667 3.8335H14.6667C14.9401 3.8335 15.1667 4.06016 15.1667 4.3335C15.1667 4.60683 14.9401 4.8335 14.6667 4.8335Z"
                        fill="white"
                    />
                    <path
                        d="M3.99992 4.8335H1.33325C1.05992 4.8335 0.833252 4.60683 0.833252 4.3335C0.833252 4.06016 1.05992 3.8335 1.33325 3.8335H3.99992C4.27325 3.8335 4.49992 4.06016 4.49992 4.3335C4.49992 4.60683 4.27325 4.8335 3.99992 4.8335Z"
                        fill="white"
                    />
                    <path
                        d="M6.66659 7.16667C5.10659 7.16667 3.83325 5.89333 3.83325 4.33333C3.83325 2.77333 5.10659 1.5 6.66659 1.5C8.22659 1.5 9.49992 2.77333 9.49992 4.33333C9.49992 5.89333 8.22659 7.16667 6.66659 7.16667ZM6.66659 2.5C5.65325 2.5 4.83325 3.32 4.83325 4.33333C4.83325 5.34667 5.65325 6.16667 6.66659 6.16667C7.67992 6.16667 8.49992 5.34667 8.49992 4.33333C8.49992 3.32 7.67992 2.5 6.66659 2.5Z"
                        fill="white"
                    />
                    <path
                        d="M14.6667 12.1665H12C11.7267 12.1665 11.5 11.9398 11.5 11.6665C11.5 11.3932 11.7267 11.1665 12 11.1665H14.6667C14.94 11.1665 15.1667 11.3932 15.1667 11.6665C15.1667 11.9398 14.94 12.1665 14.6667 12.1665Z"
                        fill="white"
                    />
                    <path
                        d="M5.33325 12.1665H1.33325C1.05992 12.1665 0.833252 11.9398 0.833252 11.6665C0.833252 11.3932 1.05992 11.1665 1.33325 11.1665H5.33325C5.60659 11.1665 5.83325 11.3932 5.83325 11.6665C5.83325 11.9398 5.60659 12.1665 5.33325 12.1665Z"
                        fill="white"
                    />
                    <path
                        d="M9.33333 14.5002C7.77333 14.5002 6.5 13.2268 6.5 11.6668C6.5 10.1068 7.77333 8.8335 9.33333 8.8335C10.8933 8.8335 12.1667 10.1068 12.1667 11.6668C12.1667 13.2268 10.8933 14.5002 9.33333 14.5002ZM9.33333 9.8335C8.32 9.8335 7.5 10.6535 7.5 11.6668C7.5 12.6802 8.32 13.5002 9.33333 13.5002C10.3467 13.5002 11.1667 12.6802 11.1667 11.6668C11.1667 10.6535 10.3467 9.8335 9.33333 9.8335Z"
                        fill="white"
                    />
                </svg>
            }
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
