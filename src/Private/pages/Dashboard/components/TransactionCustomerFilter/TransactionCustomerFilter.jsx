import React from "react";
import Grid from "@mui/material/Grid";

import { permissions } from "Private/data/permissions";

import TotalCustomerCard from "./TotalCustomerCard";
import DashboardTransactionCount from "./DashboardTransactionCount";
import GridItemWithPermission from "../../ui/GridItemWithPermission";
import DashboardTransactionAmount from "./DashboardTransactionAmount";
import useGridSizePermission from "../../utils/useGridSizePermission";

const TransactionCustomerFilter = React.memo(() => {
    const hasTxnCountPermission = permissions.DASH_TXN_COUNT;
    const hasTxnAmountPermission = permissions.DASH_TXN_AMOUNT;
    const hasCustomerPermission = permissions.DASH_CUSTOMER_COUNT;

    const { xs1: xsTxnCount, xs2: xsTxnAmount } = useGridSizePermission(hasTxnCountPermission, hasTxnAmountPermission);

    return (
        <Grid container spacing={2}>
            <GridItemWithPermission permission={hasTxnCountPermission} gridSize={xsTxnCount}>
                <DashboardTransactionCount />
            </GridItemWithPermission>

            <GridItemWithPermission permission={hasTxnAmountPermission} gridSize={xsTxnAmount}>
                <DashboardTransactionAmount />
            </GridItemWithPermission>

            <GridItemWithPermission permission={hasCustomerPermission}>
                <TotalCustomerCard />
            </GridItemWithPermission>
        </Grid>
    );
});

export default TransactionCustomerFilter;
