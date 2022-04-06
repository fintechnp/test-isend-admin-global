import { Grid } from "@mui/material";
import React from "react";

import Numbers from "./components/Numbers";
import AccountTable from "./components/AccountTable";

function Accounts() {
    return (
        <Grid container spacing={2} sx={{paddingTop: "8px"}}>
            <Grid item xs={12}>
                <Numbers />
            </Grid>
            <Grid item xs={12}>
                <AccountTable />
            </Grid>
        </Grid>
    );
}

export default Accounts;
