import * as Yup from "yup";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import useListFilterStore from "App/hooks/useListFilterStore";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { isAfter } from "date-fns";
import isEmpty from "App/helpers/isEmpty";
import { achWebhookActions } from "./store";
import dateUtils from "App/utils/dateUtils";

const schema = Yup.object().shape({
    received_date_from: Yup.string().nullable().optional(),
    received_date_to: Yup.string()
        .nullable()
        .optional()
        .when("received_date_from", {
            is: (value) => !isEmpty(value),
            then: (schema) =>
                schema.test({
                    name: "is-after",
                    message: "Received Date To must be after Received Date From",
                    test: function (value) {
                        const { received_date_from } = this.parent;
                        return value ? isAfter(new Date(value), new Date(received_date_from)) : true;
                    },
                }),
            otherwise: (schema) => schema.nullable().optional(),
        }),
});

const initialState = {
    page_number: 1,
    page_size: 10,
};

export default function ListNocWebhooks() {
    const dispatch = useDispatch();

    const { response: nocWebhooks, loading } = useSelector((state) => state.get_ach_noc_webhooks);

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
    } = useListFilterStore({ initialState });

    const columns = useMemo(() => [
        {
            header: "S.N",
            accessorKey: "f_serial_no",
        },
        {
            header: "Transaction Id",
            accessorKey: "transaction_id",
        },
        {
            header: "Trace Number",
            accessorKey: "trace_number",
        },
        {
            header: "Received Date From",
            accessorKey: "created_ts",
            cell: ({ getValue, row }) => (getValue() ? dateUtils.getLocalDateTimeFromUTC(getValue()) : "-"),
        },
        {
            header: "Received Date To",
            accessorKey: "created_ts",
            cell: ({ getValue, row }) => (getValue() ? dateUtils.getLocalDateTimeFromUTC(getValue()) : "-"),
        },
        {
            header: "Change Code",
            accessorKey: "change_code",
        },
        {
            header: "Corrected Data",
            accessorKey: "corrected_data",
        },
    ]);

    const filterFields = [
        {
            type: fieldTypes.DATE,
            name: "received_date_from",
            label: "Received Date From",
            props: {
                withStartDayTimezone: true,
            },
        },
        {
            type: fieldTypes.DATE,
            name: "received_date_to",
            label: "Received Date To",
            props: {
                withEndDayTimezone: true,
            },
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "transaction_id",
            label: "Transaction Id",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "trace_number",
            label: "Trace Number",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "change_code",
            label: "Change Code",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "corrected_data",
            label: "Corrected Data",
        },
    ];

    useEffect(() => {
        dispatch(achWebhookActions.get_ach_noc_webhooks(filterSchema));
    }, [dispatch, filterSchema]);

    return (
        <PageContent
            documentTitle="ACH NOC Webhooks"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "ACH Webhooks",
                },
                {
                    label: "NOC",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    title="Search NOC Webhooks"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    fields={filterFields}
                    values={filterSchema}
                    schema={schema}
                    onDelete={onDeleteFilterParams}
                />
                <PageContentContainer>
                    <TanstackReactTable columns={columns} data={nocWebhooks?.data ?? []} loading={loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={nocWebhooks?.pagination}
                    onRowsPerPageChange={onRowsPerPageChange}
                    onPageChange={onPageChange}
                />
            </Column>
        </PageContent>
    );
}
