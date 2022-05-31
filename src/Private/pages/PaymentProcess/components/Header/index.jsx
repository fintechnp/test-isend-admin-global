import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const AddButton = styled(Button)(({ theme }) => ({
    padding: "6px 12px",
    textTransform: "capitalize",
}));

function Header({ title, add = false }) {
    const navigate = useNavigate();

    const addBlock = () => {
        navigate("/payment/block-list/add");
    };

    return (
        <HeaderWrapper>
            <Typography sx={{ fontSize: "22px" }}>{title}</Typography>
            {add && (
                <AddButton
                    size="small"
                    variant="outlined"
                    onClick={addBlock}
                    endIcon={<AddIcon />}
                >
                    Add Block List
                </AddButton>
            )}
        </HeaderWrapper>
    );
}

export default Header;
