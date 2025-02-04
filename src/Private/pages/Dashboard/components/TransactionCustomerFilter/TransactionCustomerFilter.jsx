import React from "react";
import Grid from "@mui/material/Grid";

import { permissions } from "Private/data/permissions";
import HasPermission from "Private/components/shared/HasPermission";

import TotalCustomerCard from "./TotalCustomerCard";
import DashboardTransactionCount from "./DashboardTransactionCount";
import DashboardTransactionAmount from "./DashboardTransactionAmount";
import useGridSizePermission from "../../utils/useGridSizePermission";

const TransactionCustomerFilter = React.memo(() => {
    const hasTxnCountPermission = permissions.DASH_TXN_COUNT;
    const hasTxnAmountPermission = permissions.DASH_TXN_AMOUNT;
    const hasCustomerPermission = permissions.DASH_CUSTOMER_COUNT;

    const { xs1: defaultTxnCount, xs2: defaultTxnAmount } = useGridSizePermission(
        hasTxnCountPermission,
        hasTxnAmountPermission,
    );

    const gridSizeTxnCount =
        hasTxnCountPermission && hasTxnAmountPermission ? defaultTxnCount : hasTxnCountPermission ? 12 : 0;
    const gridSizeTxnAmount =
        hasTxnAmountPermission && hasTxnCountPermission ? defaultTxnAmount : hasTxnAmountPermission ? 12 : 0;

    return (
        <Grid container spacing={2}>
            {hasTxnCountPermission && (
                <HasPermission permission={hasTxnCountPermission}>
                    <Grid item xs={12} md={gridSizeTxnCount}>
                        <DashboardTransactionCount />
                    </Grid>
                </HasPermission>
            )}

            {hasTxnAmountPermission && (
                <HasPermission permission={hasTxnAmountPermission}>
                    <Grid item xs={12} md={gridSizeTxnAmount}>
                        <DashboardTransactionAmount />
                    </Grid>
                </HasPermission>
            )}

            {hasCustomerPermission && (
                <HasPermission permission={hasCustomerPermission}>
                    <Grid item xs={12}>
                        <TotalCustomerCard />
                    </Grid>
                </HasPermission>
            )}
        </Grid>
    );
});

export default TransactionCustomerFilter;
