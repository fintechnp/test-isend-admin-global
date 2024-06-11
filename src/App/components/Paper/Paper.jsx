import { styled } from "@mui/material/styles";
import MuiPaper from '@mui/material/Paper'

const Paper = styled(MuiPaper)(({theme}) => ({
    boxShadow: "0px 8px 10px 0px #0000000F"
}))

export default Paper