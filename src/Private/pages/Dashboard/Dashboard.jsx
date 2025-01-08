import React, { lazy } from "react";
import Grid from "@mui/material/Grid";

import PageContent from "App/components/Container/PageContent";

import Header from "./components/Header";
import KycStat from "./components/KycStat";
import DetailsCard from "./components/DetailsCard";
import OverallReport from "./components/OverallReport";
import TransactionStat from "./components/TransactionStat";
import CustomerPieChart from "./components/CustomerPieChart";
import WholeAdminDetails from "./components/WholeAdminDetails";
import TotalCustomerCard from "./components/TotalCustomerCard";
import AllOverallDataChip from "./components/AllOverallDataChip";
import DashboardPartnerBarChart from "./components/DashboardPartnerBarChart";
import UserRegistrationHistoryStat from "./components/UserRegistrationHistoryStat";
import DashboardPayoutCountryBarChart from "./components/DashboardPayoutCountryBarChart";

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
                <Grid item xs={12}>
                    <Grid container spacing="16px">
                        <Grid item xs={12} lg={9}>
                            <DetailsCard />

                            <Grid container spacing="16px">
                                <Grid item xs={12} mt={3}>
                                    <TotalCustomerCard />
                                </Grid>
                                <Grid item xs={12}>
                                    <TransactionStat />
                                </Grid>

                                <Grid item xs={12} lg={6}>
                                    <DashboardPayoutCountryBarChart />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <DashboardPartnerBarChart />
                                </Grid>
                                <Grid item xs={12}>
                                    <AllOverallDataChip />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} lg={3}>
                            <OverallReport />
                        </Grid>
                    </Grid>
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
