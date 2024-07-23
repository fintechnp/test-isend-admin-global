import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import React, { memo } from "react";

const Footer = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${theme.spacing(0.75)}px ${theme.spacing(3)}px`,
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    background: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    transition: "all 0.25s ease-in-out",
}));

const TableFooter = ({ selectedRows, children }) => {
    return (
        <Footer>
            <Typography variant="body2">{selectedRows.length} selected</Typography>
            <div>{children && children}</div>
        </Footer>
    );
};

export default memo(TableFooter);
