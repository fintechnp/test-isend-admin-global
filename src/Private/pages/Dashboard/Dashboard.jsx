import React, { lazy } from "react";
import Grid from "@mui/material/Grid";

import Header from "./components/Header";
import KycStat from "./components/KycStat";
import CustomerPieChart from "./components/CustomerPieChart";
import PageContent from "App/components/Container/PageContent";
import WholeAdminDetails from "./components/WholeAdminDetails";
import UserRegistrationHistoryStat from "./components/UserRegistrationHistoryStat";

const DashboardCurrencyData = lazy(() => import("./components/CurrencyData"));

function Dashboard() {
    return (
        <PageContent documentTitle="Dashboard">
            <Grid container spacing="25px">
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid item xs={12}>
                    <DashboardCurrencyData />
                </Grid>
                {/* <Grid item xs={12}>
                    <SummaryStat />
                </Grid> */}
                <Grid item xs={12}>
                    <WholeAdminDetails />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <CustomerPieChart />
                </Grid>
                {/* <Grid item xs={12} md={6} lg={4}>
                    <KycStat />
                </Grid> */}

                <Grid item xs={12} md={6} lg={8}>
                    <UserRegistrationHistoryStat />
                </Grid>
            </Grid>
        </PageContent>
    );
}

export default Dashboard;
