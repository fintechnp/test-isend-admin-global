import React from "react";
import Grid from "@mui/material/Grid";

import { permissions } from "Private/data/permissions";
import HasPermission from "Private/components/shared/HasPermission";

import DashboardPartnerBarChart from "./DashboardPartnerBarChart";
import GridItemWithPermission from "../../ui/GridItemWithPermission";
import useGridSizePermission from "../../utils/useGridSizePermission";
import DashboardPayoutCountryBarChart from "./DashboardPayoutCountryBarChart";

const TransactionBarGraphs = React.memo(() => {
    const hasPermissionAgentBiz = permissions.DASH_TXN_AGENT_BIZ;
    const hasPermissionPayoutCountries = permissions.DASH_PAYOUT;

    const { xs1: defaultAgentBiz, xs2: defaultPayoutCountries } = useGridSizePermission(
        hasPermissionAgentBiz,
        hasPermissionPayoutCountries,
    );

    const gridSizeAgentBiz =
        hasPermissionAgentBiz && hasPermissionPayoutCountries ? defaultAgentBiz : hasPermissionAgentBiz ? 12 : 0;
    const gridSizePayoutCountries =
        hasPermissionPayoutCountries && hasPermissionAgentBiz
            ? defaultPayoutCountries
            : hasPermissionPayoutCountries
              ? 12
              : 0;

    return (
        <Grid container spacing={2}>
            {hasPermissionAgentBiz && (
                <HasPermission permission={hasPermissionAgentBiz}>
                    <Grid item xs={12} md={gridSizeAgentBiz}>
                        <DashboardPartnerBarChart />
                    </Grid>
                </HasPermission>
            )}
            {hasPermissionPayoutCountries && (
                <HasPermission permission={hasPermissionPayoutCountries}>
                    <Grid item xs={12} md={gridSizePayoutCountries}>
                        <DashboardPayoutCountryBarChart />
                    </Grid>
                </HasPermission>
            )}
        </Grid>
    );
});

export default TransactionBarGraphs;
