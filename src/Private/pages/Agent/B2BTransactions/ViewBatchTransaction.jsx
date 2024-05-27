import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useReactTable } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "App/components";
import { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import { TitleWrapper, Title, RenderField } from "Private/pages/Customers/CustomerDetails/CustomerDetails";

import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import { ReferenceName, FormatDate, FormatNumber } from "App/helpers";
import referenceTypeId from "Private/config/referenceTypeId";
import batchTransactionActions from "Private/features/b2b-transactions/batchTransactionActions";
import Spacer from "App/components/Spacer/Spacer";

const initialState = {
    page_number: 1,
    page_size: 1000,
};

export default function ViewBatchTransaction({ title }) {
    const dispatch = useDispatch();

    const { batchTransactionId } = useParams();

    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response, loading } = useSelector((state) => state.get_batch_transaction_by_id);

    useEffect(() => {
        dispatch(batchTransactionActions.get_batch_transaction(batchTransactionId, filterSchema));
    }, [filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "Txn ID",
                accessorKey: "transaction_id",
                cell: ({ getValue }) => (
                    <Link to={`/transactions/details/${getValue()}`} style={{ textDecoration: "none" }}>
                        {getValue()}
                    </Link>
                ),
            },
            {
                header: "Sender(Business)",
                accessorKey: "business_name",
            },
            {
                header: "Pin Number",
                accessorKey: "pin_number",
                cell: ({ getValue }) => <p>{getValue() ? getValue() : "-"}</p>,
            },

            {
                header: "Txn Date",
                accessorKey: "created_ts",
                cell: ({ getValue }) => <>{FormatDate(getValue())}</>,
            },
            {
                header: "Beneficiary Name",
                accessorKey: "beneficiary_name",
            },
            {
                header: () => <Typography textAlign="right">Sending / Receiving Amount</Typography>,
                accessorKey: "transfer_amount",
                cell: ({ row }) => (
                    <Box display="flex" flexDirection="column" alignItems="flex-end">
                        <Box fontWeight="bold">
                            {FormatNumber(row.original.transfer_amount)} {row.original.collected_currency}
                        </Box>
                        <Box>
                            {FormatNumber(row.original.payout_amount)} {row.original.payout_currency}
                        </Box>
                    </Box>
                ),
            },
            {
                header: "Exchange Rate",
                accessorKey: "exchange_rate",
            },
            {
                header: "Status",
                accessorKey: "status",
                cell: ({ getValue }) => <>{ReferenceName(referenceTypeId.transactionStatus, getValue())}</>,
            },
        ],
        [],
    );

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            page_number: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    return (
        <PageContent title="Batch Transaction">
            {loading ? (
                <Grid item xs={12}>
                    <Loading loading={loading} />
                </Grid>
            ) : (
                <Grid container rowSpacing={1}>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Business Name" value={response?.data?.business_name} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Transaction Date" value={FormatDate(response?.data?.created_ts)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="No of beneficiary" value={response?.data?.count} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="No of approval" value={response?.data?.no_of_approval} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Status" value={response?.data?.status_name} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField
                            label="Total Sent Amount"
                            value={`${response?.data?.sending_amount} ${response?.data?.sending_currency}`}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <RenderField label="Service Charge" value={response?.data?.service_charge.toString()} />
                    </Grid>
                </Grid>
            )}
            <Spacer />
            <TanstackReactTable
                columns={columns}
                data={response?.data.transactions ?? []}
                loading={loading}
                renderPagination={() => (
                    <TablePagination
                        paginationData={response?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </PageContent>
    );
}
