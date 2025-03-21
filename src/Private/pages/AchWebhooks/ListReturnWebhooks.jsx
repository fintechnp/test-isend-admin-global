import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Column from "App/components/Column/Column";
import FilterForm from "App/components/Filter/FilterForm";
import useListFilterStore from "App/hooks/useListFilterStore";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { achWebhookActions } from "./store";
import dateUtils from "App/utils/dateUtils";
import { TablePagination } from "App/components/Table";

const initialState = {
    page_number: 1,
    page_size: 10,
};

const ListReturnWebhooks = () => {
    const dispatch = useDispatch();

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

    const { response: returnWebhooks, loading: isLoading } = useSelector((state) => state.get_ach_return_webhooks);

    const data = returnWebhooks?.data ?? [];

    useEffect(() => {
        dispatch(achWebhookActions.get_ach_return_webhooks(filterSchema));
    }, [dispatch, filterSchema]);

    const columns = useMemo(() => [
        {
            header: "S.N.",
            accessorKey: "f_serial_no",
            maxWidth: 50,
        },
        {
            header: "Code",
            accessorKey: "return_code",
        },
        {
            header: "Amount",
            accessorKey: "amount",
        },

        {
            header: "Original effective entry date",
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
            header: "RDFI Routing Number",
            accessorKey: "rdfi_routingnumber",
        },
        {
            header: "ACH Trace Number",
            accessorKey: "ach_tracenumber",
        },
        {
            header: "RDFI Routing Number",
            accessorKey: "rdfi_accountnumber",
        },
        {
            header: "Standard Entry Class",
            accessorKey: "standard_entry_class",
        },
        {
            header: "RDFI Account Number",
            accessorKey: "rdfi_accountnumber",
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
            header: "CFSB Transaction ID",
            accessorKey: "ach_transaction_id",
        },
    ]);

    const filterFields = [
        {
            type: "textfield",
            label: "Amount",
            name: "amount",
        },
        {
            type: "textfield",
            label: "CFSB Transaction ID",
            name: "transaction_id",
        },
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
            label: "Receiver",
            name: "receiver",
        },
        {
            type: "textfield",
            label: "ACH Trace Number",
            name: "ach_tracenumber",
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
            label: "ODFI Company Name",
            name: "odfi_company_name",
        },
    ];

    return (
        <PageContent
            documentTitle="ACH Return Webhooks"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "ACH Webhooks",
                },
                {
                    label: "Return",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Return Webhooks"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                />
                <PageContentContainer title="ACH Return Webhooks">
                    <TanstackReactTable columns={columns} data={data} loading={isLoading} />
                </PageContentContainer>

                <TablePagination
                    paginationData={returnWebhooks?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
};

export default ListReturnWebhooks;
