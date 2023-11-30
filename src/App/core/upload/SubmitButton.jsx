import React from "react";
import Box from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const SubmitButton = React.forwardRef(({ children, isLoading, isAddMode, ...rest }, ref) => {
    let text = "";
    if (isAddMode) text = isLoading ? "Saving" : "Save";
    else text = isLoading ? "Updating" : "Update";

    return (
        <MuiButton
            ref={ref}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isLoading}
            disableElevation
            {...rest}
        >
            <Box display="flex" alignItems="center" gap={1}>
                {children || text}
                {isLoading ? <CircularProgress color="inherit" size={10} /> : ""}
            </Box>
        </MuiButton>
    );
});

export default SubmitButton;
