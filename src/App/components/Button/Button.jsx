import React from "react";
import MuiButton from "@mui/material/Button";

const Button = React.forwardRef((props, ref) => (
  <MuiButton variant="outlined" color="primary" {...props} />
));

export default Button;
