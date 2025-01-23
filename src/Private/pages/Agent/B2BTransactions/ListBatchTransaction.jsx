import Grid from "@mui/material/Grid";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";

import { Loading } from "App/components";
import Spacer from "App/components/Spacer/Spacer";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";

import dateUtils from "App/utils/dateUtils";
import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import referenceTypeId from "Private/config/referenceTypeId";
import { CurrencyName, FormatDate, ReferenceName } from "App/helpers";
import StatusBadge from "Private/pages/PaymentProcess/data/StatusBadge";
import PageContentContainer from "App/components/Container/PageContentContainer";
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
                cell: ({ getValue, row }) =>
                    getValue() ? dateUtils.getFormattedDate(getValue(), "MMM DD, YYYY") : "-",
            },
            {
                header: "No. of beneficiary",
                accessorKey: "count",
            },
            {
                header: "Status",
                accessorKey: "status",
                cell: ({ getValue }) => <StatusBadge status={getValue()} />,
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
        <PageContent
            documentTitle="Batch Transactions"
            breadcrumbs={[
                {
                    label: "B2B",
                },
                {
                    label: "Batch Transactions",
                },
            ]}
        >
            <Column gap="16px">
                <PageContentContainer title="Batch Transactions">
                    <TanstackReactTable columns={columns} data={response?.data ?? []} loading={loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={response?.pagination}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Column>
        </PageContent>
    );
}
