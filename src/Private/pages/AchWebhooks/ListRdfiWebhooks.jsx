import React, { useCallback, useEffect, useMemo, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import Row from "App/components/Row/Row";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import FilterForm from "App/components/Filter/FilterForm";
import useListFilterStore from "App/hooks/useListFilterStore";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { achWebhookActions } from "./store";
import dateUtils from "App/utils/dateUtils";
import ReturnIcon from "App/components/Icon/ReturnIcon";
import ReturnRdfiTransactionModal from "./components/ReturnRdfiTransactionModal";

const initialState = {
    page_number: 1,
    page_size: 10,
};

export default function ListRdfiWebhooks() {
    const dispatch = useDispatch();

    const [selected, setSelected] = useState(null);

    const methods = useListFilterStore({ initialState });

    const {
        isFilterOpen,
        closeFilter,
        openFilter,
        filterSchema,
        onDeleteFilterParams,
        onFilterSubmit,
        onPageChange,
        onRowsPerPageChange,
        reset,
    } = methods;

    const { response: rdfiWebhooks, loading: isLoading } = useSelector((state) => state.get_ach_rdfi_webhooks);

    const fetch = useCallback(() => {
        dispatch(achWebhookActions.get_ach_rdfi_webhooks(filterSchema));
    }, [filterSchema]);

    const handleClose = useCallback(() => setSelected(null), []);

    useEffect(() => {
        fetch();
    }, [dispatch, filterSchema]);

    const data = rdfiWebhooks?.data ?? [];

    const columns = useMemo(() => [
        {
            header: "S.N.",
            accessorKey: "f_serial_no",
            maxWidth: 50,
        },
        {
            header: "Amount",
            accessorKey: "amount",
            cell: ({ getValue }) => <Typography align="right">{getValue()}</Typography>,
        },
        {
            header: "Original Effective Entry Date",
            cell: ({ row }) => (
                <>
                    {row.original.original_effective_entrydate
                        ? dateUtils.getFormattedDate(row.original.original_effective_entrydate)
                        : "-"}
                </>
            ),
        },

        {
            header: "Receiver",
            accessorKey: "receiver",
        },
        {
            header: "RDFI Account Number",
            accessorKey: "rdfi_accountnumber",
        },
        {
            header: "ACH Trace Number",
            accessorKey: "ach_tracenumber",
        },
        {
            header: "Standard Entry Class",
            accessorKey: "standard_entry_class",
        },
        {
            header: "RDFI Routing Number",
            accessorKey: "rdfi_routingnumber",
        },
        {
            header: "ODFI Routing Number",
            accessorKey: "odfi_routingnumber",
        },
        {
            header: "ODFI Company Name",
            accessorKey: "odfi_companyname",
        },
        {
            header: "Transaction Code",
            accessorKey: "transaction_code",
        },
        {
            header: "Transaction Type",
            accessorKey: "transaction_type",
        },
        {
            header: "CFSB Transaction ID",
            accessorKey: "ach_transaction_id",
        },
        {
            header: "Actions",
            accessorKey: "ach_transaction_id",
            cell: ({ getValue }) => (
                <Row>
                    <IconButton onClick={() => setSelected(getValue())}>
                        <ReturnIcon fontSize="12" />
                    </IconButton>
                </Row>
            ),
        },
    ]);

    const filterFields = [
        {
            type: "date",
            label: "From effective entry date",
            name: "from_effective_entry_date",
        },
        {
            type: "date",
            label: "To effective entry date",
            name: "to_effective_entry_date",
        },
        {
            type: "textfield",
            label: "RDFI Routing Number",
            name: "rdfi_routing_number",
        },
        {
            type: "textfield",
            label: "RDFI Account Number",
            name: "rdfi_account_number",
        },

        {
            type: "textfield",
            label: "ODFI Routing Number",
            name: "odfi_routing_number",
        },
        {
            type: "textfield",
            label: "Receiver",
            name: "receiver",
        },
        {
            type: "textfield",
            label: "ACH Trace Number",
            name: "ach_trace_number",
        },
        {
            type: "textfield",
            label: "ODFI Company Name",
            name: "odfi_company_name",
        },
        {
            type: "textfield",
            label: "CFSB Transaction ID",
            name: "transaction_id",
        },
        {
            type: "textfield",
            label: "Amount",
            name: "amount",
        },
    ];

    return (
        <PageContent
            documentTitle="ACH RDFI Webhooks"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "ACH Webhooks",
                },
                {
                    label: "RDFI",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    title="Search RDFI Webhooks"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                />
                <PageContentContainer title="ACH RDFI Webhooks">
                    <TanstackReactTable columns={columns} data={data} loading={isLoading} />
                </PageContentContainer>

                <TablePagination
                    paginationData={rdfiWebhooks?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
            <ReturnRdfiTransactionModal transactionId={selected} onReturnSuccess={fetch} onClose={handleClose} />
        </PageContent>
    );
}
