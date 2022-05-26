import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import MuiButton from "@mui/material/Button";
import { useDispatch } from "react-redux";

import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import React from "react";

import AddSanction from "../AddSanction";
import actions from "./../../store/actions";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const Button = styled(MuiButton)(({ theme }) => ({
    textTransform: "capitalize",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const Input = styled("input")({
    display: "none",
});

function Header() {
    const dispatch = useDispatch();

    const handleCsv = (e) => {
        console.log(e.target.files[0]);
        if (e.target.value) {
            dispatch(actions.import_sanction_list(e.target.files[0]));
        }
    };

    return (
        <HeaderWrapper>
            <Typography sx={{ fontSize: "22px" }}>Sanction Lists</Typography>
            <Box sx={{ display: "flex", direction: "row", columnGap: 1 }}>
                <label htmlFor="contained-button-file">
                    <Input
                        id="contained-button-file"
                        type="file"
                        onChange={handleCsv}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                    <Button
                        variant="outlined"
                        component="span"
                        startIcon={<SimCardDownloadOutlinedIcon />}
                    >
                        Import
                    </Button>
                </label>
                <AddSanction update={false} />
            </Box>
        </HeaderWrapper>
    );
}

export default Header;
