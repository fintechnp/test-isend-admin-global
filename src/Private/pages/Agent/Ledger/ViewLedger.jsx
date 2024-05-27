import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "App/components";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import { RenderField, Title, TitleWrapper } from "Private/pages/Customers/CustomerDetails/CustomerDetails";

import { ledgerActions as actions } from "./store";

export default function ViewLedger() {
    const dispatch = useDispatch();
    const { ledgerId } = useParams();

    const { response, loading } = useSelector((state) => state.get_ledger_details);

    useEffect(() => {
        dispatch(actions?.get_ledger_details(ledgerId));
    }, [ledgerId]);

    const columns = useMemo(
        () => [
            {
                header: "Account Name",
                accessorKey: "accountName",
            },
            {
                header: "Transaction Type",
                accessorKey: "transactionTypeName",
            },

            {
                header: "Currency",
                accessorKey: "currency",
            },
            {
                header: "Amount",
                accessorKey: "amount",
            },
            {
                header: "Remarks",
                accessorKey: "remarks",
            },
        ],
        [],
    );

    if (loading) {
        return (
            <Grid item xs={12}>
                <Loading loading={loading} />
            </Grid>
        );
    }

    return (
        <PageContent title="Ledger Detail">
            {loading ? (
                <Grid item xs={12}>
                    <Loading loading={loading} />
                </Grid>
            ) : (
                <Grid container rowSpacing={1}>
                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Details</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Entity Type" value={response?.data?.entryTypeName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Created At" value={response?.data?.created} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Title/Narration" value={response?.data?.narration} />
                    </Grid>

                    <Grid item xs={12} mt={2}>
                        <TanstackReactTable
                            columns={columns}
                            title="Ledger Details"
                            data={response?.data?.ledgerDetails ?? []}
                            loading={loading}
                        />
                    </Grid>
                </Grid>
            )}
        </PageContent>
    );
}
