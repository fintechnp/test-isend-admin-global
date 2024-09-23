import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import ListAltIcon from "@mui/icons-material/ListAlt";

import DocumentDownloadIcon from "App/components/Icon/DocumentDownloadIcon";

const StyledButton = styled(Button)(({ theme }) => ({
    background: theme.palette.surface.primarySecond,
    fontWeight: 600,
    "&:hover": {
        background: theme.palette.surface.primarySecond,
    },
}));

const ExportToExcel = ({ setDown, downloadData, handleClose, menu }) => {
    const fetchData = () => {
        setDown("xlsx");
        downloadData();
        handleClose();
    };

    return (
        <>
            {menu ? (
                <MenuItem onClick={fetchData} disableRipple>
                    <ListAltIcon />
                    XLSX
                </MenuItem>
            ) : (
                <StyledButton endIcon={<DocumentDownloadIcon />} onClick={fetchData}>
                    Excel
                </StyledButton>
            )}
        </>
    );
};

export default ExportToExcel;
