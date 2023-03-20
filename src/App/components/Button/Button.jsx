import React from "react";
import MuiButton from "@mui/material/Button";

const Button = React.forwardRef(({ sx, ...rest }, ref) => (
    <MuiButton
        ref={ref}
        variant="outlined"
        color="primary"
        sx={{
            textTransform: "capitalize",
            ...sx,
        }}
        {...rest}
    />
));

export default Button;
