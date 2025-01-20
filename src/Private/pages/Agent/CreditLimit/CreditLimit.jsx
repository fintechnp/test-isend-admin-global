import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import buildRoute from "App/helpers/buildRoute";
import Button from "App/components/Button/Button";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import ucwords from "App/helpers/ucwords";
import { creditLimitActions } from "./store";
import routePaths from "Private/config/routePaths";
import { localStorageGet } from "App/helpers/localStorage";
import useListFilterStore from "App/hooks/useListFilterStore";
import { creditLimitStatusEnum } from "./constants/creditLimitStatus";
import BalanceRequestStatusBadge from "../BalanceRequest/data/BalanceRequestStatusBadge";

const initialState = {
    Page: 1,
    PageSize: 10,
};

const sortByOptions = [
    { key: "None", value: "" },
    {
        key: "Business Name",
        value: "business_name",
    },
    {
        key: "Currency",
        value: "currency",
    },
    {
        key: "Status",
        value: "status",
    },
];

export default function CreditLimit({ title }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countries = localStorageGet("country");

    const { response: creditLimitData, loading: creditLimitLoading } = useSelector(
        (state) => state.get_all_credit_limit,
    );

    const currencyOptions = countries?.map((c) => {
        return {
            label: ucwords(c.currency_name),
            value: c.currency,
        };
    });

    // const sortByOptions =
    //     creditLimitData?.data?.length > 0 &&
    //     Object.keys(creditLimitData?.data[0])
    //         ?.map((item) => {
    //             return { value: item, label: item };
    //         })
    //         .filter((item) => item.label !== "f_serial_no");

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        onDeleteFilterParams,
        onFilterSubmit,
        onPageChange,
        onQuickFilter,
        onRowsPerPageChange,
        reset,
        filterSchema,
    } = useListFilterStore({
        initialState,
        pageNumberKeyName: "Page",
        pageSizeKeyName: "PageSize",
    });

    useEffect(() => {
        dispatch(creditLimitActions.get_all_credit_limit(filterSchema));
    }, [filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },

            {
                header: "Business/Agent Name",
                accessorKey: "name",
                cell: ({ getValue }) => <Typography>{getValue() ? getValue() : "N/A"}</Typography>,
            },
            {
                header: "Credit Amount",
                accessorKey: "creditLimit",
            },
            {
                header: "Currency",
                accessorKey: "currency",
                cell: ({ getValue }) => <Typography>{getValue() ? getValue() : "N/A"}</Typography>,
            },

            {
                header: "Remarks",
                accessorKey: "remarks",
                cell: ({ getValue }) => <Typography>{getValue() ? getValue() : "N/A"}</Typography>,
            },

            {
                header: "Status",
                accessorKey: "statusName",
                cell: ({ getValue }) => <BalanceRequestStatusBadge status={getValue()} />,
            },

            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <IconButton
                            onClick={() => {
                                navigate(buildRoute(routePaths.agent.viewCreditLimit, row?.original?.id));
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
                        {row?.original?.status !== creditLimitStatusEnum.APPROVED && (
                            <IconButton
                                onClick={() => {
                                    navigate(buildRoute(routePaths.agent.editCreditLimit, row?.original?.id));
                                }}
                            >
                                <EditOutlinedIcon
                                    sx={{
                                        fontSize: "20px",
                                        "&:hover": {
                                            background: "transparent",
                                        },
                                    }}
                                />
                            </IconButton>
                        )}
                    </TableRowActionContainer>
                ),
            },
        ],
        [],
    );
    const statusOptions = [
        {
            label: "Initial",
            value: creditLimitStatusEnum.INITIAL,
        },
        {
            label: "Success",
            value: creditLimitStatusEnum.SUCCESS,
        },
        {
            label: "Pending",
            value: creditLimitStatusEnum.PENDING,
        },
        {
            label: "Approved",
            value: creditLimitStatusEnum.APPROVED,
        },
        {
            label: "Rejected",
            value: creditLimitStatusEnum.REJECTED,
        },
    ];

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "BusinessNameFilter",
            label: "Business/Agent Name",
        },
        {
            type: fieldTypes.SELECT,
            name: "CurrencyFilter",
            label: "Currency",
            options: currencyOptions,
        },
        {
            type: fieldTypes.SELECT,
            name: "StatusFilter",
            label: "Status",
            options: statusOptions,
        },
    ];

    return (
        <PageContent
            documentTitle="Credit Limits"
            breadcrumbs={[
                { label: "B2B" },
                {
                    label: "Credit Limit",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Credit Limit"
                    open={isFilterOpen}
                    fields={filterFields}
                    onClose={closeFilter}
                    onReset={reset}
                    onDelete={onDeleteFilterParams}
                    onSubmit={onFilterSubmit}
                    values={filterSchema}
                />
                <PageContentContainer
                    title="Credit Limit"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                onOrderByChange={onQuickFilter}
                                onSortByChange={onQuickFilter}
                                sortByData={sortByOptions}
                                orderByFieldName="OrderBy"
                                sortByFieldName="SortBy"
                                values={filterSchema}
                                disabled={creditLimitLoading}
                            />
                            <Button
                                onClick={() => {
                                    navigate(routePaths.agent.addCreditLimit);
                                }}
                            >
                                Add Credit Limit
                            </Button>
                        </>
                    }
                >
                    <TanstackReactTable
                        columns={columns}
                        data={creditLimitData?.data ?? []}
                        loading={creditLimitLoading}
                    />
                </PageContentContainer>
                <TablePagination
                    paginationData={creditLimitData?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
}
