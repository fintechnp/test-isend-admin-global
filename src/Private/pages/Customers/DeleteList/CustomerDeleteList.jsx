import * as Yup from "yup";
import { useNavigate } from "react-router";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Column from "App/components/Column/Column";
import StatusBadge from "./components/StatusBadge";
import { TablePagination } from "App/components/Table";
import ListItemButton from "@mui/material/ListItemButton";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";

import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import { customerDeleteActions as actions } from "./store";
import useListFilterStore from "App/hooks/useListFilterStore";
import { DeleteAccountStatus } from "./data/DeleteAccountStatus";

const schema = Yup.object().shape({
    fromDate: Yup.string().test({
        name: "required_when_to_date_is_not_empty",
        message: "Form Date is required",
        test: (value, context) => {
            if (
                (isEmpty(context.parent.toDate) && isEmpty(value)) ||
                (!isEmpty(context.parent.toDate) && !isEmpty(value))
            )
                return true;
            return isEmpty(context.parent.toDate) && !isEmpty(value);
        },
    }),
    toDate: Yup.string().test({
        name: "required_when_to_date_is_not_empty",
        message: "To Date is required",
        test: (value, context) => {
            if (
                (isEmpty(context.parent.fromDate) && isEmpty(value)) ||
                (!isEmpty(context.parent.fromDate) && !isEmpty(value))
            )
                return true;
            return isEmpty(context.parent.fromDate) && !isEmpty(value);
        },
    }),
});

const initialState = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: "created_ts",
    orderBy: "DESC",
};

export default function CustomerDeleteList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, response } = useSelector((state) => state.get_all_customer_delete_list);

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        filterSchema,
        onQuickFilter,
        onRowsPerPageChange,
        onFilterSubmit,
        onPageChange,
        onDeleteFilterParams,
        reset,
    } = useListFilterStore({
        initialState,
        pageNumberKeyName: "pageNumber",
        pageSizeKeyName: "pageSize",
    });

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "name",
            label: "Name",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "phoneNumber",
            label: "Phone Number",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "emailAddress",
            label: "Email",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "customerId",
            label: "Customer Id",
        },
        {
            type: fieldTypes.DATE,
            name: "fromDate",
            label: "From Date",
            props: {
                withStartDayTimezone: true,
            },
        },
        {
            type: fieldTypes.DATE,
            name: "toDate",
            label: "To Date",
            props: {
                withEndDayTimezone: true,
            },
        },
        {
            type: fieldTypes.SELECT,
            name: "status",
            label: "Status",
            options: [
                {
                    label: "Pending",
                    value: DeleteAccountStatus.PENDING,
                },
                {
                    label: "Approved",
                    value: DeleteAccountStatus.APPROVED,
                },
            ],
        },
    ];

    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Full Name", value: "name" },
        { key: "Email", value: "email" },
        { key: "Phone Number", value: "phoneNumber" },
    ];

    useEffect(() => {
        dispatch(actions.get_all_customer_delete_list(filterSchema));
    }, [filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Full Name",
                accessorKey: "full_name",
            },
            {
                header: "Customer ID",
                accessorKey: "customer_id",
            },
            {
                header: "Email",
                accessorKey: "email",
            },
            {
                header: "Phone Number",
                accessorKey: "mobile_number",
            },
            {
                header: "Deletion Reason",
                accessorKey: "deletion_reason",
            },
            {
                header: "Remarks",
                accessorKey: "remarks",
                cell: ({ getValue }) => <>{getValue() || "-"}</>,
            },

            {
                header: "Status",
                accessorKey: "status",
                cell: ({ getValue }) => <StatusBadge status={getValue() ?? DeleteAccountStatus.PENDING} />,
            },
            {
                header: "Requested Date",
                accessorKey: "created_ts",
                cell: ({ getValue }) => dateUtils.getFormattedDate(getValue()),
            },

            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <PopoverButton>
                        {({ close }) => (
                            <ListItemButton
                                onClick={() => {
                                    navigate(
                                        buildRoute(routePaths.customer.deleteRequestDetails, row.original.delete_id),
                                    );
                                }}
                            >
                                View
                            </ListItemButton>
                        )}
                    </PopoverButton>
                ),
            },
        ],
        [],
    );

    return (
        <PageContent
            documentTitle="Account Closure Requests"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "Customers",
                },
                {
                    label: "Account Closure Requests",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                    schema={schema}
                    title="Search Customers"
                    onReset={reset}
                />
                <PageContentContainer
                    title="Customer Delete Request"
                    topRightContent={
                        <TableGridQuickFilter
                            onSortByChange={onQuickFilter}
                            onOrderByChange={onQuickFilter}
                            disabled={loading}
                            sortByData={sortData}
                            values={filterSchema}
                            sortByFieldName="sortBy"
                            orderByFieldName="orderBy"
                        />
                    }
                >
                    <TanstackReactTable
                        columns={columns}
                        title="Delete List"
                        data={response?.data ?? []}
                        loading={loading}
                    />
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
