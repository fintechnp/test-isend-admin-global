import React from "react";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Column from "App/components/Column/Column";
import IPayLogo from "App/components/Logo/IPayLogo";

export default function PoweredBy() {
    return (
        <Column
            alignItems="center"
            sx={{
                position: "absolute",
                bottom: 0,
                py: 2,
            }}
        >
            <Typography color="#000000">Powered By</Typography>
            <IPayLogo />
            <Typography color={alpha("#000000", 0.6)}>TransCash International Pty. Ltd.</Typography>
            <Typography color={alpha("#000000", 0.6)}>ABN : 11147705324</Typography>
            <Typography color="#105BB7">www.ipayremit.com</Typography>
        </Column>
    );
}
