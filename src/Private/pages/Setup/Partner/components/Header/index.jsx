import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
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

function Header({ title, buttonText, partner }) {
    const navigate = useNavigate();

    const handleAdd = () => {
        if (partner) {
            navigate("/setup/partner/create");
        } else {
            navigate("/setup/partner/corridor/add");
        }
    };

    return (
        <HeaderWrapper>
            <Typography sx={{ fontSize: "22px" }}>{title}</Typography>
            <AddButton
                size="small"
                variant="outlined"
                onClick={handleAdd}
                endIcon={<AddIcon />}
            >
                {buttonText}
            </AddButton>
        </HeaderWrapper>
    );
}

export default Header;
