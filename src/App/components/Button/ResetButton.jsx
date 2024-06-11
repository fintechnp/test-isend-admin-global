import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ResetButton = React.forwardRef(({ children, sx, ...rest }, ref) => (
    <Button
        ref={ref}
        size="small"
        variant="outlined"
        disableElevation
        sx={{
            textTransform: "capitalize",
            ...sx,
        }}
        {...rest}
    >
        {children ?? "Reset"}
    </Button>
));

export default ResetButton;
