import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: "100px",
  color: "#fff",
  borderRadius: "2px",
  background: theme.palette.warning.main,
  "&:hover": {
    background: theme.palette.warning.dark,
  },
}));

const CancelButton = React.forwardRef(({ children, ...rest }, ref) => (
  <StyledButton ref={ref} size="small" variant="contained" {...rest}>
    {children ?? "Cancel"}
  </StyledButton>
));

export default CancelButton;
