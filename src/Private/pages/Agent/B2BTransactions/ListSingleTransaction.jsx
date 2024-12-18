import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";
import singleTransactionActions from "Private/features/b2b-transactions/singleTransactionActions";

import dateUtils from "App/utils/dateUtils";
import apiEndpoints from "Private/config/apiEndpoints";
import { FormatNumber, ReferenceName } from "App/helpers";
import referenceTypeId from "Private/config/referenceTypeId";
import useListFilterStore from "App/hooks/useListFilterStore";

const initialState = {
    page_number: 1,
    page_size: 10,
    sort_by: "created_ts",
    order_by: "DESC",
};

export default function ListSingleTransaction() {
    const dispatch = useDispatch();
    const reference = JSON.parse(localStorage.getItem("reference"));

    const { response, loading } = useSelector((state) => state.get_single_transaction_list);

    const statusOptions = reference
        ?.filter((ref_data) => ref_data.reference_type === referenceTypeId.transactionStatus)[0]
        .reference_data.map((ref) => ({
            label: ref.name,
            value: ref.value,
        }));

    const {
        isFilterOpen,
        closeFilter,
        openFilter,
        onFilterSubmit,
        onDeleteFilterParams,
        onPageChange,
        onQuickFilter,
        onRowsPerPageChange,
        reset,
        filterSchema,
    } = useListFilterStore({
        initialState,
    });

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
                cell: ({ getValue, row }) =>
                    getValue() ? dateUtils.getFormattedDate(getValue(), "MMM DD, YYYY") : "-",
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

    const filterFields = [
        {
            type: fieldTypes.DATE,
            name: "from_date",
            label: "From Date",
            props: {
                withStartDayTimezone: true,
            },
        },
        {
            type: fieldTypes.DATE,
            name: "to_date",
            label: "To Date",
            props: {
                withEndDaytTimezone: true,
            },
        },
        {
            type: fieldTypes.TEXTFIELD,
            label: "Transaction ID",
            name: "transaction_id",
        },
        {
            type: fieldTypes.SEARCH_AUTOCOMPLETE_API,
            name: "market_maker_id",
            label: "Market Maker",
            apiEndpoint: apiEndpoints.marketMaker.getAll,
            paramkey: "Name",
            valueKey: "marketMakerId",
            labelKey: "name",
        },
        {
            type: fieldTypes.SEARCH_AUTOCOMPLETE_API,
            name: "business_id",
            label: "Business Id",
            apiEndpoint: apiEndpoints.business.getAll,
            paramKey: "Name",
            valueKey: "businessId",
            labelKey: "name",
            defaultQueryParams: "marketMakerId",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "txn_no",
            label: "Transaction No",
        },
        {
            type: fieldTypes.SELECT,
            name: "status",
            label: "Status",
            options: statusOptions,
        },
    ];

    return (
        <PageContent
            documentTitle="Single Transactions"
            breadcrumbs={[
                {
                    label: "B2B",
                },
                {
                    label: "Single Transactions",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Single Transactions"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onDelete={onDeleteFilterParams}
                    values={filterSchema}
                    fields={filterFields}
                    onReset={reset}
                />
                <PageContentContainer
                    title="Single Transactions"
                    topRightContent={
                        <TableGridQuickFilter
                            onOrderByChange={onQuickFilter}
                            onSortByChange={onQuickFilter}
                            values={filterSchema}
                            disabled={loading}
                            sortByData={[{ key: "None", value: "created_ts" }]}
                        />
                    }
                >
                    <TanstackReactTable columns={columns} data={response?.data ?? []} loading={loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={response?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
}
