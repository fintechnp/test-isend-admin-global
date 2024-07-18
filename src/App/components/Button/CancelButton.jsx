import React from "react";
import Button from "@mui/material/Button";

const CancelButton = React.forwardRef(({ children, sx, ...rest }, ref) => (
    <Button
        ref={ref}
        size="small"
        color="error"
        variant="contained"
        disableElevation
        sx={{
            textTransform: "capitalize",
            ...sx,
        }}
        {...rest}
    >
        {children ?? "Cancel"}
    </Button>
));

export default CancelButton;
