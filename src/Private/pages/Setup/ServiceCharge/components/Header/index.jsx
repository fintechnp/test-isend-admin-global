import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const AddButton = styled(Button)(({ theme }) => ({
    padding: "6px 12px",
    textTransform: "capitalize",
}));

function Header({ title, buttonText, name, agent_id }) {
    const navigate = useNavigate();

    const handleAdd = () => {
        navigate(`/setup/service-charge/${agent_id}/create`);
    };

    return (
        <HeaderWrapper>
            <Typography sx={{ fontSize: "22px" }}>
                {title} {name && `of ${name}`}
            </Typography>
           {buttonText && (
                <AddButton
                    size="small"
                    variant="outlined"
                    onClick={handleAdd}
                    endIcon={<AddIcon />}
                >
                    {buttonText}
                </AddButton>
            )} 
        </HeaderWrapper>
    );
}

export default Header;
