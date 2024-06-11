import Grid from "@mui/material/Grid";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";

import { Loading } from "App/components";
import Spacer from "App/components/Spacer/Spacer";
import { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";

import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import referenceTypeId from "Private/config/referenceTypeId";
import { CurrencyName, FormatDate, ReferenceName } from "App/helpers";
import batchTransactionActions from "Private/features/b2b-transactions/batchTransactionActions";

const initialState = {
    page_number: 1,
    page_size: 10,
};

export default function ListBatchTransaction() {
    const dispatch = useDispatch();

    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response, loading } = useSelector((state) => state.get_batch_transaction_list);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "ID",
                accessorKey: "batch_id",
                cell: ({ getValue }) => (
                    <NavLink to={buildRoute(routePaths.agent.viewBatchTransaction, getValue())}>{getValue()}</NavLink>
                ),
            },
            // {
            //     header: "Agent",
            //     accessorKey: "agent_name",
            // },
            {
                header: "Business Name",
                accessorKey: "business_name",
            },

            {
                header: "Txn Date",
                accessorKey: "created_ts",
                cell: ({ getValue }) => <>{FormatDate(getValue())}</>,
            },
            {
                header: "No. of beneficiary",
                accessorKey: "count",
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
        dispatch(batchTransactionActions.get_batch_transactions(filterSchema));
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
    return (
        <PageContent title="Batch Transactions">
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
        </PageContent>
    );
}
