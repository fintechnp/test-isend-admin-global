import React from "react";
import Grid from "@mui/material/Grid";

import { permissions } from "Private/data/permissions";

import DashboardPartnerBarChart from "../DashboardPartnerBarChart";
import GridItemWithPermission from "../../ui/GridItemWithPermission";
import DashboardPayoutCountryBarChart from "../DashboardPayoutCountryBarChart";
import useGridSizePermission from "../../utils/useGridSizePermission";

const TransactionBarGraphs = React.memo(() => {
    const hasPermissionAgentBiz = permissions.DASH_TXN_AGENT_BIZ;
    const hasPermissionPayoutCountries = permissions.DASH_PAYOUT;

    const { xs1: xsAgentBiz, xs2: xsPayoutCountries } = useGridSizePermission(
        hasPermissionAgentBiz,
        hasPermissionPayoutCountries,
    );

    return (
        <Grid container spacing={2}>
            <GridItemWithPermission permission={hasPermissionAgentBiz} gridSize={xsAgentBiz}>
                <DashboardPartnerBarChart />
            </GridItemWithPermission>

            <GridItemWithPermission permission={hasPermissionPayoutCountries} gridSize={xsPayoutCountries}>
                <DashboardPayoutCountryBarChart />
            </GridItemWithPermission>
        </Grid>
    );
});

export default TransactionBarGraphs;
