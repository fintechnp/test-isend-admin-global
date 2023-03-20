import React from "react";
import MenuItem from "@mui/material/MenuItem";
import DataObjectIcon from "@mui/icons-material/DataObject";

const ExportToCsv = ({ setDown, downloadData, handleClose }) => {
    const fetchData = () => {
        setDown("csv");
        downloadData();
        handleClose();
    };

    return (
        <MenuItem onClick={fetchData} disableRipple>
            <DataObjectIcon />
            CSV
        </MenuItem>
    );
};

export default ExportToCsv;
