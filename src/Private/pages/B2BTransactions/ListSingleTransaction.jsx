import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";

import { Loading } from "App/components";
import Spacer from "App/components/Spacer/Spacer";
import { TablePagination } from "App/components/Table";
import NoResults from "../Transactions/components/NoResults";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";

import referenceTypeId from "Private/config/referenceTypeId";
import { CurrencyName, FormatDate, FormatNumber, ReferenceName } from "App/helpers";
import singleTransactionActions from "Private/features/b2b-transactions/singleTransactionActions";
import SingleTransactionFilterForm from "Private/components/b2b-transactions/SingleTransactionFilterForm";

const initialState = {
    page_number: 1,
    page_size: 10,
};

export default function ListSingleTransaction() {
    const dispatch = useDispatch();

    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response, loading } = useSelector((state) => state.get_single_transaction_list);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Agent",
                accessorKey: "agent_name",
            },
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

    useEffect(() => {
        dispatch(singleTransactionActions.get_single_transactions(filterSchema));
    }, [filterSchema]);

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

    const handleSearch = (data) => {
        const updatedFilterSchema = {
            ...filterSchema,
            ...data,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleReset = () => {
        isMounted.current = false;
        setFilterSchema(initialState);
    };

    return (
        <PageContent title="Single Transactions">
            <SingleTransactionFilterForm onSubmit={handleSearch} onReset={handleReset} loading={loading} />

            {!loading && response?.data && response?.data?.length === 0 ? (
                <Grid item xs={12}>
                    <NoResults text="No Transactions Found" />
                </Grid>
            ) : (
                <>
                    <Spacer />
                    <TanstackReactTable
                        columns={columns}
                        data={response?.data ?? []}
                        loading={loading}
                        renderPagination={() => (
                            <TablePagination
                                paginationData={response?.pagination}
                                handleChangePage={handleChangePage}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        )}
                    />
                </>
            )}
        </PageContent>
    );
}
