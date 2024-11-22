import * as Yup from "yup";
import { isAfter } from "date-fns";
import { useEffect, useMemo } from "react";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import FormControlLabel from "@mui/material/FormControlLabel";

import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import useListFilterStore from "App/hooks/useListFilterStore";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import PageContentContainer from "App/components/Container/PageContentContainer";

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

export default function ListOdfiWebhooks() {
    const dispatch = useDispatch();
    const { response: odfiWebhooks, loading } = useSelector((state) => state.get_ach_odfi_webhooks);

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
            header: "Company Id",
            accessorKey: "company_id",
        },
        {
            header: "Service Account Id",
            accessorKey: "service_account_id",
        },
        {
            header: "Transaction Group Id",
            accessorKey: "transaction_group_id",
        },
        {
            header: "Transaction Type",
            accessorKey: "transaction_type",
        },
        {
            header: "File",
            accessorKey: "file_name",
            cell: ({ getValue }) => <>{getValue() ? getValue() : "-"}</>,
        },
        {
            header: "Received Date",
            accessorKey: "created_ts",
            cell: ({ getValue, row }) => (getValue() ? dateUtils.getFormattedDate(getValue()) : "-"),
        },
        {
            header: "Is International",
            accessorKey: "is_international",
        },
        {
            header: "Is Same Day ACH",
            accessorKey: "is_same_day_ach",
        },
        {
            header: "Offset Reference",
            accessorKey: "offset_reference",
        },
        {
            header: "Number Transactions",
            accessorKey: "number_transactions",
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
            name: "company_id",
            label: "Company Id",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "service_account_id",
            label: "Service Account Id",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "transaction_group_id",
            label: "Transaction Group Id",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "transaction_type",
            label: "Transaction Type",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "offset_reference",
            label: "Offset Reference",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "number_transactions",
            label: "Number Transactions",
        },
    ];

    useEffect(() => {
        dispatch(achWebhookActions.get_ach_odfi_webhooks(filterSchema));
    }, [dispatch, filterSchema]);

    return (
        <PageContent
            documentTitle="ACH ODFI Webhooks"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "ACH Webhooks",
                },
                {
                    label: "ODFI",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    title="Search ODFI Webhooks"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    fields={filterFields}
                    values={filterSchema}
                    schema={schema}
                    onDelete={onDeleteFilterParams}
                />
                <PageContentContainer
                    title="ODFI Webhooks"
                    topRightContent={
                        <>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="is_international"
                                        checked={!!filterSchema.is_international}
                                        onChange={(e) =>
                                            onFilterSubmit({
                                                ...filterSchema,
                                                is_international: e.target.checked ? e.target.checked : null,
                                            })
                                        }
                                    />
                                }
                                label="Is International"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="is_same_day_ach"
                                        checked={!!filterSchema.is_same_day_ach}
                                        onChange={(e) =>
                                            onFilterSubmit({
                                                ...filterSchema,
                                                is_same_day_ach: e.target.checked ? e.target.checked : null,
                                            })
                                        }
                                    />
                                }
                                label="Is Same Day ACH"
                            />
                        </>
                    }
                >
                    <TanstackReactTable columns={columns} data={odfiWebhooks?.data ?? []} loading={loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={odfiWebhooks?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
}
