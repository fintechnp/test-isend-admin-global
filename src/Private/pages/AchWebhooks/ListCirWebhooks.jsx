import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Column from "App/components/Column/Column";
import FilterForm from "App/components/Filter/FilterForm";
import useListFilterStore from "App/hooks/useListFilterStore";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import dateUtils from "App/utils/dateUtils";
import { achWebhookActions } from "./store";
import { TablePagination } from "App/components/Table";

const initialState = {
    page_number: 1,
    page_size: 10,
};

const ListCirWebhooks = () => {
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

    const { response: cirWebhooks, loading } = useSelector((state) => state.get_ach_cir_webhooks);

    const data = cirWebhooks?.data ?? [];

    useEffect(() => {
        dispatch(achWebhookActions.get_ach_cir_webhooks(filterSchema));
    }, [dispatch, filterSchema]);

    const columns = useMemo(() => [
        {
            header: "S.N.",
            accessorKey: "f_serial_no",
            maxWidth: 50,
        },
        {
            header: "CFSB Transaction ID",
            accessorKey: "ach_transaction_id",
        },
        {
            header: "Return Code",
            accessorKey: "return_code",
        },
        {
            header: "From Effective Entry Date",
            cell: ({ row }) => (
                <>
                    {row.original.original_effective_entrydate
                        ? dateUtils.getFormattedDate(row.original.original_effective_entrydate)
                        : "-"}
                </>
            ),
        },

        {
            header: "Company ID",
            accessorKey: "company_id",
        },
        {
            header: "Return ACH Trace Number",
            accessorKey: "return_ach_tracenumber",
        },
        {
            header: "Original ACH Trace Number",
            accessorKey: "original_ach_tracenumber",
        },
        {
            header: "Status",
            accessorKey: "status",
        },
    ]);

    const filterFields = [
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
            label: "Company ID",
            name: "company_id",
        },
        {
            type: "textfield",
            label: "Receiver",
            name: "receiver",
        },
        {
            type: "textfield",
            label: "Return ACH Trace Number",
            name: "return_ach_tracenumber",
        },
        {
            type: "textfield",
            label: "Original ACH Trace Number",
            name: "original_ach_tracenumber",
        },
        {
            type: "textfield",
            label: "Status",
            name: "status",
        },
    ];

    return (
        <PageContent
            documentTitle="ACH CIR Webhooks"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "ACH Webhooks",
                },
                {
                    label: "CIR",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    title="Search CIR Webhooks"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                />
                <PageContentContainer title="ACH CIR Webhooks">
                    <TanstackReactTable columns={columns} data={data} loading={loading} />
                </PageContentContainer>

                <TablePagination
                    paginationData={cirWebhooks?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
};

export default ListCirWebhooks;
