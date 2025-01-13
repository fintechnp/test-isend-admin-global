import React, { lazy } from "react";
import Grid from "@mui/material/Grid";

import PageContent from "App/components/Container/PageContent";

import Header from "./components/Header";
import DetailsCard from "./components/DetailsCard";
import OverallReport from "./components/OverallDetailsChart/OverallReport";
import TransactionStat from "./components/TransactionStat";
import CustomerPieChart from "./components/CustomerPieChart";
import TotalCustomerCard from "./components/TransactionCustomerFilter/TotalCustomerCard";
import AllOverallDataChip from "./components/AllOverallDataChip";
import DashboardPartnerBarChart from "./components/DashboardPartnerBarChart";
import UserRegistrationHistoryStat from "./components/UserRegistrationHistoryStat";
import DashboardPayoutCountryBarChart from "./components/DashboardPayoutCountryBarChart";

import HasPermission from "Private/components/shared/HasPermission";
import { permissions } from "Private/data/permissions";
import OverallTransactionAndCustomer from "./components/OverallTransactionAndCustomer";
import ComplianceData from "./components/OverallDetailsChart/ComplianceData";
import DashboardTransactionCount from "./components/TransactionCustomerFilter/DashboardTransactionCount";
import DashboardTransactionAmount from "./components/TransactionCustomerFilter/DashboardTransactionAmount";
import OverallCustomerReport from "./components/OverallDetailsChart/OverallCustomerReport";
import OverallTransactionReport from "./components/OverallDetailsChart/OverallTransactionReport";
import styled from "@emotion/styled";
import Paper from "App/components/Paper/Paper";

const DashboardCurrencyData = lazy(() => import("./components/CurrencyData"));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
    }),
}));

function Dashboard() {
    return (
        <PageContent documentTitle="Dashboard">
            <Grid container spacing="25px">
                {/* Header Section */}
                <Grid item xs={12}>
                    <Header />
                </Grid>

                {/* Dashboard Currency Data Section */}
                <HasPermission permission={permissions.DASH_EX_RATE}>
                    <Grid item xs={12}>
                        <DashboardCurrencyData />
                    </Grid>
                </HasPermission>

                <Grid item xs={12}>
                    <Grid container spacing="16px">
                        {/* Left Column */}
                        <Grid item xs={12} lg={9}>
                            {/* <DetailsCard /> */}

                            <Grid container spacing="16px">
                                <HasPermission permission={permissions.DASH_TXN_COUNT}>
                                    <Grid item xs={12} lg={6}>
                                        <DashboardTransactionCount />
                                    </Grid>
                                </HasPermission>

                                <HasPermission permission={permissions.DASH_TXN_AMOUNT}>
                                    <Grid item xs={12} lg={6}>
                                        <DashboardTransactionAmount />
                                    </Grid>
                                </HasPermission>
                            </Grid>

                            <Grid container spacing="16px" mt={2}>
                                {/* Total Customer Count */}
                                <HasPermission permission={permissions.DASH_CUSTOMER_COUNT}>
                                    <Grid item xs={12}>
                                        <TotalCustomerCard />
                                    </Grid>
                                </HasPermission>

                                {/* Transaction Statistics */}
                                <HasPermission permission={permissions.DASH_TXN_LINEGRAPH}>
                                    <Grid item xs={12}>
                                        <TransactionStat />
                                    </Grid>
                                </HasPermission>

                                {/* Payout and Partner Charts */}
                                <HasPermission permission={permissions.DASH_PAYOUT}>
                                    <Grid item xs={12} lg={6}>
                                        <DashboardPayoutCountryBarChart />
                                    </Grid>
                                </HasPermission>
                                <HasPermission permission={permissions.DASH_TXN_AGENT_BIZ}>
                                    <Grid item xs={12} lg={6}>
                                        <DashboardPartnerBarChart />
                                    </Grid>
                                </HasPermission>

                                {/* Revenue Summary */}
                                <HasPermission permission={permissions.DASH_TXN_REV_SUMMARY}>
                                    <Grid item xs={12}>
                                        <AllOverallDataChip />
                                    </Grid>
                                </HasPermission>
                            </Grid>
                        </Grid>

                        {/* Right Column */}
                        <Grid item xs={12} lg={3}>
                            <Grid container spacing="16px">
                                {/* Overall Transaction & Customer */}
                                <HasPermission permission={permissions.DASH_TXN_OVERALL}>
                                    <Grid item xs={12}>
                                        <OverallTransactionReport />
                                    </Grid>
                                </HasPermission>
                                <HasPermission permission={permissions.DASH_CUSTOMER_OVERALL}>
                                    <Grid item xs={12} mt={-2}>
                                        {/* <OverallTransactionAndCustomer /> */}

                                        <OverallCustomerReport />
                                    </Grid>
                                </HasPermission>

                                {/* Compliance Data */}
                                <HasPermission permission={permissions.DASH_COMPLIANCE}>
                                    <Grid item xs={12}>
                                        <OverallTransactionReport />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <OverallCustomerReport />
                                    </Grid>

                                    <Grid item xs={12} mt={2}>
                                        <ComplianceData />
                                    </Grid>
                                </HasPermission>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Additional Charts Section */}
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
}

export default Dashboard;
