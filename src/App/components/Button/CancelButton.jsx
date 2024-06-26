import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
    //
}));

const CancelButton = React.forwardRef(({ children, sx, disabled, ...rest }, ref) => (
    <StyledButton ref={ref} size="small" color="error" variant="contained" disabled={disabled} {...rest}>
        {children ?? "Cancel"}
    </StyledButton>
));

export default CancelButton;
