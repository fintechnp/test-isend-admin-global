import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import React from "react";

import AddSanction from "../AddSanction";
import actions from "./../../store/actions";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const ImportButton = styled(LoadingButton)(({ theme }) => ({
    opacity: 0.8,
    textTransform: "capitalize",
    "&: hover": {
        color: theme.palette.border.dark,
        opacity: 1,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

const Input = styled("input")({
    display: "none",
});

function Header({ loading }) {
    const dispatch = useDispatch();

    const handleImport = (e) => {
        const formData = new FormData();
        if (e.target.files[0]) {
            formData.append("file", e.target.files[0]);
            dispatch(actions.import_sanction_list(formData));
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
                        onChange={handleImport}
                        onClick={(event) => {
                            event.target.value = null;
                        }}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                    <ImportButton
                        loading={loading}
                        variant="outlined"
                        color="primary"
                        component="span"
                        sx={{ minWidth: "3px" }}
                        startIcon={
                            <SimCardDownloadOutlinedIcon
                                sx={{
                                    fontSize: "20px",
                                    "&:hover": {
                                        background: "transparent",
                                    },
                                }}
                            />
                        }
                    >
                        Import
                    </ImportButton>
                </label>
                <AddSanction update={false} />
            </Box>
        </HeaderWrapper>
    );
}

export default Header;
