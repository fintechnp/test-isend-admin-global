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

function Header({ title, buttonText, name, sending_currency, id }) {
    const navigate = useNavigate();

    const handleAdd = () => {
        if (id) {
            navigate(`/setup/exchange-rate/create/${sending_currency}/${id}`);
        } else {
            navigate(`/setup/exchange-rate/create/all/0`);
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
            <HasPermission permission={permissions.CREATE_EXCHANGE_RATE}>
                {buttonText && (
                    <AddButton size="small" variant="outlined" onClick={handleAdd} endIcon={<AddIcon />}>
                        {buttonText}
                    </AddButton>
                )}
            </HasPermission>
        </HeaderWrapper>
    );
}

export default React.memo(Header);
