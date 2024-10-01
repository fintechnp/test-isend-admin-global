import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import HasPermission from "Private/components/shared/HasPermission";
import { permissions } from "Private/data/permissions";

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

function Header({ title, buttonText, name, agent_id }) {
    const navigate = useNavigate();

    const handleAdd = () => {
        if (agent_id) {
            navigate(`/setup/service-charge/${agent_id}/create`);
        } else {
            navigate(`/setup/service-charge/0/create`);
        }
    };

    return (
        <HeaderWrapper>
            <Box>
                <Typography sx={{ fontSize: "22px", display: "inline-block" }}>{title} </Typography>
                {name && (
                    <Typography
                        sx={{
                            paddingLeft: "8px",
                            fontSize: "21px",
                            fontWeight: "500",
                            display: "inline-block",
                        }}
                    >
                        {` of ${name}`}
                    </Typography>
                )}
            </Box>
            <HasPermission permission={permissions.CREATE_SERVICE_CHARGE}>
                {buttonText && (
                    <AddButton size="small" variant="outlined" onClick={handleAdd} endIcon={<AddIcon />}>
                        {buttonText}
                    </AddButton>
                )}
            </HasPermission>
        </HeaderWrapper>
    );
}

export default Header;
