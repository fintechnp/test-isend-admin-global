import React from "react";
import Grid from "@mui/material/Grid";

import DetailsCard from "./DetailsCard";
import OverallReport from "./OverallDetailsChart/OverallReport";

export default function WholeAdminDetails() {
    return (
        <Grid container spacing="16px">
            <Grid item xs={12} lg={9}>
                <DetailsCard />
            </Grid>
            <Grid item xs={12} lg={3}>
                <OverallReport />
            </Grid>
        </Grid>
    );
}
