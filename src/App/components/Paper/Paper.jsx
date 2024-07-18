import { styled } from "@mui/material/styles";
import MuiPaper from "@mui/material/Paper";

const Paper = styled(MuiPaper, {
    shouldForwardProp: (prop) => prop !== "disablePadding",
})(({ theme, disabledPadding }) => ({
    boxShadow: "0px 8px 10px 0px #0000000F",
    borderRadius: "8px",
    ...(!disabledPadding
        ? {
              padding: "16px",
          }
        : undefined),
}));

export default Paper;
