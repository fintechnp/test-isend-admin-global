import React from "react";
import Grid from "@mui/material/Grid";

import { permissions } from "Private/data/permissions";

import OverallReport from "./OverallReport";
import OverallCustomerReport from "./OverallCustomerReport";
import OverallTransactionReport from "./OverallTransactionReport";
import ComplianceData from "./ComplianceData";

import GridItemWithPermission from "../../ui/GridItemWithPermission";
import OverallReportHeading from "../OverallReportHeading";

const OverallDetailsChart = React.memo(() => {
    const hasOverallTransactionPermission = permissions.DASH_TXN_OVERALL;
    const hasOverallCustomerPermission = permissions.DASH_CUSTOMER_OVERALL;
    const hasCompliancePermission = permissions.DASH_COMPLIANCE;

    const hasOverallHeading = hasCompliancePermission && hasOverallCustomerPermission;

    return (
        <Grid container spacing={2}>
            {hasOverallHeading && (
                <Grid item xs={12}>
                    <OverallReportHeading />
                </Grid>
            )}

            <GridItemWithPermission permission={hasOverallTransactionPermission} gridSize={12}>
                <OverallTransactionReport />
            </GridItemWithPermission>

            <GridItemWithPermission permission={hasOverallCustomerPermission} gridSize={12}>
                <OverallCustomerReport />
            </GridItemWithPermission>

            <GridItemWithPermission permission={hasCompliancePermission} gridSize={12}>
                <ComplianceData />
            </GridItemWithPermission>
        </Grid>
    );
});

export default OverallDetailsChart;
