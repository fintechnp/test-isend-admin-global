import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const EllipsisTypography = styled(Typography)(({ theme }) => ({
    width: "100%",
    display: "block",
    color: "border.main",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

export default EllipsisTypography;
