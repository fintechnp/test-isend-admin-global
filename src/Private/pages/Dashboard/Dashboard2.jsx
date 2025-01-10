import React, { lazy } from "react";
import Grid from "@mui/material/Grid";

import PageContent from "App/components/Container/PageContent";

import Header from "./components/Header";
import DetailsCard from "./components/DetailsCard";
import OverallReport from "./components/OverallReport";
import TransactionStat from "./components/TransactionStat";
import CustomerPieChart from "./components/CustomerPieChart";
import TotalCustomerCard from "./components/TotalCustomerCard";
import AllOverallDataChip from "./components/AllOverallDataChip";
import DashboardPartnerBarChart from "./components/DashboardPartnerBarChart";
import UserRegistrationHistoryStat from "./components/UserRegistrationHistoryStat";
import DashboardPayoutCountryBarChart from "./components/DashboardPayoutCountryBarChart";

import HasPermission from "Private/components/shared/HasPermission";
import { permissions } from "Private/data/permissions";
import OverallTransactionAndCustomer from "./components/OverallTransactionAndCustomer";
import ComplianceData from "./components/ComplianceData";
import DashboardTransactionCount from "./components/DashboardTransactionCount";
import DashboardTransactionAmount from "./components/DashboardTransactionAmount";
import OverallCustomerReport from "./components/OverallCustomerReport";
import OverallTransactionReport from "./components/OverallTransactionReport";
import styled from "@emotion/styled";
import Paper from "App/components/Paper/Paper";
import { Stack, Typography } from "@mui/material";
import isEmpty from "App/helpers/isEmpty";
import Column from "App/components/Column/Column";
import OverallReportHeading from "./components/OverallReportHeading";

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

function TransactionDetailsFilter() {
    const hasTxnCountPermission = permissions.DASH_TXN_COUNT;
    const hasTxnAmountPermission = permissions.DASH_TXN_AMOUNT;

    const xsTxnCount = !isEmpty(hasTxnCountPermission) ? (!isEmpty(hasTxnAmountPermission) ? 6 : 12) : 12;

    const xsTxnAmount = !isEmpty(hasTxnAmountPermission) ? (!isEmpty(hasTxnCountPermission) ? 6 : 12) : 12;

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <HasPermission permission={hasTxnCountPermission}>
                    <Grid item xs={12} md={xsTxnCount}>
                        <DashboardTransactionCount />
                    </Grid>
                </HasPermission>

                <HasPermission permission={hasTxnAmountPermission}>
                    <Grid item xs={12} md={xsTxnAmount}>
                        <DashboardTransactionAmount />
                    </Grid>
                </HasPermission>

                <Grid item xs={12}>
                    <TotalCustomerCard />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

function TransactionBarGraphs() {
    const hasPermissionAgentBiz = permissions.DASH_TXN_AGENT_BIZ;
    const hasPermissionPayoutCountries = permissions.DASH_PAYOUT;

    const xsAgentBiz = !isEmpty(hasPermissionAgentBiz) ? (!isEmpty(hasPermissionPayoutCountries) ? 6 : 12) : 12;
    const xsPayoutCountries = !isEmpty(hasPermissionPayoutCountries) ? (!isEmpty(hasPermissionAgentBiz) ? 6 : 12) : 12;

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <HasPermission permission={hasPermissionAgentBiz}>
                    <Grid item xs={12} md={xsAgentBiz}>
                        <DashboardPartnerBarChart />
                    </Grid>
                </HasPermission>

                <HasPermission permission={hasPermissionPayoutCountries}>
                    <Grid item xs={12} md={xsPayoutCountries}>
                        <DashboardPayoutCountryBarChart />
                    </Grid>
                </HasPermission>
            </Grid>
        </React.Fragment>
    );
}

function OverallTransactionCustomerDetails() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <OverallReportHeading />
            </Grid>
            <Grid item xs={12}>
                <OverallTransactionReport />
            </Grid>
            <Grid item xs={12}>
                <OverallCustomerReport />
            </Grid>
            <Grid item xs={12}>
                <ComplianceData />
            </Grid>
        </Grid>
    );
}

function Dashboard2() {
    return (
        <PageContent documentTitle="Dashboard">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Header />
                </Grid>

                <Grid item xs={12}>
                    <DashboardCurrencyData />
                </Grid>

                <Grid item xs={12} sm={12} md={9}>
                    <Column gap={2}>
                        <TransactionDetailsFilter />
                        <TransactionBarGraphs />
                        <AllOverallDataChip />
                    </Column>
                </Grid>

                <Grid item xs={12} sm={12} md={3}>
                    <OverallTransactionCustomerDetails />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <CustomerPieChart />
                </Grid>

                <Grid item xs={12} md={6} lg={8}>
                    <UserRegistrationHistoryStat />
                </Grid>
            </Grid>
        </PageContent>
    );
}

export default Dashboard2;
