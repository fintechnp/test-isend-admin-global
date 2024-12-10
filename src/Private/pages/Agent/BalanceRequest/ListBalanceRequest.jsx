import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import { FormatNumber } from "App/helpers";
import dateUtils from "App/utils/dateUtils";
import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import { localStorageGet } from "App/helpers/localStorage";
import useListFilterStore from "App/hooks/useListFilterStore";
import { BalanceRequestActions as actions } from "../BalanceRequest/store";

const initialState = {
    PageNumber: 1,
    PageSize: 10,
};

const sortByOptions = [
    {
        key: "None",
        value: "",
    },
    {
        key: "Name",
        value: "name",
    },
    {
        key: "Deposited Amount",
        value: "deposited_amount",
    },
    {
        key: "Currency",
        value: "currency",
    },
    {
        key: "Date of deposit",
        value: "deposit_date",
    },
    {
        key: "Status",
        value: "status",
    },
];

export default function ListBalanceRequest({ title }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { response: balanceRequestData, loading } = useSelector((state) => state.get_all_balance_request);

    const statusOptions = localStorageGet("reference")
        ?.find((item) => item?.reference_type === 67)
        ?.reference_data?.map((referenceItem) => {
            return {
                label: referenceItem.name,
                value: +referenceItem.value,
            };
        });

    const {
        isFilterOpen,
        filterSchema,
        onFilterSubmit,
        onQuickFilter,
        onDeleteFilterParams,
        onPageChange,
        onRowsPerPageChange,
        reset,
        closeFilter,
        openFilter,
    } = useListFilterStore({
        initialState,
        pageNumberKeyName: "PageNumber",
        pageSizeKeyName: "PageSize",
    });

    useEffect(() => {
        dispatch(actions.get_all_balance_request(filterSchema));
    }, [filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Agent/Business",
                accessorKey: "relatedTo",
            },
            {
                header: "Name",
                accessorKey: "name",
            },
            {
                header: "Deposited Amount",
                accessorKey: "depositedAmount",
                cell: ({ getValue }) => <>{FormatNumber(getValue())}</>,
            },
            {
                header: "Currency",
                accessorKey: "currency",
            },
            {
                header: "Depositor Method",
                accessorKey: "depositoryMethodName",
                cell: ({ getValue }) => <Typography>{getValue() ? getValue() : "N/A"}</Typography>,
            },
            {
                header: "Created At",
                accessorKey: "createdAt",
                cell: ({ getValue }) => (
                    <Typography>{getValue() ? dateUtils.getFormattedDate(getValue()) : "N/A"}</Typography>
                ),
            },
            {
                header: "Date of Deposit",
                accessorKey: "depositDate",
                cell: ({ getValue }) => (
                    <Typography>
                        {getValue() ? dateUtils.getFormattedDate(getValue(), "MMM DD, YYYY") : "N/A"}
                    </Typography>
                ),
            },

            {
                header: "Status",
                accessorKey: "statusName",
            },
            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <IconButton
                            onClick={() => {
                                navigate(buildRoute(routePaths.agent.viewBalanceRequest, row?.original?.id));
                            }}
                        >
                            <RemoveRedEyeOutlinedIcon
                                sx={{
                                    fontSize: "20px",
                                    "&:hover": {
                                        background: "transparent",
                                    },
                                }}
                            />
                        </IconButton>
                    </TableRowActionContainer>
                ),
            },
        ],
        [],
    );

    const filterFields = [
        {
            type: fieldTypes.DATE,
            name: "FromDate",
            label: "Requested From",
            props: {
                withStartDayTimezone: true,
            },
        },
        {
            type: fieldTypes.DATE,
            name: "ToDate",
            label: "Requested To",
            props: {
                withEndDayTimezone: true,
            },
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "Name",
            label: "Name",
        },
        {
            type: fieldTypes.DATE,
            name: "DateOfDeposit",
            label: "Date of Deposit",
            props: {
                withStartDayTimezone: true,
            },
        },
        {
            type: fieldTypes.SELECT,
            name: "Status",
            label: "Status",
            options: statusOptions,
        },
    ];

    return (
        <PageContent
            documentTitle="Balance Requests"
            breadcrumbs={[
                {
                    label: "B2B",
                },
                {
                    label: "Balance Requests",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    open={isFilterOpen}
                    title="Search Balance Request"
                    fields={filterFields}
                    onClose={closeFilter}
                    onReset={reset}
                    onDelete={onDeleteFilterParams}
                    onSubmit={onFilterSubmit}
                    values={filterSchema}
                />
                <PageContentContainer
                    title="Balance Requests"
                    topRightContent={
                        <TableGridQuickFilter
                            onSortByChange={onQuickFilter}
                            onOrderByChange={onQuickFilter}
                            sortByData={sortByOptions}
                            values={filterSchema}
                            disabled={loading}
                            orderByFieldName="OrderBy"
                            sortByFieldName="SortBy"
                        />
                    }
                >
                    <TanstackReactTable
                        columns={columns}
                        title="Balance Request"
                        data={balanceRequestData?.data ?? []}
                        loading={loading}
                    />
                </PageContentContainer>
                <TablePagination
                    paginationData={balanceRequestData?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
}
