import React, { lazy } from "react";
import Grid from "@mui/material/Grid";

import Column from "App/components/Column/Column";
import { permissions } from "Private/data/permissions";
import PageContent from "App/components/Container/PageContent";
import HasPermission from "Private/components/shared/HasPermission";

import Header from "./components/Header";
import CustomerPieChart from "./components/CustomerPieChart";
import AllOverallDataChip from "./components/AllOverallDataChip";
import GridItemWithPermission from "./ui/GridItemWithPermission";
import UserRegistrationHistoryStat from "./components/UserRegistrationHistoryStat";
import OverallDetailsChart from "./components/OverallDetailsChart/OverallDetailsChart";
import TransactionBarGraphs from "./components/TransactionBarGraphs/TransactionBarGraphs";
import TransactionCustomerFilter from "./components/TransactionCustomerFilter/TransactionCustomerFilter";

const DashboardCurrencyData = lazy(() => import("./components/CurrencyData"));

const Dashboard = React.memo(() => {
    const hasOverallChipDataPermission = permissions.DASH_TXN_REV_SUMMARY;
    const hasRightGirdPermission =
        permissions.DASH_TXN_OVERALL && permissions.DASH_CUSTOMER_OVERALL && permissions.DASH_COMPLIANCE;
    const hasLeftGridPermission =
        permissions.DASH_TXN_COUNT &&
        permissions.DASH_TXN_AMOUNT &&
        permissions.DASH_TXN_AGENT_BIZ &&
        permissions.DASH_PAYOUT &&
        permissions.DASH_TXN_REV_SUMMARY;

    return (
        <PageContent documentTitle="Dashboard">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Header />
                </Grid>

                <GridItemWithPermission permission={permissions.DASH_EX_RATE}>
                    <DashboardCurrencyData />
                </GridItemWithPermission>

                <Grid item xs={12} sm={12} md={hasRightGirdPermission ? 9 : 12}>
                    <Column gap={2}>
                        <TransactionCustomerFilter />
                        <TransactionBarGraphs />
                        <HasPermission permission={hasOverallChipDataPermission}>
                            <AllOverallDataChip />
                        </HasPermission>
                    </Column>
                </Grid>

                <Grid item xs={12} sm={12} md={hasLeftGridPermission ? 3 : 12}>
                    <OverallDetailsChart />
                </Grid>

                <HasPermission permission={permissions.DASH_DONUT_CHART}>
                    <Grid item xs={12} md={6} lg={4}>
                        <CustomerPieChart />
                    </Grid>
                </HasPermission>

                <HasPermission permission={permissions.DASH_USER_REG_LINEGRAPH}>
                    <Grid item xs={12} md={6} lg={8}>
                        <UserRegistrationHistoryStat />
                    </Grid>
                </HasPermission>
            </Grid>
        </PageContent>
    );
});

export default Dashboard;
