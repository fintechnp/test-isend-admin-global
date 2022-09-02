import React from "react";
import MenuItem from "@mui/material/MenuItem";
import ListAltIcon from "@mui/icons-material/ListAlt";

const ExportToExcel = ({ setDown, downloadData, handleClose }) => {
    const fetchData = () => {
        setDown("xlsx");
        downloadData();
        handleClose();
    };

    return (
        <MenuItem onClick={fetchData} disableRipple>
            <ListAltIcon />
            XLSX
        </MenuItem>
    );
};

export default ExportToExcel;
