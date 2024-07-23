import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const AddButton = styled(Button)(({ theme }) => ({
    padding: "6px 12px",
    textTransform: "capitalize",

    borderColor: theme.palette.border.main,
}));

function Header() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleAdd = () => {
        navigate(`/customer/beneficiary/add/${id}`);
    };
    return (
        <HeaderWrapper>
            <Typography sx={{ fontSize: "22px" }}>Beneficiary List</Typography>
            <AddButton size="small" variant="outlined" onClick={handleAdd} endIcon={<AddIcon />}>
                Add Beneficiary
            </AddButton>
        </HeaderWrapper>
    );
}

export default React.memo(Header);
