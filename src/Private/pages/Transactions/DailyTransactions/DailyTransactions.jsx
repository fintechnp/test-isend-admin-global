import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useMemo, useCallback } from "react";

import Column from "App/components/Column/Column";
import Table, { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "./../store/actions";
import ucfirst from "App/helpers/ucfirst";
import isEmpty from "App/helpers/isEmpty";
import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import useListFilterStore from "App/hooks/useListFilterStore";
import { CurrencyName, FormatDate, FormatNumber, ReferenceName } from "App/helpers";
import dateUtils from "App/utils/dateUtils";

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "border.main",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    from_date: dayjs().startOf("day").toISOString(),
    to_date: dateUtils.getTodayDate(),
    sort_by: "created_ts",
    order_by: "DESC",
};

const DailyTransactions = (props) => {
    const dispatch = useDispatch();

    const { response: dailyTransactions, loading: l_loading } = useSelector((state) => state.get_transactions);

    const {
        filterSchema,
        onFilterSubmit,
        onDeleteFilterParams,
        onPageChange,
        onRowsPerPageChange,
        openFilter,
        isFilterOpen,
        closeFilter,
        onQuickFilter,
        reset,
    } = useListFilterStore({ initialState });

    const columns = useMemo(
        () => [
            {
                header: "Id",
                accessorKey: "tid",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ opacity: 0.8 }}>
                            <Link
                                to={buildRoute(routePaths.viewTransaction, {
                                    id: row?.original?.tid,
                                    customerId: row?.original?.customer_id,
                                })}
                                style={{ textDecoration: "none" }}
                            >
                                {row?.original?.tid ? row?.original?.tid : "N/A"}
                            </Link>
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Name",
                accessorKey: "customer_name",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ fontSize: "14px" }}>
                            {row?.original?.customer_name ? row?.original?.customer_name : "n/a"}
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
                            {row?.original?.beneficiary_name ? row?.original?.beneficiary_name : "n/a"}
                        </Typography>
                    </Box>
                ),
            },

            {
                header: "C/B Id",
                accessorKey: "customer_id",
                Cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ fontSize: "13px" }}>
                            <Link
                                to={`/customer/details/${row?.original?.customer_id}`}
                                style={{ textDecoration: "none" }}
                            >
                                {row?.original?.customer_id ? row?.original?.customer_id : "N/A"}
                            </Link>
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
                            <Link
                                to={`/customer/beneficiary/details/${row?.original?.customer_id}/${row?.original?.beneficiary_id}`}
                                style={{ textDecoration: "none" }}
                            >
                                {row?.original?.beneficiary_id ? row?.original?.beneficiary_id : "n/a"}
                            </Link>
                        </Typography>
                    </Box>
                ),
            },
            {
                header: "Partner/Payout Country",
                accessorKey: "agent_name",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "13px",
                            }}
                        >
                            {row?.original?.agent_name ? row?.original?.agent_name : "N/A"}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "13px",
                                opacity: 0.6,
                            }}
                        >
                            {row?.original?.payout_country_data
                                ? ucfirst(row?.original?.payout_country_data.toLowerCase())
                                : (row?.original?.payout_country ?? "N/A")}
                        </StyledName>
                    </Box>
                ),
            },

            {
                header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Date</Typography>
                    </Box>
                ),
                accessorKey: "created_ts",
                cell: ({ row }) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {FormatDate(row?.original?.created_ts)}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Rate</Typography>
                    </Box>
                ),
                accessorKey: "payout_cost_rate",
                cell: ({ row }) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {row?.original?.payout_cost_rate ? FormatNumber(row?.original?.payout_cost_rate) : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="right" sx={{}}>
                        <Typography>Amount</Typography>
                    </Box>
                ),
                accessorKey: "transfer_amount",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {row?.original?.collected_amount ? FormatNumber(row?.original?.collected_amount) : "N/A"}
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
                            {row?.original?.payout_amount ? FormatNumber(row?.original?.payout_amount) : "N/A"}
                        </Typography>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Currency</Typography>
                    </Box>
                ),
                accessorKey: "collected_currency",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {CurrencyName(row?.original?.collected_currency)}
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
                            {CurrencyName(row?.original?.payout_currency)}
                        </Typography>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="right" sx={{}}>
                        <Typography>S/T Status</Typography>
                    </Box>
                ),
                accessorKey: "send_status",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            textAlign: "right",
                        }}
                    >
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "2px",
                                fontSize: "12px",
                                lineHeight: 1.2,
                            }}
                        >
                            {isEmpty(row?.original?.status)
                                ? row?.original?.send_status
                                : ReferenceName(66, row?.original?.status)}
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
                            {!isEmpty(row?.original?.transaction_status) ? row?.original?.transaction_status : " "}
                        </Typography>
                    </Box>
                ),
            },
        ],
        [],
    );

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "search",
            label: "Search",
        },
    ];

    useEffect(() => {
        dispatch(actions.get_transactions(filterSchema));
    }, [dispatch, filterSchema]);

    const sortData = [
        { key: "None", value: "" },
        { key: "Partner Name", value: "agent_name" },
        { key: "Payout Country", value: "payout_country" },
        { key: "Payment Type", value: "payment_type" },
    ];

    return (
        <PageContent
            documentTitle="Daily Transactions"
            breadcrumbs={[
                {
                    label: "Transaction",
                },
                {
                    label: "Daily",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Daily Transaction"
                    open={isFilterOpen}
                    fields={filterFields}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onDelete={onDeleteFilterParams}
                    onReset={reset}
                />
                <PageContentContainer
                    title="Daily Transactions"
                    topRightContent={
                        <TableGridQuickFilter
                            onOrderByChange={onQuickFilter}
                            onSortByChange={onQuickFilter}
                            sortByData={sortData}
                            values={filterSchema}
                            disabled={l_loading}
                        />
                    }
                >
                    <TanstackReactTable columns={columns} data={dailyTransactions?.data || []} loading={l_loading} />
                    <TablePagination
                        paginationData={dailyTransactions?.pagination}
                        handleChangePage={onPageChange}
                        handleChangeRowsPerPage={onRowsPerPageChange}
                    />
                </PageContentContainer>
            </Column>
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_DAILY_TRANSACTION] })(DailyTransactions);
